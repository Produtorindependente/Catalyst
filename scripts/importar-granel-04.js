const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // FLOCOS DE ARROZ — GRANEL
  // CC0 / imagem de arroz em flocos
  // =====================================================

  "Flocos de Arroz":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Poha_(Rice_Flakes).jpg",

  // =====================================================
  // AÇÚCAR DE COCO — GRANEL
  // =====================================================

  "Açúcar de Coco":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hainan_coconut_sugar.jpg",

  // =====================================================
  // AÇÚCAR DEMERARA — GRANEL
  // =====================================================

  "Açúcar Demerara":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Demerara_sugar_crystals.jpg",

  // =====================================================
  // FARINHA PANKO — GRANEL
  // =====================================================

  "Farinha Panko":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/011221-White-IMG_3991.jpg"
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
console.log(" GRANEL — LOTE 04");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
