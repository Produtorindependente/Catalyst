const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    nome: "Black Maca Peruana Premium",
    marca: "Inka Qhatu",
    categoria: "Suplementos",
    preco: 68.00,
    peso: "150 g",
    imagem:
      "https://www.inkaqhatu.com/cdn/shop/files/A741088-2_1800x.jpg?v=1769114303"
  },

  {
    nome: "Beterraba em Pó",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 8.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beetroot_powder.jpg"
  },

  {
    nome: "Feno Grego em Pó",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 5.90,
    peso: "100 g",
    imagem:
      "https://moroccanspicysecrets.com/cdn/shop/files/1731402777.png?v=1727991863"
  },

  {
    nome: "Energético em Pó (Tribulus)",
    marca: "SEM MARCA",
    categoria: "Suplementos",
    preco: 11.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tribulus_terrestris_powder.jpg"
  },

  {
    nome: "Farinha de Berinjela",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 8.90,
    peso: "100 g",
    imagem:
      "https://cdn.awsli.com.br/2096/2096226/produto/131217110/71b61fbfdf.jpg"
  },

  {
    nome: "Farinha de Inhame",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 10.00,
    peso: "100 g",
    imagem:
      "https://cdn.shopify.com/s/files/1/0664/7034/6966/files/81L-t-6hlBL._SL1500_2048x2048.png?v=1661731860"
  },

  {
    nome: "Goma Xantana",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 8.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Xanthan_gum_powder.jpg"
  },

  {
    nome: "Semolina",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 2.20,
    peso: "100 g",
    imagem:
      "https://bowlvegetal.com/cdn/shop/files/semolina-semola-de-trigo-fina.jpg?v=1766457759&width=533"
  },

  {
    nome: "Farinha de Centeio",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 2.50,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rye_flour.jpg"
  },

  {
    nome: "Farinha de Maracujá",
    marca: "SEM MARCA",
    categoria: "Granel",
    preco: 3.50,
    peso: "100 g",
    imagem:
      "https://cdn.awsli.com.br/800x800/1988/1988690/produto/178721759/farinhamaracuj--ywcm7zuotv.png"
  }
];

let adicionados = 0;
let atualizados = 0;
let ignorados = 0;

for (const novo of novosProdutos) {

  const existente = produtos.find(
    p => p.nome &&
         p.nome.trim().toLowerCase() === novo.nome.trim().toLowerCase()
  );

  if (existente) {

    if (!existente.imagem) {
      existente.imagem = novo.imagem;
      atualizados++;
      console.log(`🖼️ Imagem adicionada: ${novo.nome}`);
    } else {
      ignorados++;
      console.log(`⏭️ Já existe completo: ${novo.nome}`);
    }

  } else {

    produtos.push(novo);
    adicionados++;

    console.log(`✅ Produto adicionado: ${novo.nome}`);
  }
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log("   LOTE FOTOS 01 — NOVOS PRODUTOS");
console.log("==========================================");
console.log(`Novos produtos: ${adicionados}`);
console.log(`Imagens atualizadas: ${atualizados}`);
console.log(`Já existentes: ${ignorados}`);
console.log(`TOTAL PRODUTOS AGORA: ${produtos.length}`);
console.log(`COM IMAGEM: ${produtos.filter(p => p.imagem).length}`);
console.log(`SEM IMAGEM: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
