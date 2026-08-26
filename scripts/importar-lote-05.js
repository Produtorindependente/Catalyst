const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // PADARIA
  // =====================================================

  "Pão de Queijo com Goiabada":
    "https://www.lojagranarolo.com.br/media/catalog/product/cache/1/image/800x800/040ec09b1e35df139433887a97daa66f/p/a/pao-de-queijo-goiabada-300g-minasbread.jpg",

  // =====================================================
  // DA TERRINHA
  // =====================================================

  "Wrap de Tapioca Original":
    "https://www.comercialsouzaatacado.com.br/media/catalog/product/cache/1/image/800x/17f82f742ffe127f42dca9de82fb58b1/0/5/05281001901_2.jpg",

  // =====================================================
  // FRUTAS / GRANEL
  // =====================================================

  "Gengibre Cristalizado":
    "https://casaperris.com/cdn/shop/files/2381_jengibre_cristal.jpg?v=1726484828",

  "Mamão Cristalizado":
    "https://www.nozdobrasil.com.br/cdn/shop/files/mamao-cristalizado.jpg",

  "Amêndoa Laminada":
    "https://images.tcdn.com.br/img/img_prod/1161475/amendoa_laminada_100g_a_granel_61_1_1b4962b64bc79d049446dcf68557dd91.jpg",

  // =====================================================
  // BISCOITOS
  // =====================================================

  "Biscoito Banana e Canela":
    "https://www.focoalternativo.com.br/uploads/media/Default/0001/14/4cebd98f1ed3d2ef8d6c11a34505b46028c6ec24.jpeg",

  "Biscoito de Maracujá Vegano":
    "https://cdn.awsli.com.br/2500x2500/472/472611/produto/28544222/mockup-maracuj--xa4q8m92hx.png",

  "Biscoito Beliscão":
    "https://produtosbitota.com.br/images/products/beliscao.png"
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
console.log(" LOTE 05 — PADARIA / GRANEL / BISCOITOS");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
