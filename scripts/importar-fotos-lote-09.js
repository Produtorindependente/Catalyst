const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    nome: "Manjerona em Pó",
    aliases: [
      "Manjerona em Pó",
      "Manjerona",
      "Manjerona em po",
      "Origanum majorana"
    ],
    descricao: "Manjerona em pó vendida a granel.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Temperos Naturais",
    codigo: "99",
    imagem: ""
  },

  {
    nome: "Sucupira Miúda",
    aliases: [
      "Sucupira Miúda",
      "Sucupira Miuda",
      "Sucupira",
      "Sucupira miúda em pedaços"
    ],
    descricao: "Sucupira miúda desidratada vendida a granel.",
    preco: 15.50,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Chás",
    codigo: "485",
    imagem: "https://cdn.vnda.com.br/emporiomuritiba/2025/02/24/10_31_00_726_bd80ef825069cbcae9bf166c5df5701e.jpg?v=1752254935"
  },

  {
    nome: "Erva-do-Bicho",
    aliases: [
      "Erva-do-Bicho",
      "Erva do Bicho",
      "Erva de Bicho",
      "Polygonum acre"
    ],
    descricao: "Erva-do-bicho desidratada vendida a granel.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Chás",
    codigo: "578",
    imagem: ""
  },

  {
    nome: "Verbena",
    aliases: [
      "Verbena",
      "Verbena officinalis",
      "Verbena officinalis L."
    ],
    descricao: "Verbena desidratada vendida a granel.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Chás",
    codigo: "382",
    imagem: "https://www.erbologica.it/image/cache/catalog/immagini5/verbena-550x550.jpg.webp"
  },

  {
    nome: "Buchinha do Norte",
    aliases: [
      "Buchinha do Norte",
      "Buchinha do Norte unidade",
      "Buchinha",
      "Luffa operculata"
    ],
    descricao: "Buchinha do Norte comercializada por unidade.",
    preco: 10.00,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "1 unidade",
    unidade: "1 unidade",
    categoria: "Chás",
    codigo: "792",
    imagem: ""
  },

  {
    nome: "Losna",
    aliases: [
      "Losna",
      "Losna 100 g",
      "Artemisia absinthium",
      "Absinto"
    ],
    descricao: "Losna desidratada vendida a granel.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Chás",
    codigo: "2031",
    imagem: ""
  },

  {
    nome: "Jambolão",
    aliases: [
      "Jambolão",
      "Jambolao",
      "Jamelão",
      "Jamelão",
      "Syzygium jambolana"
    ],
    descricao: "Jambolão desidratado vendido a granel.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Chás",
    codigo: "33",
    imagem: "https://acdn-us.mitiendanube.com/stores/004/851/893/products/jambolao-cha-f5f57f282c208f5a0c17544238070244-1024-1024.webp"
  },

  {
    nome: "Tanchagem",
    aliases: [
      "Tanchagem",
      "Tansagem",
      "Transagem",
      "Plantago major"
    ],
    descricao: "Tanchagem desidratada vendida a granel.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Chás",
    codigo: "498",
    imagem: ""
  },

  {
    nome: "Drageado de Castanha de Caju 70%",
    aliases: [
      "Drageado de Castanha de Caju 70%",
      "Drageado Castanha de Caju 70%",
      "Castanha de Caju 70% Drageado",
      "Drageado de Caju 70%"
    ],
    descricao: "Castanha de caju coberta com chocolate 70% cacau, vendida a granel.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Oleaginosas",
    codigo: "777",
    imagem: "https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljpt3hlr12cmae"
  },

  {
    nome: "Castanha do Pará 70%",
    aliases: [
      "Castanha do Pará 70%",
      "Castanha do Para 70%",
      "Castanha-do-Pará 70%",
      "Castanha do Pará com Chocolate 70%"
    ],
    descricao: "Castanha do Pará coberta com chocolate 70% cacau, vendida a granel.",
    preco: 24.90,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Oleaginosas",
    codigo: "466",
    imagem: "https://images.tcdn.com.br/img/img_prod/654007/drageas_de_castanha_do_para_70_cacau_120g_363_1_936a7b83e2d503b5ab0cc7bc4bc52c33.jpg"
  },

  {
    nome: "Drageado de Castanha do Pará 70%",
    aliases: [
      "Drageado de Castanha do Pará 70%",
      "Drageado Castanha do Para 70%",
      "Drageado de Castanha do Pará com Chocolate 70%"
    ],
    descricao: "Castanha do Pará coberta com chocolate 70% cacau, vendida a granel.",
    preco: 24.30,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Oleaginosas",
    codigo: "466",
    imagem: "https://images.tcdn.com.br/img/img_prod/1126302/drageas_de_castanha_do_para_com_chocolate_intenso_70_70_1_fe53efce1c6a0f91f5a25649475aafce.jpg"
  },

  {
    nome: "Drageado de Amêndoas 70%",
    aliases: [
      "Drageado de Amêndoas 70%",
      "Drageado de Amendoas 70%",
      "Drageado Amêndoa 70%",
      "Drageado de Amêndoas com Chocolate 70%"
    ],
    descricao: "Amêndoas cobertas com chocolate 70% cacau, vendidas a granel.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Oleaginosas",
    codigo: "777",
    imagem: "https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dw1b75dbc4/images/col/828/8284640-frente.jpg?sh=2000&sw=2000"
  },

  {
    nome: "Drageado de Banana Passa com Whey 70%",
    aliases: [
      "Drageado de Banana Passa com Whey 70%",
      "Drageado Banana Passa Whey 70%",
      "Banana Passa com Whey 70%",
      "Drageado Banana Whey"
    ],
    descricao: "Banana passa drageada com cobertura de chocolate 70% e whey, vendida a granel.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    codigo: "777",
    imagem: ""
  },

  {
    nome: "Drageado de Avelã ao Leite",
    aliases: [
      "Drageado de Avelã ao Leite",
      "Drageado de Avela ao Leite",
      "Dragee de Avelã ao Leite",
      "Avelã ao Leite Drageado"
    ],
    descricao: "Avelãs cobertas com chocolate ao leite, vendidas a granel.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Oleaginosas",
    codigo: "777",
    imagem: "https://acdn-us.mitiendanube.com/stores/001/071/840/products/dragee_005-copy-826f4669cea040582517339320905780-640-0.webp"
  },

  {
    nome: "Drageado de Castanha de Caju ao Leite",
    aliases: [
      "Drageado de Castanha de Caju ao Leite",
      "Drageado Castanha de Caju ao Leite",
      "Castanha de Caju ao Leite",
      "Drageado de Caju ao Leite"
    ],
    descricao: "Castanha de caju coberta com chocolate ao leite, vendida a granel.",
    preco: 23.00,
    precoAnterior: null,
    destaque: false,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    categoria: "Oleaginosas",
    codigo: "777",
    imagem: ""
  }
];

function normalizar(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function existeProduto(produtoNovo) {
  const nomeNovo = normalizar(produtoNovo.nome);

  return produtos.find(p => {
    const nomes = [
      p.nome,
      ...(Array.isArray(p.aliases) ? p.aliases : [])
    ].map(normalizar);

    return nomes.includes(nomeNovo);
  });
}

let proximoId = produtos.reduce(
  (maior, p) => Math.max(maior, Number(p.id) || 0),
  0
) + 1;

let adicionados = 0;
let protegidos = 0;

console.log("==========================================");
console.log("       CATALYST — IMPORTAÇÃO LOTE 09");
console.log("==========================================");

for (const novo of novosProdutos) {
  const existente = existeProduto(novo);

  if (existente) {
    console.log(`\n⚠️ JÁ EXISTE — NÃO ALTERADO`);
    console.log(`   ${novo.nome}`);
    console.log(`   ID existente: ${existente.id}`);
    console.log(`   Nome cadastrado: ${existente.nome}`);
    protegidos++;
    continue;
  }

  const produto = {
    id: proximoId++,
    ...novo
  };

  produtos.push(produto);
  adicionados++;

  console.log(`\n✅ Produto adicionado: ${produto.nome}`);
  console.log(`   ID: ${produto.id}`);
  console.log(`   Código: ${produto.codigo}`);
  console.log(
    `   Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")} / ${produto.unidade}`
  );
  console.log(
    `   Imagem: ${produto.imagem || "SEM IMAGEM — buscar posteriormente"}`
  );
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("\n==========================================");
console.log("        RESULTADO — LOTE 09");
console.log("==========================================");
console.log(`Processados: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`Já existentes/protegidos: ${protegidos}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
