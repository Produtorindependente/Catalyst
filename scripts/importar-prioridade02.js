const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // TOPWAY — 100% WHEY 35g
  // =====================================================

  "100% Whey Cookies":
    "http://dcdn-us.mitiendanube.com/stores/007/563/993/products/whey100-monodose-35g-hcgw-81c9833718f5459a7817857891589366-640-0.webp",

  "100% Whey Coco com Baunilha":
    "https://static.wixstatic.com/media/068dc8_2dbcc966b92b4d64b564fe244b1cd0f1~mv2.jpg/v1/fit/w_500%2Ch_500%2Cq_90/file.jpg",

  "100% Whey Torta de Limão":
    "https://images.tcdn.com.br/img/img_prod/1316500/sache_whey_protein_topway_100_35g_torta_de_limao_3385_1_a63b8ab390cc5e142aefcaf38200055d.png",

  "100% Whey Banoffee":
    "https://cdn.awsli.com.br/800x800/2404/2404599/produto/365674617/747854-1-x2iftwu1u4.webp",

  "100% Whey Chocolate com Avelã":
    "https://io.convertiez.com.br/m/drogalider/shop/products/images/40719/large/whey-topway-100-chocolate-com-avela-sache-35g_32574.png",

  // =====================================================
  // TACHÃO DE UBATUBA
  // =====================================================

  "Doce de Banana com Açúcar e Canela":
    "https://www.tachao.com.br/cdn/shop/files/tachaoubatuba_bananinhacanela_200g_mockup.png?v=1725044431&width=600",

  // =====================================================
  // PARAÍSO VERDE
  // =====================================================

  "Azeite de Abacate Extravirgem":
    "https://images.tcdn.com.br/img/img_prod/1249471/azeite_de_abacate_extra_virgem_250_ml_1_20260302092557_377d26fbc873.png",

  // =====================================================
  // BOMBAY HERBS & SPICES
  // =====================================================

  "Sriracha Hot Chili Sauce":
    "https://bombayhs.vtexassets.com/arquivos/ids/157553-800-auto?aspect=true&height=auto&v=639180829736570000&width=800",

  "Extrato Natural de Baunilha":
    "https://bombayhs.vtexassets.com/arquivos/ids/157422/extrato-de-baunilha.jpg?v=639125551118130000",

  // =====================================================
  // COPRA
  // =====================================================

  "Shoyu de Coco Copra":
    "https://images.tcdn.com.br/img/img_prod/1033103/shoyu_de_coco_copra_250ml_721_1_0196a633103783e40c896cf6fe94eb20.jpg"
};

let aplicadas = 0;
let existentes = 0;
let naoEncontrados = 0;

function normalizar(txt) {
  return String(txt || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const [nome, url] of Object.entries(imagens)) {

  const alvo = normalizar(nome);

  const produto = produtos.find(p => {
    const n = normalizar(p.nome);
    return n === alvo;
  });

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
console.log(" PRIORIDADE 02 — IMAGENS DIRETAS");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
