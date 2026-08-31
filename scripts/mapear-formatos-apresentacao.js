const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-formatos-apresentacao.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

function chave(valor) {
  if (valor === undefined || valor === null || String(valor).trim() === "") {
    return "(vazio)";
  }

  return String(valor).trim();
}

const pesos = {};
const unidades = {};
const combinacoes = {};

produtos.forEach((produto, indice) => {
  const peso = chave(produto.peso);
  const unidade = chave(produto.unidade);
  const combinacao = `${peso} | ${unidade}`;

  pesos[peso] = (pesos[peso] || 0) + 1;
  unidades[unidade] = (unidades[unidade] || 0) + 1;
  combinacoes[combinacao] = (combinacoes[combinacao] || 0) + 1;
});

function ordenar(objeto) {
  return Object.entries(objeto)
    .sort((a, b) => b[1] - a[1])
    .map(([valor, quantidade]) => ({
      valor,
      quantidade
    }));
}

const relatorio = {
  resumo: {
    registros_analisados: produtos.length,
    formatos_peso: Object.keys(pesos).length,
    formatos_unidade: Object.keys(unidades).length,
    combinacoes_apresentacao: Object.keys(combinacoes).length
  },

  pesos: ordenar(pesos),

  unidades: ordenar(unidades),

  combinacoes: ordenar(combinacoes)
};

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — FORMATOS DE APRESENTAÇÃO");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log(`⚖️ Formatos de peso: ${relatorio.resumo.formatos_peso}`);
console.log(`📦 Formatos de unidade: ${relatorio.resumo.formatos_unidade}`);
console.log(
  `🔗 Combinações peso + unidade: ${relatorio.resumo.combinacoes_apresentacao}`
);
console.log("");
console.log("📊 PRINCIPAIS PESOS:");

relatorio.pesos
  .slice(0, 20)
  .forEach(item => {
    console.log(`   ${item.quantidade}x → ${item.valor}`);
  });

console.log("");
console.log("📊 PRINCIPAIS UNIDADES:");

relatorio.unidades
  .slice(0, 20)
  .forEach(item => {
    console.log(`   ${item.quantidade}x → ${item.valor}`);
  });

console.log("");
console.log("📊 PRINCIPAIS COMBINAÇÕES:");

relatorio.combinacoes
  .slice(0, 30)
  .forEach(item => {
    console.log(`   ${item.quantidade}x → ${item.valor}`);
  });

console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
