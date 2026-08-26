const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/inventario-produtos.txt";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

const linhas = [];

linhas.push("============================================================");
linhas.push(" CATALYST — INVENTÁRIO COMPLETO DE PRODUTOS");
linhas.push("============================================================");
linhas.push("");
linhas.push(`TOTAL DE REGISTROS: ${produtos.length}`);
linhas.push("");

produtos.forEach((p, i) => {

  const id =
    p.id === undefined ||
    p.id === null ||
    p.id === ""
      ? "SEM ID"
      : p.id;

  const nome =
    p.nome ||
    "SEM NOME";

  const categoria =
    p.categoria ||
    "SEM CATEGORIA";

  const preco =
    p.preco === undefined ||
    p.preco === null ||
    p.preco === ""
      ? "SEM PREÇO"
      : `R$ ${Number(p.preco).toFixed(2).replace(".", ",")}`;

  const peso =
    p.peso !== undefined &&
    p.peso !== null &&
    p.peso !== ""
      ? `${p.peso}${p.unidade || ""}`
      : "-";

  const codigo =
    p.codigo ||
    "-";

  const imagem =
    p.imagem
      ? "SIM"
      : "NÃO";

  linhas.push(
    `${String(i + 1).padStart(3, "0")} | ` +
    `ID: ${String(id).padEnd(7)} | ` +
    `${nome} | ` +
    `${categoria} | ` +
    `${preco} | ` +
    `${peso} | ` +
    `CÓD: ${codigo} | ` +
    `IMG: ${imagem}`
  );

});

linhas.push("");
linhas.push("============================================================");
linhas.push(" FIM DO INVENTÁRIO");
linhas.push("============================================================");

fs.writeFileSync(
  SAIDA,
  linhas.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — INVENTÁRIO GERADO");
console.log("==========================================");
console.log("");
console.log(`📦 Produtos analisados: ${produtos.length}`);
console.log(`📄 Arquivo: ${SAIDA}`);
console.log("");
console.log("Nenhum produto foi alterado.");
console.log("==========================================");
