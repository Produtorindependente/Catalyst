const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // FRUTAS DESIDRATADAS
  // =====================================================

  "Damasco":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Apricot_(dried).jpg",

  "Cereja Desidratada":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_cherries.JPG",

  "Abacaxi Desidratado":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_pineapple.JPG",

  "Tâmara sem Caroço":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_dates.jpg",

  "Tâmara Jumbo":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_dates.jpg",

  // =====================================================
  // CASTANHA-DO-PARÁ
  // =====================================================

  "Castanha do Pará Inteira":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazil_nuts.jpg",

  "Castanha do Pará Quebrada":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazil_nuts.jpg",

  // =====================================================
  // CASTANHA DE CAJU
  // =====================================================

  "Castanha de Caju Quebrada sem Sal":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_cashew_nuts_ready_for_roasting_(33174335490).jpg",

  "Castanha de Caju Assada sem Sal":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_cashew_nuts_ready_for_roasting_(33174335490).jpg",

  "Castanha de Caju Torrada com Sal":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_cashew_nuts_ready_for_roasting_(33174335490).jpg",

  "Castanha de Caju Torrada sem Sal":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_cashew_nuts_ready_for_roasting_(33174335490).jpg",

  // =====================================================
  // PISTACHE
  // =====================================================

  "Pistache com Casca":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/CSIRO_ScienceImage_3512_Pistachio_nuts.jpg",

  "Pistache Inteiro sem Casca":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/CSIRO_ScienceImage_3512_Pistachio_nuts.jpg",

  // =====================================================
  // AMENDOIM
  // =====================================================

  "Amendoim Natural":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Walnuts_pistachios_cashew_almonds.jpg",

  "Amendoim sem Casca":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Walnuts_pistachios_cashew_almonds.jpg",

  // =====================================================
  // MIX DE CASTANHAS
  // =====================================================

  "Mix de Castanhas":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Raw_nuts.jpg"
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
console.log(" GRANEL — LOTE 02");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
