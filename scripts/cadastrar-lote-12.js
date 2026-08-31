const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    id: 347,
    nome: "Colorau",
    descricao: "Colorau em pó, vendido a granel, utilizado para dar cor e sabor às preparações. Ideal para arroz, feijão, carnes, aves, peixes, molhos e ensopados.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "112",
    categoria: "Temperos Naturais",
    imagem: "https://malvibrasil.bwimg.com.br/malvibrasil/produtos/colorifico--colorau--kg-1662997758.1446.jpg"
  },
  {
    id: 348,
    nome: "Tempero Pega Marido",
    descricao: "Mistura de temperos e especiarias desidratadas, vendida a granel. Ideal para carnes, frango, arroz, feijão, caldos, saladas e diversos preparos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "332",
    categoria: "Temperos Naturais",
    imagem: "https://www.focoalternativo.com.br/uploads/media/Default/0001/09/ff3f1a79f7ca16ba89bcd2eb6bba749b44d464a0.jpeg"
  },
  {
    id: 349,
    nome: "Chimichurri c/ Pimenta",
    descricao: "Mistura de ervas e especiarias desidratadas com pimenta, vendida a granel. Ideal para carnes, churrascos, grelhados, marinadas, molhos e saladas.",
    preco: 8.70,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "1122",
    categoria: "Temperos Naturais",
    imagem: "https://cdn.awsli.com.br/2500x2500/641/641976/produto/91849767/563151d8ab.jpg"
  },
  {
    id: 350,
    nome: "Cebola, Salsa e Tomate",
    descricao: "Mistura de cebola, salsa e tomate desidratados, vendida a granel. Ideal para carnes, aves, peixes, arroz, feijão, sopas, molhos, saladas, massas e refogados.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "815",
    categoria: "Temperos Naturais",
    imagem: "https://images.tcdn.com.br/img/img_prod/1113620/mix_de_cebola_salsa_e_tomate_3775_1_4d0d13f02d657d0c8637dfa8d4b52d4e.jpg"
  },
  {
    id: 351,
    nome: "Tempero Ana Maria",
    descricao: "Mistura de temperos desidratados para uso culinário, vendida a granel. Versátil para carnes, frango, arroz, feijão, caldos, saladas e outros preparos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "145",
    categoria: "Temperos Naturais",
    imagem: "https://filadelfiaalimentos.com.br/cdn/shop/files/TemperoAnaMaria100g_ccca6445-eba5-4894-b194-288ac09678be.png?v=1723560845"
  },
  {
    id: 352,
    nome: "Vinagrete",
    descricao: "Mistura de vegetais e temperos desidratados, vendida a granel. Ideal para saladas, carnes, churrascos, molhos, marinadas, sanduíches e acompanhamentos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "149",
    categoria: "Temperos Naturais",
    imagem: "https://images.tcdn.com.br/img/img_prod/1280894/tempero_de_vinagrete_411_1_f8f2a38e2782e5c32c135755f691d838.jpg"
  },
  {
    id: 353,
    nome: "Açafrão Premium",
    descricao: "Açafrão em pó, vendido a granel, com cor intensa e aroma característico. Ideal para arroz, carnes, molhos, sopas, legumes e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "201",
    categoria: "Temperos Naturais",
    imagem: "https://condimentosnordeste.com.br/_next/image?q=100&url=%2Fproducts%2Facafrao-100g.jpeg&w=640"
  },
  {
    id: 354,
    nome: "Cebola em Pó",
    descricao: "Cebola desidratada e moída em pó, vendida a granel. Prática e versátil para sopas, molhos, carnes, arroz, feijão, legumes, marinadas e temperos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "64",
    categoria: "Temperos Naturais",
    imagem: "https://cdn.awsli.com.br/800x800/1587/1587813/produto/93792162/rdcep-cebola-em-po-100g-nh4d5y37am.png"
  },
  {
    id: 355,
    nome: "Farinha de Cebola",
    descricao: "Cebola desidratada finamente moída, apresentada como farinha de cebola e vendida a granel. Ideal para temperar carnes, molhos, sopas, arroz, feijão e outras preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "133",
    categoria: "Temperos Naturais",
    imagem: "https://acdn-us.mitiendanube.com/stores/002/032/932/products/cebola-moida-8-cbaf90bdbedf818d3b17618391884460-1024-1024.webp"
  },
  {
    id: 356,
    nome: "Cúrcuma Pura",
    descricao: "Cúrcuma pura em pó, vendida a granel. Especiaria de cor amarela intensa, indicada para arroz, sopas, molhos, risotos, legumes, carnes e diversas preparações culinárias.",
    preco: 7.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "114",
    categoria: "Temperos Naturais",
    imagem: "https://down-br.img.susercontent.com/file/fe987080c5d92cfbe660a545b4ee87ad"
  }
];

for (const produto of novosProdutos) {
  const existente = produtos.find(p => p.id === produto.id);

  if (existente) {
    console.log(`⚠️ ID ${produto.id} já existe — ignorado`);
    continue;
  }

  produtos.push(produto);

  console.log(`✅ ID ${produto.id} — ${produto.nome}`);
  console.log(`   PREÇO: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`   CÓDIGO: ${produto.codigo}`);
  console.log(`   PESO: ${produto.peso}`);
  console.log(`   CATEGORIA: ${produto.categoria}`);
  console.log(`   IMAGEM: ${produto.imagem}`);
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("==========================================");
console.log(" CATALYST — CADASTRO — LOTE 12");
console.log("==========================================");
console.log(`Produtos processados: ${novosProdutos.length}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
