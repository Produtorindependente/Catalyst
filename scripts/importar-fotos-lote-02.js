const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

const novosProdutos = [
  {
    nome: "Ágar-Ágar em Pó",
    marca: "",
    categoria: "Farinhas e Pós",
    preco: 20.00,
    peso: "100 g",
    imagem: ""
  },

  {
    nome: "Dolomita",
    marca: "",
    categoria: "Suplementos",
    preco: 1.60,
    peso: "100 g",
    imagem:
      "https://acdn-us.mitiendanube.com/stores/004/724/738/products/dolomita-a8ebcce4cef81f287c17739754196994-1024-1024.webp"
  },

  {
    nome: "Argila Branca",
    marca: "",
    categoria: "Cosméticos Naturais",
    preco: 2.50,
    peso: "100 g",
    imagem: ""
  },

  {
    nome: "Argila Verde",
    marca: "",
    categoria: "Cosméticos Naturais",
    preco: 2.90,
    peso: "100 g",
    imagem:
      "https://images.tcdn.com.br/img/img_prod/1017481/argila_verde_100g_labotrat_cosmeticos_26851_1_0abb427e560ad9432075452f310a8ec3.jpg"
  },

  {
    nome: "Alcachofra",
    marca: "",
    categoria: "Chás",
    preco: 9.50,
    peso: "100 g",
    imagem: ""
  },

  {
    nome: "Amora Branca",
    marca: "",
    categoria: "Chás",
    preco: 9.50,
    peso: "100 g",
    imagem: ""
  },

  {
    nome: "Funcho",
    marca: "",
    categoria: "Chás",
    preco: 9.50,
    peso: "100 g",
    imagem: ""
  },

  {
    nome: "Alfazema Azul",
    marca: "",
    categoria: "Chás",
    preco: 25.00,
    peso: "100 g",
    imagem: ""
  },

  {
    nome: "Oliveira - Folha",
    marca: "",
    categoria: "Chás",
    preco: 9.50,
    peso: "100 g",
    imagem:
      "https://dcdn-us.mitiendanube.com/stores/002/513/867/products/oliveira1-74fba821bce2dd375216737209254221-480-0.webp"
  },

  {
    nome: "Macela - Flor",
    marca: "",
    categoria: "Chás",
    preco: 12.50,
    peso: "100 g",
    imagem: ""
  }
];

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

let adicionados = 0;
let existentes = 0;
let imagensAtualizadas = 0;

for (const novo of novosProdutos) {
  const nomeNovo = normalizar(novo.nome);

  const existente = produtos.find(
    p => normalizar(p.nome) === nomeNovo
  );

  if (existente) {
    existentes++;

    if (!existente.imagem && novo.imagem) {
      existente.imagem = novo.imagem;
      imagensAtualizadas++;

      console.log(
        `🖼️ Imagem atualizada: ${novo.nome}`
      );
    } else {
      console.log(
        `⏭️ Já existe: ${novo.nome}`
      );
    }

    continue;
  }

  produtos.push(novo);
  adicionados++;

  console.log(
    `✅ Produto adicionado: ${novo.nome}`
  );
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

const comImagem = produtos.filter(p => p.imagem).length;
const semImagem = produtos.filter(p => !p.imagem).length;

console.log("");
console.log("==========================================");
console.log("   LOTE FOTOS 02 — NOVOS PRODUTOS");
console.log("==========================================");
console.log(`Novos produtos: ${adicionados}`);
console.log(`Imagens atualizadas: ${imagensAtualizadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`TOTAL PRODUTOS AGORA: ${produtos.length}`);
console.log(`COM IMAGEM: ${comImagem}`);
console.log(`SEM IMAGEM: ${semImagem}`);
console.log("==========================================");
