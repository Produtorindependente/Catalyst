const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

const imagens = {

  "Mucuna Nutricional":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mucuna-pruriens-seeds.jpg",

  "Quirera de Milho":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Corn_grits.jpg",

  "Farinha de Milho":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Corn_flour_%2820240709%29.jpg",

  "Farinha de Mandioca Fina":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Farinha_de_mandioca.jpg",

  "Tapioca Granulada":
    "https://chinezinho.com.br/wp-content/uploads/2024/08/tapioca-granulada-400g.png",

  "Maca Peruana":
    "https://www.soflor.com.br/wp-content/uploads/2017/05/maca-peruana-em-po-para-consumo-2.jpg",

  "Farinha de Linhaça Marrom":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Brown_Flax_Seeds.jpg",

  "Farinha de Linhaça":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ground_flax_seeds_in_a_glass_jar_illuminated_by_window_light_%2851173270515%29.jpg",

  "Gengibre em Pó":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ginger_powder_%281%29.jpg",

  "Chia Premium":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chia_seeds.jpg",

  "Farinha de Chia":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/RECALLED_%E2%80%93_Sprouted_Chia_Seed_Powder_Products_%2814176356119%29.jpg"

};

let atualizadas = 0;
let encontrados = 0;
let naoEncontrados = 0;

for (const [nome, imagem] of Object.entries(imagens)) {

  const produto = produtos.find(
    p => p.nome === nome
  );

  if (!produto) {

    console.log(`❌ Não encontrado: ${nome}`);
    naoEncontrados++;

    continue;
  }

  encontrados++;

  produto.imagem = imagem;

  atualizadas++;

  console.log(`✅ Imagem aplicada: ${nome}`);
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

const comImagem = produtos.filter(
  p => p.imagem && p.imagem.trim() !== ""
).length;

const semImagem = produtos.length - comImagem;

console.log("");
console.log("==========================================");
console.log("       IMAGENS — LOTE 04");
console.log("==========================================");
console.log(`Imagens atualizadas: ${atualizadas}`);
console.log(`Produtos encontrados: ${encontrados}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`TOTAL PRODUTOS: ${produtos.length}`);
console.log(`COM IMAGEM: ${comImagem}`);
console.log(`SEM IMAGEM: ${semImagem}`);
console.log("==========================================");
