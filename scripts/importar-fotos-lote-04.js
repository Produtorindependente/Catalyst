const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const novosProdutos = [
  {
    nome: "Mucuna Nutricional",
    aliases: [
      "Mucuna",
      "Mucuna Pruriens",
      "Mucuna Pruriens em Pó",
      "Mucuna Nutricional em Pó"
    ],
    categoria: "Suplementos",
    preco: 19.90,
    peso: "100 g"
  },

  {
    nome: "Quirera de Milho",
    aliases: [
      "Quirera",
      "Canjiquinha de Milho",
      "Milho Quirera"
    ],
    categoria: "Cereais",
    preco: 1.50,
    peso: "100 g"
  },

  {
    nome: "Farinha de Milho",
    aliases: [
      "Farinha de milho",
      "Farinha Milho"
    ],
    categoria: "Cereais",
    preco: 2.99,
    peso: "100 g"
  },

  {
    nome: "Farinha de Mandioca Fina",
    aliases: [
      "Farinha de mandioca",
      "Farinha de mandioca fina",
      "Farinha Mandioca Fina"
    ],
    categoria: "Farinhas",
    preco: 7.90,
    peso: "100 g"
  },

  {
    nome: "Tapioca Granulada",
    aliases: [
      "Tapioca",
      "Tapioca granulada"
    ],
    categoria: "Farinhas",
    preco: 2.60,
    peso: "100 g"
  },

  {
    nome: "Maca Peruana",
    aliases: [
      "Maca",
      "Maca Peruana em Pó",
      "Maca Peruana Pó"
    ],
    categoria: "Suplementos",
    preco: 10.00,
    peso: "100 g"
  },

  {
    nome: "Farinha de Linhaça Marrom",
    aliases: [
      "Linhaça Marrom",
      "Farinha de Linhaca Marrom",
      "Linhaca Marrom"
    ],
    categoria: "Farinhas",
    preco: 4.50,
    peso: "100 g"
  },

  {
    nome: "Farinha de Linhaça",
    aliases: [
      "Farinha de Linhaca",
      "Linhaça em Farinha",
      "Linhaca em Farinha"
    ],
    categoria: "Farinhas",
    preco: 2.99,
    peso: "100 g"
  },

  {
    nome: "Gengibre em Pó",
    aliases: [
      "Gengibre",
      "Gengibre Pó",
      "Gengibre em po"
    ],
    categoria: "Temperos Naturais",
    preco: 7.90,
    peso: "100 g"
  },

  {
    nome: "Chia Premium",
    aliases: [
      "Chia",
      "Semente de Chia",
      "Chia Premium"
    ],
    categoria: "Sementes",
    preco: 4.99,
    peso: "100 g"
  },

  {
    nome: "Farinha de Chia",
    aliases: [
      "Chia em Farinha",
      "Farinha de chia",
      "Chia Farinha"
    ],
    categoria: "Farinhas",
    preco: 5.50,
    peso: "100 g"
  }
];

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

let adicionados = 0;
let jaExistentes = 0;

for (const novo of novosProdutos) {

  const nomesParaBuscar = [
    novo.nome,
    ...(novo.aliases || [])
  ].map(normalizar);

  const existente = produtos.find(produto => {
    return nomesParaBuscar.includes(
      normalizar(produto.nome)
    );
  });

  if (existente) {

    jaExistentes++;

    console.log(
      `⏭️ Já existente: ${existente.nome}`
    );

  } else {

    produtos.push({
      nome: novo.nome,
      marca: "",
      categoria: novo.categoria,
      preco: novo.preco,
      peso: novo.peso,
      imagem: ""
    });

    adicionados++;

    console.log(
      `✅ Adicionado: ${novo.nome}`
    );
  }
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log("       LOTE 04 — IMPORTAÇÃO");
console.log("==========================================");
console.log(`Produtos deste lote: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`Já existentes: ${jaExistentes}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
