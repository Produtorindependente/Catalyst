const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  "Castanha do Pará Inteira":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazil_nuts.jpg",

  "Castanha do Pará Quebrada":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazil_nuts.jpg",

  "Castanha de Caju Crua W1":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cashew_nuts.jpg",

  "Castanha de Caju Quebrada sem Sal":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cashew_nuts.jpg",

  "Amendoim Natural":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Peanuts.jpg",

  "Amendoim sem Casca":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Peanuts.jpg",

  "Cacau 100% Alcalino":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa_powder.jpg",

  "Cacau 70%":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa_powder.jpg",

  "Cacau 50%":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa_powder.jpg",

  "Nibs de Cacau":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cacao_nibs.jpg",

  "Eritritol":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Erythritol.jpg",

  "Cravo em Pó":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Clove_powder.jpg",

  "Bicarbonato de Sódio":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sodium_bicarbonate.jpg",

  "Polvilho Doce":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tapioca_starch.jpg",

  "Polvilho Azedo":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tapioca_starch.jpg"
};

function normalizar(txt) {
  return String(txt || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

let aplicadas = 0;
let existentes = 0;
let naoEncontrados = 0;

for (const [nome, url] of Object.entries(imagens)) {

  const produto = produtos.find(
    p => normalizar(p.nome) === normalizar(nome)
  );

  if (!produto) {
    console.log(`⚠️ Não encontrado: ${nome}`);
    naoEncontrados++;
    continue;
  }

  if (produto.imagem) {
    console.log(`⏭️ Já possui imagem: ${produto.nome}`);
    existentes++;
    continue;
  }

  produto.imagem = url;

  console.log(`✅ Imagem aplicada: ${produto.nome}`);
  aplicadas++;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" LOTE 08 — CASTANHAS / CACAU / INGREDIENTES");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
