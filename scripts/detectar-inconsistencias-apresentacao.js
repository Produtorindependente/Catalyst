const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-inconsistencias-apresentacao.json";

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

function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const relatorio = {
  resumo: {
    registros_analisados: produtos.length,
    peso_vazio_unidade_preenchida: 0,
    peso_preenchido_unidade_vazia: 0,
    peso_e_unidade_vazios: 0,
    peso_numerico_unidade_g: 0,
    peso_com_unidade_1_unidade: 0,
    informacao_apresentacao_no_nome: 0
  },

  casos: {
    peso_vazio_unidade_preenchida: [],
    peso_preenchido_unidade_vazia: [],
    peso_e_unidade_vazios: [],
    peso_numerico_unidade_g: [],
    peso_com_unidade_1_unidade: [],
    informacao_apresentacao_no_nome: []
  }
};

const padraoApresentacao =
  /\b\d+(?:[.,]\d+)?\s?(?:kg|g|mg|ml|l|litro|litros|un|unidade|unidades)\b/i;

produtos.forEach((produto, indice) => {
  const item = {
    indice,
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    preco: produto.preco,
    peso: produto.peso,
    unidade: produto.unidade,
    codigo: produto.codigo
  };

  const pesoVazio = vazio(produto.peso);
  const unidadeVazia = vazio(produto.unidade);

  if (pesoVazio && !unidadeVazia) {
    relatorio.resumo.peso_vazio_unidade_preenchida++;
    relatorio.casos.peso_vazio_unidade_preenchida.push(item);
  }

  if (!pesoVazio && unidadeVazia) {
    relatorio.resumo.peso_preenchido_unidade_vazia++;
    relatorio.casos.peso_preenchido_unidade_vazia.push(item);
  }

  if (pesoVazio && unidadeVazia) {
    relatorio.resumo.peso_e_unidade_vazios++;
    relatorio.casos.peso_e_unidade_vazios.push(item);
  }

  if (
    typeof produto.peso === "number" &&
    normalizar(produto.unidade) === "g"
  ) {
    relatorio.resumo.peso_numerico_unidade_g++;
    relatorio.casos.peso_numerico_unidade_g.push(item);
  }

  if (
    !pesoVazio &&
    normalizar(produto.unidade) === "1 unidade"
  ) {
    relatorio.resumo.peso_com_unidade_1_unidade++;
    relatorio.casos.peso_com_unidade_1_unidade.push(item);
  }

  if (
    padraoApresentacao.test(String(produto.nome ?? "")) &&
    (pesoVazio || unidadeVazia)
  ) {
    relatorio.resumo.informacao_apresentacao_no_nome++;
    relatorio.casos.informacao_apresentacao_no_nome.push(item);
  }
});

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — INCONSISTÊNCIAS DE APRESENTAÇÃO");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log("");
console.log(
  `⚖️ Peso vazio + unidade preenchida: ${relatorio.resumo.peso_vazio_unidade_preenchida}`
);
console.log(
  `⚖️ Peso preenchido + unidade vazia: ${relatorio.resumo.peso_preenchido_unidade_vazia}`
);
console.log(
  `❔ Peso + unidade vazios: ${relatorio.resumo.peso_e_unidade_vazios}`
);
console.log(
  `🔢 Peso numérico + unidade g: ${relatorio.resumo.peso_numerico_unidade_g}`
);
console.log(
  `📦 Peso + "1 unidade": ${relatorio.resumo.peso_com_unidade_1_unidade}`
);
console.log(
  `🔎 Apresentação encontrada no nome: ${relatorio.resumo.informacao_apresentacao_no_nome}`
);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
