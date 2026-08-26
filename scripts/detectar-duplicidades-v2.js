const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-duplicidades-v2.json";

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

function numero(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  const n = Number(
    String(valor)
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );

  return Number.isNaN(n) ? null : n;
}

function pesoNormalizado(produto) {
  const peso = normalizar(produto.peso);
  const unidade = normalizar(produto.unidade);

  return normalizar(`${peso} ${unidade}`);
}

function codigoNormalizado(produto) {
  const codigo = String(produto.codigo ?? "").trim();

  if (
    !codigo ||
    codigo === "-" ||
    normalizar(codigo) === "nao legivel"
  ) {
    return "";
  }

  return codigo;
}

function imagemNormalizada(produto) {
  const imagem = String(produto.imagem ?? "").trim();

  if (!imagem) {
    return "";
  }

  return normalizar(imagem);
}

function comparar(a, b) {
  const nomeA = normalizar(a.nome);
  const nomeB = normalizar(b.nome);

  const codigoA = codigoNormalizado(a);
  const codigoB = codigoNormalizado(b);

  const precoA = numero(a.preco);
  const precoB = numero(b.preco);

  const pesoA = pesoNormalizado(a);
  const pesoB = pesoNormalizado(b);

  const categoriaA = normalizar(a.categoria);
  const categoriaB = normalizar(b.categoria);

  const imagemA = imagemNormalizada(a);
  const imagemB = imagemNormalizada(b);

  let pontos = 0;
  const coincidencias = [];
  const diferencas = [];

  // NOME
  if (nomeA && nomeA === nomeB) {
    pontos += 40;
    coincidencias.push("nome");
  } else {
    diferencas.push("nome");
  }

  // CÓDIGO
  if (codigoA && codigoB && codigoA === codigoB) {
    pontos += 25;
    coincidencias.push("codigo");
  } else if (codigoA !== codigoB) {
    diferencas.push("codigo");
  }

  // PREÇO
  if (
    precoA !== null &&
    precoB !== null &&
    precoA === precoB
  ) {
    pontos += 10;
    coincidencias.push("preco");
  } else {
    diferencas.push("preco");
  }

  // PESO / UNIDADE
  if (pesoA && pesoA === pesoB) {
    pontos += 15;
    coincidencias.push("peso_unidade");
  } else {
    diferencas.push("peso_unidade");
  }

  // CATEGORIA
  if (categoriaA && categoriaA === categoriaB) {
    pontos += 5;
    coincidencias.push("categoria");
  } else {
    diferencas.push("categoria");
  }

  // IMAGEM
  if (imagemA && imagemB && imagemA === imagemB) {
    pontos += 5;
    coincidencias.push("imagem");
  } else if (imagemA !== imagemB) {
    diferencas.push("imagem");
  }

  let classificacao = "SEM_DUPLICIDADE_RELEVANTE";

  /*
   * VARIAÇÃO LEGÍTIMA:
   * mesmo nome, mas peso/unidade diferentes.
   */
  if (
    nomeA &&
    nomeA === nomeB &&
    pesoA &&
    pesoB &&
    pesoA !== pesoB
  ) {
    classificacao = "VARIACAO_LEGITIMA";
  }

  /*
   * DUPLICATA FORTE:
   * mesmo nome + mesmo código + mesmo peso/unidade.
   */
  else if (
    nomeA &&
    nomeA === nomeB &&
    codigoA &&
    codigoB &&
    codigoA === codigoB &&
    pesoA &&
    pesoA === pesoB
  ) {
    classificacao = "DUPLICATA_FORTE";
  }

  /*
   * POSSÍVEL DUPLICATA:
   * mesmo nome + mesma apresentação,
   * mas código ausente ou outras diferenças.
   */
  else if (
    nomeA &&
    nomeA === nomeB &&
    pesoA &&
    pesoA === pesoB
  ) {
    classificacao = "POSSIVEL_DUPLICATA";
  }

  return {
    pontos,
    classificacao,
    coincidencias,
    diferencas
  };
}

const grupos = new Map();

for (const produto of produtos) {
  const nome = normalizar(produto.nome);

  if (!nome) continue;

  if (!grupos.has(nome)) {
    grupos.set(nome, []);
  }

  grupos.get(nome).push(produto);
}

const relatorio = [];

for (const [nomeNormalizado, grupo] of grupos.entries()) {
  if (grupo.length < 2) continue;

  const comparacoes = [];

  for (let i = 0; i < grupo.length; i++) {
    for (let j = i + 1; j < grupo.length; j++) {
      const a = grupo[i];
      const b = grupo[j];

      const resultado = comparar(a, b);

      comparacoes.push({
        produtoA: {
          indice: produtos.indexOf(a),
          id: a.id,
          nome: a.nome,
          categoria: a.categoria,
          preco: a.preco,
          peso: a.peso,
          unidade: a.unidade,
          codigo: a.codigo,
          imagem: a.imagem
        },

        produtoB: {
          indice: produtos.indexOf(b),
          id: b.id,
          nome: b.nome,
          categoria: b.categoria,
          preco: b.preco,
          peso: b.peso,
          unidade: b.unidade,
          codigo: b.codigo,
          imagem: b.imagem
        },

        ...resultado
      });
    }
  }

  relatorio.push({
    nome_normalizado: nomeNormalizado,
    quantidade: grupo.length,
    comparacoes
  });
}

relatorio.sort((a, b) =>
  a.nome_normalizado.localeCompare(
    b.nome_normalizado,
    "pt-BR"
  )
);

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

let variacoes = 0;
let possiveis = 0;
let fortes = 0;

for (const grupo of relatorio) {
  for (const comparacao of grupo.comparacoes) {
    if (comparacao.classificacao === "VARIACAO_LEGITIMA") {
      variacoes++;
    }

    if (comparacao.classificacao === "POSSIVEL_DUPLICATA") {
      possiveis++;
    }

    if (comparacao.classificacao === "DUPLICATA_FORTE") {
      fortes++;
    }
  }
}

console.log("");
console.log("==========================================");
console.log(" CATALYST — DETECÇÃO DE DUPLICIDADES V2");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log(`🔎 Grupos com nomes repetidos: ${relatorio.length}`);
console.log("");
console.log(`🟢 Variações legítimas: ${variacoes}`);
console.log(`🟡 Possíveis duplicatas: ${possiveis}`);
console.log(`🔴 Duplicatas fortes: ${fortes}`);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
console.log("");
