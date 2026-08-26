const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-conflitos-codigos.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizarCodigo(codigo) {
  return String(codigo ?? "")
    .trim()
    .toUpperCase();
}

function numeroId(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
}

// ============================================================
// 1. SEPARAR PRODUTOS COM E SEM CÓDIGO
// ============================================================

const comCodigo = produtos.filter((p) => {
  const codigo = normalizarCodigo(p.codigo);
  return codigo && codigo !== "-" && codigo !== "N/A";
});

const semCodigo = produtos.filter((p) => {
  const codigo = normalizarCodigo(p.codigo);
  return !codigo || codigo === "-" || codigo === "N/A";
});

// ============================================================
// 2. AGRUPAR POR CÓDIGO
// ============================================================

const grupos = new Map();

for (const produto of comCodigo) {
  const codigo = normalizarCodigo(produto.codigo);

  if (!grupos.has(codigo)) {
    grupos.set(codigo, []);
  }

  grupos.get(codigo).push(produto);
}

// ============================================================
// 3. ANALISAR CONFLITOS
// ============================================================

const conflitos = [];

for (const [codigo, lista] of grupos.entries()) {
  if (lista.length < 2) continue;

  const nomes = [...new Set(
    lista.map((p) => normalizar(p.nome))
  )];

  const categorias = [...new Set(
    lista.map((p) => normalizar(p.categoria))
  )];

  const precos = [...new Set(
    lista.map((p) => p.preco)
  )];

  const pesos = [...new Set(
    lista.map((p) => `${p.peso ?? ""}|${p.unidade ?? ""}`)
  )];

  let classificacao = "CODIGO_COMPARTILHADO";

  if (nomes.length === 1 && categorias.length === 1) {
    classificacao = "MESMO_PRODUTO_VARIACAO";
  } else if (nomes.length === 1) {
    classificacao = "MESMO_NOME_CATEGORIA_DIFERENTE";
  } else {
    classificacao = "CODIGO_CONFLITANTE";
  }

  conflitos.push({
    codigo,
    quantidade: lista.length,
    classificacao,
    resumo: {
      nomes_diferentes: nomes.length,
      categorias_diferentes: categorias.length,
      precos_diferentes: precos.length,
      apresentacoes_diferentes: pesos.length
    },
    produtos: lista.map((p, indice) => ({
      indice,
      id: p.id ?? null,
      nome: p.nome ?? "",
      categoria: p.categoria ?? "",
      preco: p.preco ?? null,
      peso: p.peso ?? "",
      unidade: p.unidade ?? "",
      codigo: p.codigo ?? "",
      imagem: p.imagem ?? ""
    }))
  });
}

// ============================================================
// 4. DETECTAR IDs NUMÉRICOS AUSENTES / FORA DA SEQUÊNCIA
// ============================================================

const idsNumericos = produtos
  .map((p) => numeroId(p.id))
  .filter((id) => id !== null);

const idsUnicos = [...new Set(idsNumericos)].sort((a, b) => a - b);

const menorId = idsUnicos.length ? idsUnicos[0] : null;
const maiorId = idsUnicos.length ? idsUnicos[idsUnicos.length - 1] : null;

const idsFaltantes = [];

if (menorId !== null && maiorId !== null) {
  for (let id = menorId; id <= maiorId; id++) {
    if (!idsUnicos.includes(id)) {
      idsFaltantes.push(id);
    }
  }
}

// ============================================================
// 5. DETECTAR IDs DUPLICADOS
// ============================================================

const contagemIds = new Map();

for (const produto of produtos) {
  const id = numeroId(produto.id);

  if (id === null) continue;

  contagemIds.set(
    id,
    (contagemIds.get(id) || 0) + 1
  );
}

const idsDuplicados = [...contagemIds.entries()]
  .filter(([, quantidade]) => quantidade > 1)
  .map(([id, quantidade]) => ({
    id,
    quantidade,
    produtos: produtos
      .filter((p) => numeroId(p.id) === id)
      .map((p) => ({
        nome: p.nome ?? "",
        categoria: p.categoria ?? "",
        codigo: p.codigo ?? ""
      }))
  }));

// ============================================================
// 6. RESUMO
// ============================================================

const relatorio = {
  resumo: {
    registros_analisados: produtos.length,
    produtos_com_codigo: comCodigo.length,
    produtos_sem_codigo: semCodigo.length,
    codigos_unicos: grupos.size,
    codigos_compartilhados: conflitos.length,
    conflitos_fortes: conflitos.filter(
      (c) => c.classificacao === "CODIGO_CONFLITANTE"
    ).length,
    mesmos_produtos_variacao: conflitos.filter(
      (c) => c.classificacao === "MESMO_PRODUTO_VARIACAO"
    ).length,
    ids_numericos_unicos: idsUnicos.length,
    menor_id: menorId,
    maior_id: maiorId,
    ids_faltantes: idsFaltantes,
    ids_duplicados: idsDuplicados.length
  },

  conflitos_codigos: conflitos,

  ids: {
    faltantes: idsFaltantes,
    duplicados: idsDuplicados
  }
};

// ============================================================
// 7. SALVAR
// ============================================================

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

// ============================================================
// 8. TERMINAL
// ============================================================

console.log("");
console.log("==========================================");
console.log(" CATALYST — CONFLITOS DE CÓDIGOS");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log(`🏷️ Produtos com código: ${comCodigo.length}`);
console.log(`❔ Produtos sem código: ${semCodigo.length}`);
console.log(`🔢 Códigos únicos: ${grupos.size}`);
console.log(`⚠️ Códigos compartilhados: ${conflitos.length}`);
console.log(
  `🔴 Conflitos de código: ${
    conflitos.filter(
      (c) => c.classificacao === "CODIGO_CONFLITANTE"
    ).length
  }`
);
console.log(
  `🟢 Mesmo produto / variação: ${
    conflitos.filter(
      (c) => c.classificacao === "MESMO_PRODUTO_VARIACAO"
    ).length
  }`
);
console.log("");
console.log(`🆔 Menor ID: ${menorId}`);
console.log(`🆔 Maior ID: ${maiorId}`);
console.log(`❌ IDs faltantes: ${idsFaltantes.length}`);
console.log(`🔴 IDs duplicados: ${idsDuplicados.length}`);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
console.log("");
