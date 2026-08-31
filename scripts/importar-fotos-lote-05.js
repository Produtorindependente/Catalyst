const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const novosProdutos = [
  {
    nome: "Psyllium Husk 90%",
    aliases: [
      "Psyllium",
      "Psyllium Husk",
      "Psyllium 90%",
      "Casca de Psyllium",
      "Psyllium em Pó"
    ],
    categoria: "Suplementos",
    preco: 5.99,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Psyllium_Husk.jpg"
  },

  {
    nome: "Farinha de Aveia Integral",
    aliases: [
      "Farinha de Aveia Integral",
      "Aveia Integral em Pó",
      "Farinha de Aveia"
    ],
    categoria: "Farinhas",
    preco: 4.50,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yulaf_unu.jpg"
  },

  {
    nome: "Farinha de Aveia",
    aliases: [
      "Farinha de Aveia",
      "Aveia em Pó",
      "Farinha de Aveia Fina"
    ],
    categoria: "Farinhas",
    preco: 1.89,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yulaf_unu.jpg"
  },

  {
    nome: "Farinha de Amêndoa",
    aliases: [
      "Farinha de Amêndoa",
      "Farinha de Amêndoas",
      "Amêndoa em Pó",
      "Almond Flour"
    ],
    categoria: "Farinhas",
    preco: 12.99,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Almond_Flour_Coconut_Oil_Keto_Brownies_(36081996214).jpg"
  },

  {
    nome: "Farinha de Coco",
    aliases: [
      "Farinha de Coco",
      "Coco em Pó",
      "Coconut Flour"
    ],
    categoria: "Farinhas",
    preco: 3.49,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coconut_flour_textureB.jpg"
  },

  {
    nome: "Leite de Coco em Pó",
    aliases: [
      "Leite de Coco em Pó",
      "Leite Coco em Pó",
      "Coconut Milk Powder"
    ],
    categoria: "Ingredientes Naturais",
    preco: 7.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coconut_milk_powder_Primex_Coco.jpg"
  },

  {
    nome: "Colágeno Hidrolisado",
    aliases: [
      "Colágeno",
      "Colágeno Hidrolisado em Pó",
      "Colágeno em Pó"
    ],
    categoria: "Suplementos",
    preco: 13.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/COLLAGEN_PROTIEN.png"
  },

  {
    nome: "Fibra de Maçã",
    aliases: [
      "Fibra de Maçã",
      "Fibra de Maçã em Pó",
      "Apple Fiber"
    ],
    categoria: "Suplementos",
    preco: 9.00,
    peso: "100 g",
    imagem:
      "https://www.nowfoods.com/sites/default/files/styles/scale_1200/public/2023-11/5908-apple-fiber-pure-powder.png"
  },

  {
    nome: "Gelatina Natural",
    aliases: [
      "Gelatina",
      "Gelatina Natural",
      "Gelatina em Pó",
      "Gelatina Sem Sabor"
    ],
    categoria: "Ingredientes Naturais",
    preco: 4.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jell-O_ice_cream_powder_vanilla_(Culinary_Ephemera_-_Gelatin_and_Tapioca,_c._1912).png"
  },

  {
    nome: "Matcha",
    aliases: [
      "Matcha",
      "Matcha em Pó",
      "Chá Matcha",
      "Matcha Powder"
    ],
    categoria: "Chás",
    preco: 13.50,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Matcha_powder.jpg"
  },

  {
    nome: "Proteína Isolada",
    aliases: [
      "Proteína Isolada",
      "Proteína em Pó",
      "Whey Isolado",
      "Protein Isolate"
    ],
    categoria: "Proteínas",
    preco: 9.00,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hydrolyzed_Whey_Protein_Isolate.jpg"
  },

  {
    nome: "Cardamomo em Pó",
    aliases: [
      "Cardamomo",
      "Cardamomo em Pó",
      "Cardamomo Moído",
      "Cardamom Powder"
    ],
    categoria: "Temperos Naturais",
    preco: 48.00,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ground_cardamom.jpg"
  },

  {
    nome: "Cardamomo em Grãos",
    aliases: [
      "Cardamomo em Grãos",
      "Cardamomo em Sementes",
      "Grãos de Cardamomo",
      "Sementes de Cardamomo",
      "Cardamom Seeds"
    ],
    categoria: "Temperos Naturais",
    preco: 70.00,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cardamom_seeds.jpg"
  }
];

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

let adicionados = 0;
let atualizados = 0;

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function proximoId() {
  return Math.max(
    0,
    ...produtos.map(p => Number(p.id) || 0)
  ) + 1;
}

for (const novo of novosProdutos) {

  const existente = produtos.find(
    produto =>
      normalizar(produto.nome) === normalizar(novo.nome)
  );

  if (existente) {

    existente.imagem = novo.imagem;
    existente.aliases = novo.aliases;
    existente.categoria = novo.categoria;
    existente.preco = novo.preco;
    existente.peso = novo.peso;

    atualizados++;

    console.log(`🔄 Imagem/dados atualizados: ${novo.nome}`);

  } else {

    produtos.push({
      id: proximoId(),
      nome: novo.nome,
      descricao:
        `${novo.nome}, produto natural selecionado para venda a granel.`,
      preco: novo.preco,
      precoAnterior: null,
      destaque: false,
      peso: novo.peso,
      unidade: "100 g",
      categoria: novo.categoria,
      imagem: novo.imagem,
      aliases: novo.aliases
    });

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
console.log("   LOTE 05 — PRODUTOS + IMAGENS");
console.log("==========================================");
console.log(`Produtos processados: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`Atualizados: ${atualizados}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
