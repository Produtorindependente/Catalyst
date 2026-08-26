const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

const novosProdutos = [
  {
    nome: "Maçã para Chá",
    aliases: [
      "Maçã p/ Chá",
      "Maçã Desidratada para Chá",
      "Maçã Desidratada p/ Chá"
    ],
    marca: "",
    categoria: "Chás",
    preco: 14.00,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_apple_slices.jpg"
  },

  {
    nome: "Limão Desidratado",
    aliases: [
      "Limão desidratado",
      "Limão Desidratado em Rodelas",
      "Limão em Rodelas Desidratado"
    ],
    marca: "",
    categoria: "Frutas Desidratadas",
    preco: 9.50,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dried_lemon_slices.jpg"
  },

  {
    nome: "Laranja para Chá",
    aliases: [
      "Laranja p/ Chá",
      "Laranja Desidratada",
      "Laranja Desidratada para Chá",
      "Laranja em Rodelas Desidratada"
    ],
    marca: "",
    categoria: "Chás",
    preco: 14.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zhejiang_Jiaxing_dried_orange_slices.jpg"
  },

  {
    nome: "Cravo da Índia",
    aliases: [
      "Cravo-da-Índia",
      "Cravo da India",
      "Cravo-da-India",
      "Cravo Inteiro"
    ],
    marca: "",
    categoria: "Temperos Naturais",
    preco: 15.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Clove_spices.jpg"
  },

  {
    nome: "Anis Estrelado",
    aliases: [
      "Anis estrelado",
      "Anis-Estrelado",
      "Anis Estrelado Inteiro"
    ],
    marca: "",
    categoria: "Temperos Naturais",
    preco: 14.90,
    peso: "100 g",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Star_Anise.jpg"
  },

  {
    nome: "Glucomannan",
    aliases: [
      "Glucomanano",
      "Glucomannan em Pó",
      "Glucomanano em Pó",
      "Glucomannan Pó"
    ],
    marca: "",
    categoria: "Suplementos",
    preco: 29.90,
    peso: "100 g",
    imagem:
      "https://acdn-us.mitiendanube.com/stores/005/938/453/products/glu2-ss-9a695dee6faf68e07917724625205886-1024-1024.webp"
  },

  {
    nome: "Amaranto em Flocos",
    aliases: [
      "Amaranto Flocos",
      "Amaranto em flocos"
    ],
    marca: "",
    categoria: "Cereais",
    preco: 7.90,
    peso: "100 g",
    imagem:
      "https://cdn.awsli.com.br/800x800/2600/2600061/produto/307779769/1kg--4--cdemnattb2.png"
  },

  {
    nome: "Chlorella em Pó",
    aliases: [
      "Chlorella",
      "Chlorella Pó",
      "Chlorella em pó"
    ],
    marca: "",
    categoria: "Suplementos",
    preco: 26.90,
    peso: "100 g",
    imagem:
      "https://downtoearth.ie/cdn/shop/products/Iswari_Organic_Chlorella_Powder_125g_grande.jpg?v=1757322163"
  },

  {
    nome: "Açaí em Pó",
    aliases: [
      "Acai em Pó",
      "Açaí Pó",
      "Açai Pó",
      "Açaí em pó"
    ],
    marca: "",
    categoria: "Suplementos",
    preco: 15.00,
    peso: "100 g",
    imagem:
      "https://www.armazemsantafilomena.com.br/media/catalog/product/cache/a36d91cf602f5056eec13cb46a66de5e/p/o/polpa_de_acai.webp"
  },

  {
    nome: "Levedura de Cerveja em Pó",
    aliases: [
      "Levedo de Cerveja em Pó",
      "Levedura de Cerveja",
      "Levedo de Cerveja",
      "Levedura Cerveja em Pó"
    ],
    marca: "",
    categoria: "Suplementos",
    preco: 5.30,
    peso: "100 g",
    imagem:
      "https://cdn.awsli.com.br/426/426927/produto/17695884/a9efcb2a62.jpg"
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
let imagensAtualizadas = 0;
let jaExistentes = 0;

for (const novo of novosProdutos) {

  const nomesParaBuscar = [
    novo.nome,
    ...(novo.aliases || [])
  ].map(normalizar);

  const existente = produtos.find((produto) => {
    const nomeExistente = normalizar(produto.nome);
    return nomesParaBuscar.includes(nomeExistente);
  });

  if (existente) {

    jaExistentes++;

    if (!existente.imagem && novo.imagem) {
      existente.imagem = novo.imagem;
      imagensAtualizadas++;

      console.log(`🖼️ Imagem adicionada: ${existente.nome}`);
    } else {
      console.log(`⏭️ Já existente: ${existente.nome}`);
    }

  } else {

    const produto = {
      nome: novo.nome,
      marca: novo.marca,
      categoria: novo.categoria,
      preco: novo.preco,
      peso: novo.peso,
      imagem: novo.imagem
    };

    produtos.push(produto);

    adicionados++;

    console.log(`✅ Produto adicionado: ${novo.nome}`);
  }
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

const comImagem = produtos.filter((p) => p.imagem).length;
const semImagem = produtos.filter((p) => !p.imagem).length;

console.log("");
console.log("==========================================");
console.log("   LOTE FOTOS 03 — PRODUTOS + IMAGENS");
console.log("==========================================");
console.log(`Novos produtos: ${adicionados}`);
console.log(`Imagens atualizadas: ${imagensAtualizadas}`);
console.log(`Já existentes: ${jaExistentes}`);
console.log(`TOTAL PRODUTOS AGORA: ${produtos.length}`);
console.log(`COM IMAGEM: ${comImagem}`);
console.log(`SEM IMAGEM: ${semImagem}`);
console.log("==========================================");
