const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-apresentacoes-validas.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

function vazio(valor) {
  return (
    valor === undefined ||
    valor === null ||
    String(valor).trim() === ""
  );
}

function normalizar(valor) {
  return String(valor ?? "")
    .trim()
    .toLowerCase()
    .replace(",", ".");
}

function classificar(produto) {
  const peso = normalizar(produto.peso);
  const unidade = normalizar(produto.unidade);

  if (vazio(produto.peso) && vazio(produto.unidade)) {
    return "PRECISA_REVISAO";
  }

  if (
    unidade.includes("caixa com") ||
    unidade.includes("embalagem") ||
    unidade.includes("sachê") ||
    unidade.includes("sache") ||
    unidade.includes("frasco") ||
    unidade.includes("pote") ||
    unidade.includes("cápsula") ||
    unidade.includes("capsula") ||
    unidade.includes("unidade")
  ) {
    return "APRESENTACAO_COMERCIAL";
  }

  if (/^\d+(?:\.\d+)?$/.test(peso)) {
    if (/^(g|kg|mg|ml|l)$/.test(unidade)) {
      return "NUMERO_MAIS_MEDIDA_COMPATIVEL";
    }
  }

  if (
    /^\d+(?:\.\d+)?\s*(g|kg|mg|ml|l)$/.test(peso)
  ) {
    if (/^(g|kg|mg|ml|l)$/.test(unidade)) {
      return "MEDIDA_JA_CONTIDA_NO_PESO";
    }
  }

  if (
    /^\d+(?:\.\d+)?\s*(g|kg|mg|ml|l)$/.test(peso)
  ) {
    if (vazio(unidade)) {
      return "MEDIDA_COMPLETA";
    }
  }

  if (
    /^\d+(?:\.\d+)?$/.test(peso) &&
    vazio(unidade)
  ) {
    return "PRECISA_REVISAO";
  }

  if (
    !vazio(peso) &&
    !vazio(unidade)
  ) {
    return "APRESENTACAO_PREENCHIDA";
  }

  return "PRECISA_REVISAO";
}

const grupos = {};

produtos.forEach((produto, indice) => {
  const classificacao = classificar(produto);

  if (!grupos[classificacao]) {
    grupos[classificacao] = [];
  }

  grupos[classificacao].push({
    indice,
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    peso: produto.peso,
    unidade: produto.unidade,
    codigo: produto.codigo
  });
});

const resumo = {};

for (const chave of Object.keys(grupos)) {
  resumo[chave] = grupos[chave].length;
}

const relatorio = {
  resumo,
  produtos: grupos
};

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — APRESENTAÇÕES VÁLIDAS");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log("");

for (const chave of Object.keys(resumo)) {
  console.log(`   ${resumo[chave]}x → ${chave}`);
}

console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
