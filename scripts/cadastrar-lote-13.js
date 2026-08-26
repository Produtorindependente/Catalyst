const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    id: 357,
    nome: "Curry",
    descricao: "Curry em pó vendido a granel, preparado a partir de uma combinação aromática de especiarias. Ideal para carnes, aves, peixes, arroz, legumes, sopas, molhos e ensopados.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "511",
    categoria: "Temperos Naturais",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/4/49/Curry_Powder.JPG"
  },
  {
    id: 358,
    nome: "Caldo de Carne",
    descricao: "Caldo de carne em pó vendido a granel, ideal para intensificar o sabor de carnes, sopas, molhos, risotos, arroz, feijão e diversas preparações culinárias.",
    preco: 3.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "070",
    categoria: "Temperos Naturais",
    imagem: "https://cdn.awsli.com.br/800x800/2491/2491435/produto/179990494/73cddf4fff.jpg"
  },
  {
    id: 359,
    nome: "Lemon Pepper",
    descricao: "Lemon Pepper, combinação aromática de limão e pimenta, vendido a granel. Ideal para carnes, aves, peixes, saladas, legumes e molhos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "120",
    categoria: "Temperos Naturais",
    imagem: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/lemon_pepper_seasoning.jpg"
  },
  {
    id: 360,
    nome: "Fumaça em Pó",
    descricao: "Tempero de fumaça em pó vendido a granel, indicado para proporcionar sabor defumado a carnes, hambúrgueres, molhos, legumes, feijão e diversas preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "626",
    categoria: "Temperos Naturais",
    imagem: "https://www.focoalternativo.com.br/media/cache/small/uploads/media/Default/0001/14/b98bea54ce613cec640161c337c3c48cc8eeb926.jpeg"
  },
  {
    id: 361,
    nome: "Limão com Ervas Finas",
    descricao: "Tempero de limão com ervas finas vendido a granel, combinando ervas aromáticas com toque cítrico. Ideal para carnes, aves, peixes, saladas, legumes, arroz e marinadas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "749",
    categoria: "Temperos Naturais",
    imagem: "https://produtosoishii.com/webapp/uploads/produtos/limaoeerva.webp"
  },
  {
    id: 362,
    nome: "Tempero Sírio",
    descricao: "Mistura aromática de especiarias inspirada na culinária sírio-libanesa. Ideal para quibes, kaftas, carnes, aves, arroz, legumes, esfihas e outros pratos.",
    preco: 9.20,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "112",
    categoria: "Temperos Naturais",
    imagem: "https://cdn.dlojavirtual.com/static1/105518/sku/temperos-tempero-sirio-bahar-100g-p-1707967872304.jpg"
  },
  {
    id: 363,
    nome: "Zattar",
    descricao: "Zattar vendido a granel, tradicional mistura de especiarias da culinária do Oriente Médio. Ideal para pães, saladas, pastas, legumes, carnes, aves e diversas preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "150",
    categoria: "Temperos Naturais",
    imagem: "https://thumbor.cartpanda.com/xg4rBAJyWXgRPhq9sSOOPiYxrmg%3D/1024x1024/https%3A/assets.mycartpanda.com/static/products_images/c5/87/5a/1696904507440.jpeg?v=13252247658"
  },
  {
    id: 364,
    nome: "Pimenta Calabresa",
    descricao: "Pimenta calabresa desidratada em flocos, vendida a granel. Ideal para pizzas, massas, carnes, molhos, aves, legumes e preparações que pedem um toque picante.",
    preco: 3.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "712",
    categoria: "Temperos Naturais",
    imagem: "https://down-br.img.susercontent.com/file/sg-11134201-7rd55-luf19cgkqxtyc8"
  },
  {
    id: 365,
    nome: "Pimenta Chili",
    descricao: "Pimenta chili em pó vendida a granel, de sabor marcante e picante. Ideal para carnes, aves, molhos, sopas, legumes, marinadas, pratos mexicanos e diversas preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "1121",
    categoria: "Temperos Naturais",
    imagem: "https://images.heb.com/is/image/HEBGrocery/000150111-1"
  },
  {
    id: 366,
    nome: "Pimenta Rosa Grãos",
    descricao: "Pimenta rosa em grãos vendida a granel, com sabor delicado, levemente adocicado e aroma marcante. Ideal para carnes, peixes, saladas, molhos, marinadas e finalização de pratos.",
    preco: 12.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "136",
    categoria: "Temperos Naturais",
    imagem: "https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/pimenta-rosa-em-graos-100g-tempero-granel/djmcosmeticosprodutosnaturais/pimrosagraos100g/7a9abdbf0b2cb9635b1dd570f0c17b09.jpeg"
  }
];

function normalizar(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const adicionados = [];

for (const produto of novosProdutos) {
  const duplicado = produtos.some((p) => {
    const mesmoNome = normalizar(p.nome) === normalizar(produto.nome);
    const mesmoCodigo =
      p.codigo != null &&
      produto.codigo != null &&
      String(p.codigo).trim() === String(produto.codigo).trim();

    return mesmoNome || mesmoCodigo;
  });

  if (duplicado) {
    console.log(`⚠️ DUPLICADO — ${produto.nome} — não foi adicionado`);
    continue;
  }

  produtos.push(produto);
  adicionados.push(produto);

  console.log(`✅ ID ${produto.id} — ${produto.nome}`);
  console.log(`   PREÇO: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`   CÓDIGO: ${produto.codigo}`);
  console.log(`   PESO: ${produto.peso}`);
  console.log(`   CATEGORIA: ${produto.categoria}`);
  console.log(`   IMAGEM: ${produto.imagem}`);
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("==========================================");
console.log(" CATALYST — CADASTRO — LOTE 13");
console.log("==========================================");
console.log(`Produtos processados: ${adicionados.length}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
