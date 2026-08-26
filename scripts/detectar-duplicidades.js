const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-duplicidades.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const grupos = new Map();

produtos.forEach((produto, indice) => {

  const nome = normalizar(produto.nome);

  if (!nome) return;

  if (!grupos.has(nome)) {
    grupos.set(nome, []);
  }

  grupos.get(nome).push({
    indice,
    id: produto.id ?? null,
    nome: produto.nome,
    categoria: produto.categoria,
    preco: produto.preco ?? null,
    peso: produto.peso ?? null,
    unidade: produto.unidade ?? null,
    codigo: produto.codigo ?? null,
    imagem: produto.imagem ?? null
  });

});

const duplicidades = [];

for (const [nome, itens] of grupos.entries()) {

  if (itens.length > 1) {

    duplicidades.push({
      nome_normalizado: nome,
      quantidade: itens.length,
      produtos: itens
    });

  }

}

duplicidades.sort(
  (a, b) => b.quantidade - a.quantidade
);

fs.writeFileSync(
  SAIDA,
  JSON.stringify(duplicidades, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — DETECÇÃO DE DUPLICIDADES");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log(`🔎 Grupos com mesmo nome: ${duplicidades.length}`);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
