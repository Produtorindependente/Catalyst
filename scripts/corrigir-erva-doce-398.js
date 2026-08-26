const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const BACKUP = "data/produtos.backup_erva_doce_398.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

const produto = produtos.find(
  p => Number(p.id) === 398
);

if (!produto) {
  throw new Error("❌ Produto ID 398 não encontrado.");
}

/*
============================================================
 CATALYST — CORREÇÃO ID 398
 Erva Doce — imagem comercial
============================================================
*/

fs.copyFileSync(ARQUIVO, BACKUP);

/*
 * Imagem comercial de Erva-Doce 100g.
 * Referência: produto vendido a granel.
 */

const imagem =
  "https://www.estacaodosgraos.com.br/media/catalog/product/e/r/erva_doce.jpg";

produto.imagem = imagem;
produto.imagemFonte =
  "https://www.estacaodosgraos.com.br/erva-doce-cha.html";

/*
 * Remove eventual imagem anterior incorreta
 * registrada como logo/share.
 */

if (
  produto.imagem &&
  produto.imagem.includes("logo-share")
) {
  produto.imagem = imagem;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — CORREÇÃO ID 398");
console.log("==========================================");
console.log("");
console.log(`✅ ID: ${produto.id}`);
console.log(`✅ Produto: ${produto.nome}`);
console.log(`✅ Imagem: ${produto.imagem}`);
console.log(`✅ Fonte: ${produto.imagemFonte}`);
console.log("");
console.log(`💾 Backup: ${BACKUP}`);
console.log("");
console.log("==========================================");
console.log(" ERVA DOCE — CORREÇÃO CONCLUÍDA");
console.log("==========================================");
