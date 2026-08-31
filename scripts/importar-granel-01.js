const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // FRUTAS DESIDRATADAS
  // =====================================================

  "Manga Desidratada":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_Mango_Slices.JPG",

  "Kiwi Desidratado":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_kiwi_fruit_slices.jpg",

  "Blueberry":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Xinjiang_dried_blueberries.jpg",

  // =====================================================
  // FIGOS
  // =====================================================

  "Mini Figo Turco":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_figs_(2).jpg",

  "Figo Turco":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_figs_(2).jpg",

  // =====================================================
  // BANANA CHIPS
  // =====================================================

  "Banana Chips Doce":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Banana_chips.JPG",

  "Banana Chips Salgada":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Banana_chips.JPG",

  // =====================================================
  // OLEAGINOSAS
  // =====================================================

  "Macadâmia sem Sal":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Macadamia_nuts.jpg",

  "Castanha de Caju Crua W1":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/CASHEW_NUTS.jpg",

  "Noz Pecan":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pecans.jpg",

  // =====================================================
  // CACAU
  // =====================================================

  "Cacau 100% Alcalino":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa-powder-1883108.jpg",

  "Cacau 70%":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa-powder-1883108.jpg",

  "Cacau 50%":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa-powder-1883108.jpg",

  "Nibs de Cacau":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cocoa_Nibs_in_Bowl.jpg",

  // =====================================================
  // AÇÚCARES
  // =====================================================

  "Açúcar Mascavo":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brown_sugar_and_muscovado.jpg"
};

let aplicadas = 0;
let existentes = 0;
let naoEncontrados = 0;

for (const [nome, url] of Object.entries(imagens)) {

  const produto = produtos.find(
    p => String(p.nome || "").trim() === nome
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
console.log(" GRANEL — LOTE 01");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
