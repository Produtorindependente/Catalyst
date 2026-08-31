const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {
  "Ágar-Ágar em Pó":
    "https://images.tcdn.com.br/img/img_prod/997686/180_agar_agar_em_po_100g_moedense_5101_1_8c0e080b6f0a88f3e32f78cda9446af9.jpg",

  "Dolomita":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dolomite.jpg",

  "Argila Branca":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kaolinite.jpg",

  "Argila Verde":
    "https://images.tcdn.com.br/img/img_prod/1017481/argila_verde_100g_labotrat_cosmeticos_26851_1_0abb427e560ad9432075452f310a8ec3.jpg",

  "Alcachofra":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_Artichoke_-_Flickr_-_glukupikron.jpg",

  "Amora Branca":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_mulberry_leaves.jpg",

  "Funcho":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fennel-seeds.jpg",

  "Alfazema Azul":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lavender_flowers_lavandula.jpg",

  "Oliveira - Folha":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Olive_leaves.jpg",

  "Macela - Flor":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Macela.JPG"
};

let atualizadas = 0;
let encontradas = 0;
let naoEncontradas = 0;

for (const [nome, url] of Object.entries(imagens)) {
  const produto = produtos.find(
    p => p.nome && p.nome.trim().toLowerCase() === nome.trim().toLowerCase()
  );

  if (!produto) {
    console.log(`⚠️ Produto não encontrado: ${nome}`);
    naoEncontradas++;
    continue;
  }

  encontradas++;
  produto.imagem = url;
  atualizadas++;

  console.log(`✅ Imagem aplicada: ${nome}`);
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log("   IMAGENS — LOTE 02");
console.log("==========================================");
console.log(`Imagens atualizadas: ${atualizadas}`);
console.log(`Produtos encontrados: ${encontradas}`);
console.log(`Não encontrados: ${naoEncontradas}`);
console.log(`TOTAL PRODUTOS: ${produtos.length}`);
console.log(`COM IMAGEM: ${produtos.filter(p => p.imagem).length}`);
console.log(`SEM IMAGEM: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
