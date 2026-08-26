const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    id: 317,
    nome: "Castanha do Pará",
    descricao: "Castanha do Pará inteira, vendida a granel, com sabor característico e textura crocante. Ideal para consumo direto e preparo de receitas.",
    preco: 24.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Oleaginosas",
    codigo: "466",
    imagem: "",
    aliases: [
      "Castanha do Pará",
      "Castanha-do-Pará",
      "Castanha do Brasil",
      "Castanha do Pará 100g"
    ]
  },

  {
    id: 318,
    nome: "Drageado de Morango",
    descricao: "Drageado de morango coberto com chocolate, vendido a granel. Combinação de sabor frutado e cobertura crocante de chocolate.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Drageados",
    codigo: "777",
    imagem: "",
    aliases: [
      "Drageado de Morango",
      "Morango com Chocolate",
      "Drageado de Morango com Chocolate"
    ]
  },

  {
    id: 319,
    nome: "Drageado de Licor de Morango",
    descricao: "Drageado de licor de morango coberto com chocolate, vendido a granel. Possui recheio de licor de morango envolvido por cobertura de chocolate.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Drageados",
    codigo: "777",
    imagem: "",
    aliases: [
      "Drageado Licor de Morango",
      "Drageado de Licor de Morango",
      "Licor de Morango com Chocolate",
      "Drageado de Morango com Licor"
    ]
  },

  {
    id: 320,
    nome: "Drageado de Licor de Conhaque",
    descricao: "Drageado de licor de conhaque coberto com chocolate, vendido a granel. Doce com recheio de licor envolvido por cobertura de chocolate.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Drageados",
    codigo: "777",
    imagem: "",
    aliases: [
      "Drageado Licor de Conhaque",
      "Drageado de Conhaque",
      "Licor de Conhaque com Chocolate",
      "Drageado de Licor"
    ]
  },

  {
    id: 321,
    nome: "Cebola, Alho e Salsa",
    descricao: "Mistura de cebola, alho e salsa desidratados, indicada para realçar o sabor de carnes, arroz, feijão, molhos, legumes e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "309",
    imagem: "",
    aliases: [
      "Cebola Alho e Salsa",
      "Cebola, Alho e Salsa",
      "Tempero Cebola Alho e Salsa",
      "Cebola Salsa e Alho"
    ]
  },

  {
    id: 322,
    nome: "Cebola Granulada",
    descricao: "Cebola desidratada granulada, prática para utilização em arroz, feijão, carnes, molhos, sopas, legumes e outras preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "387",
    imagem: "",
    aliases: [
      "Cebola Granulada",
      "Cebola Desidratada",
      "Cebola em Flocos"
    ]
  },

  {
    id: 323,
    nome: "Tempero Edu Guedes",
    descricao: "Mix de condimentos, legumes e ervas desidratados para realçar o sabor de preparações salgadas. Pode ser utilizado em carnes, arroz, feijão, legumes, molhos e outros pratos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "147",
    imagem: "https://static.wixstatic.com/media/068dc8_337467b9bd8f47319543c793407d39f4~mv2.png/v1/fill/w_544%2Ch_544%2Cal_c%2Clg_1%2Cq_85%2Cenc_avif%2Cquality_auto/068dc8_337467b9bd8f47319543c793407d39f4~mv2.png",
    aliases: [
      "Tempero Edu Guedes",
      "Tempero do Edu",
      "Edu Guedes"
    ]
  },

  {
    id: 324,
    nome: "Chimichurri sem Pimenta",
    descricao: "Mistura de ervas e especiarias desidratadas sem pimenta, indicada para carnes, churrascos, marinadas, molhos, saladas e diversos preparos.",
    preco: 8.70,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "1123",
    imagem: "https://cdnhuawei.lojavirtuolpro.com/sscondimentos/produtograde/20250214101805_1135998865_GZ.webp",
    aliases: [
      "Chimichurri sem Pimenta",
      "Chimichurri S/ Pimenta",
      "Chimichurri sem pimenta 100g"
    ]
  },

  {
    id: 325,
    nome: "Orégano",
    descricao: "Orégano desidratado, erva aromática de sabor marcante, indicado para pizzas, massas, molhos, carnes, saladas e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "28",
    imagem: "",
    aliases: [
      "Orégano",
      "Oregano",
      "Orégano 100g"
    ]
  },

  {
    id: 326,
    nome: "Tempero Gaúcho",
    descricao: "Blend de temperos e ervas para realçar o sabor de carnes, churrascos, feijão, sopas, farofas, saladas e legumes.",
    preco: 7.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "310",
    imagem: "https://cdn.awsli.com.br/2500x2500/2600/2600061/produto/217497456d2c462ef8c.jpg",
    aliases: [
      "Tempero Gaúcho",
      "Tempero Gaucho",
      "Tempero Gaúcho 100g"
    ]
  },

  {
    id: 327,
    nome: "Páprica Defumada",
    descricao: "Páprica em pó com sabor defumado e aroma marcante, indicada para carnes, legumes, molhos, sopas e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "266",
    imagem: "https://www.focoalternativo.com.br/uploads/media/Default/0001/09/66c46790058947c3a40f1748545b59ff872234d8.jpeg",
    aliases: [
      "Páprica Defumada",
      "Paprica Defumada",
      "Páprica Defumada em Pó"
    ]
  },

  {
    id: 328,
    nome: "Páprica Doce",
    descricao: "Páprica doce em pó, utilizada para adicionar cor, aroma e sabor suave a carnes, molhos, arroz, legumes e diversas preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "258",
    imagem: "https://acdn-us.mitiendanube.com/stores/003/774/956/products/payprica-doce-foco-100g-armazem-do-mercado-1c7e313381d43f58e017050103324688-480-0.webp",
    aliases: [
      "Páprica Doce",
      "Paprica Doce",
      "Páprica em Pó Doce"
    ]
  },

  {
    id: 329,
    nome: "Tempero Baiano com Pimenta",
    descricao: "Mistura de especiarias de perfil marcante, tradicionalmente utilizada para carnes, aves, peixes, feijão, molhos e preparações inspiradas na culinária baiana.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "253",
    imagem: "https://confeiteiro.agilecdn.com.br/58180_1.png?v=340-1057493266",
    aliases: [
      "Tempero Baiano",
      "Tempero Baiano com Pimenta",
      "Tempero Baiano C/ Pimenta",
      "Tempero Baiano Picante"
    ]
  },

  {
    id: 330,
    nome: "Mix Mexicano Bela",
    descricao: "Mix de temperos de perfil mexicano, indicado para realçar o sabor de carnes, preparações salgadas, molhos e pratos de inspiração mexicana.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "616",
    imagem: "",
    aliases: [
      "Mix Mexicano",
      "Mix Mexicano Bela",
      "Tempero Mexicano",
      "Mix de Temperos Mexicano"
    ]
  },

  {
    id: 331,
    nome: "Sal Rosa Fino",
    descricao: "Sal rosa do Himalaia em granulometria fina, indicado para temperar e finalizar diferentes preparações culinárias.",
    preco: 7.20,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "121",
    imagem: "",
    aliases: [
      "Sal Rosa Fino",
      "Sal Rosa do Himalaia Fino",
      "Sal Rosa Fino do Himalaia"
    ]
  },

  {
    id: 332,
    nome: "Sal Rosa Grosso",
    descricao: "Sal rosa do Himalaia em grãos grossos, indicado para temperar carnes, churrascos e outras preparações culinárias.",
    preco: 7.20,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "142",
    imagem: "https://a-static.mlcdn.com.br/800x800/sal-rosa-premium-100-natural-do-himalaia-grosso-pouch-100g-natural-do-povo/olistsp/ospoaia20po3ku1m/35e11ecee4d1b663f36f8bced0f0dab6.jpeg",
    aliases: [
      "Sal Rosa Grosso",
      "Sal Rosa do Himalaia Grosso",
      "Sal Rosa Grosso do Himalaia"
    ]
  },

  {
    id: 333,
    nome: "Mix Mexicano em Pó",
    descricao: "Mistura de temperos em pó de inspiração mexicana, indicada para carnes, molhos e preparações culinárias que pedem sabor mais intenso.",
    preco: 6.60,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "227",
    imagem: "",
    aliases: [
      "Mix Mexicano em Pó",
      "Mix Mexicano Pó",
      "Tempero Mexicano em Pó",
      "Tempero Mexicano"
    ]
  },

  {
    id: 334,
    nome: "Tempero Baiano sem Pimenta",
    descricao: "Mistura de especiarias inspirada na culinária baiana, sem pimenta, indicada para carnes, aves, feijão, molhos e preparações diversas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "153",
    imagem: "https://m.media-amazon.com/images/I/61VWLYz682L._AC_UL960_FMwebp_QL65_.jpg",
    aliases: [
      "Tempero Baiano sem Pimenta",
      "Tempero Baiano S/ Pimenta",
      "Tempero Baiano sem pimenta 100g"
    ]
  },

  {
    id: 335,
    nome: "Louro em Pó",
    descricao: "Folhas de louro moídas em pó, com aroma característico, indicada para temperar feijão, feijoada, carnes, caldos, sopas, molhos e ensopados.",
    preco: 14.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "121",
    imagem: "",
    aliases: [
      "Louro em Pó",
      "Louro em pó 100g",
      "Folha de Louro em Pó",
      "Louro Moído"
    ]
  },

  {
    id: 336,
    nome: "Páprica Picante",
    descricao: "Páprica picante em pó, indicada para acrescentar cor, aroma e picância a carnes, molhos, refogados, assados e outras preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: 100,
    unidade: "g",
    categoria: "Temperos Naturais",
    codigo: "330",
    imagem: "https://www.focoalternativo.com.br/uploads/media/Default/0001/14/04a359c422a02d3a3e3ccaa36ddaf92293adcbfa.jpeg",
    aliases: [
      "Páprica Picante",
      "Paprica Picante",
      "Páprica Picante em Pó"
    ]
  }
];

// ==========================================================
// PROTEÇÃO CONTRA DUPLICIDADE
// ==========================================================

const idsExistentes = new Set(produtos.map(p => Number(p.id)));

const novosParaAdicionar = novosProdutos.filter(produto => {
  if (idsExistentes.has(produto.id)) {
    console.log(`⚠️ ID ${produto.id} já existe — não duplicado.`);
    return false;
  }

  return true;
});

// ==========================================================
// ADICIONA OS PRODUTOS
// ==========================================================

produtos.push(...novosParaAdicionar);

// ==========================================================
// ORDENA PELO ID
// ==========================================================

produtos.sort((a, b) => Number(a.id) - Number(b.id));

// ==========================================================
// GRAVA JSON
// ==========================================================

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

// ==========================================================
// RELATÓRIO
// ==========================================================

console.log("==========================================");
console.log(" CATALYST — CADASTRO — LOTE 11");
console.log("==========================================");

novosParaAdicionar.forEach(p => {
  console.log(`✅ ID ${p.id} — ${p.nome}`);
  console.log(`   PREÇO: R$ ${p.preco.toFixed(2).replace(".", ",")}`);
  console.log(`   CÓDIGO: ${p.codigo}`);
  console.log(`   PESO: ${p.peso}${p.unidade}`);
  console.log(`   CATEGORIA: ${p.categoria}`);
  console.log(`   IMAGEM: ${p.imagem || "PENDENTE — buscar imagem comercial"}`);
});

console.log("==========================================");
console.log(`Produtos adicionados: ${novosParaAdicionar.length}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
