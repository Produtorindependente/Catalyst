const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // AMENDOIM
  // =====================================================

  "Xerém de Amendoim":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Crushed_peanuts.jpg",

  "Amendoim Doce":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Peanuts_and_lime.jpg",

  // =====================================================
  // NOZES
  // =====================================================

  "Noz Quartilho":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Walnuts_in_the_shell.jpg",

  "Noz Quartz":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Walnuts.jpg",

  "Noz Mariposa":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Walnut_halves.jpg",

  // =====================================================
  // FRUTAS
  // =====================================================

  "Goji Berry":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Goji_dried_berries.jpg",

  "Morango Glaceado":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Candied_strawberries.jpg",

  "Mix de Frutas Tropicais":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_fruits.jpg",

  "Mix de Frutas Vermelhas":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_fruit_mix.jpg",

  "Frutas Cristalizadas":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Candied_fruit.jpg",

  "Banana Passa":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_banana.jpg",

  // =====================================================
  // CHIPS / COCO
  // =====================================================

  "Chips de Kiwi":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_kiwi.jpg",

  "Chips de Coco sem Açúcar":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coconut_chips.jpg",

  "Chips de Coco com Bordo":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coconut_chips.jpg",

  // =====================================================
  // ADOÇANTES / INGREDIENTES
  // =====================================================

  "Eritritol":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Eritritol.jpg",

  "Cravo em Pó":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ground_cloves.jpg",

  "Bicarbonato de Sódio":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Baking_soda.jpg",

  // =====================================================
  // POLVILHOS
  // =====================================================

  "Polvilho Doce":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tapioca_starch.jpg",

  "Polvilho Azedo":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tapioca_starch.jpg",

  // =====================================================
  // FUBÁ
  // =====================================================

  "Fubá Italiano":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Polenta_uncooked.jpg"
};

let aplicadas = 0;
let existentes = 0;
let naoEncontrados = 0;

function normalizar(txt) {
  return String(txt || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

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
console.log(" GRANEL — LOTE 03");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
