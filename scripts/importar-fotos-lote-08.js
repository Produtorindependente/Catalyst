const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    nome: "Fécula de Batata",
    aliases: [
      "Fécula de Batata",
      "Fecula de Batata",
      "Amido de Batata"
    ],
    descricao: "Fécula de batata vendida a granel.",
    preco: 2.90,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Farinhas",
    codigo: "350",
    imagem: "https://io.convertiez.com.br/m/trimais/shop/products/images/12531/medium/fecula-de-batata-vitao-300g_10672.jpg"
  },

  {
    nome: "Guaraná em Pó",
    aliases: [
      "Guaraná em Pó",
      "Guarana em Po",
      "Pó de Guaraná",
      "Guarana"
    ],
    descricao: "Guaraná em pó vendido a granel.",
    preco: 9.90,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Suplementos",
    codigo: "408",
    imagem: "https://lpvfaststore.vtexassets.com/arquivos/ids/168480/mix-nutri-guarana-em-po-100g-loja-projeto-verao-01.jpg?v=637045915805400000"
  },

  {
    nome: "Farinha de Uva",
    aliases: [
      "Farinha de Uva",
      "Farinha de Semente de Uva",
      "Uva em Pó"
    ],
    descricao: "Farinha de uva vendida a granel.",
    preco: 5.49,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Farinhas",
    codigo: "430",
    imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7ia3dx7usei95"
  },

  {
    nome: "Catuaba em Pó",
    aliases: [
      "Catuaba em Pó",
      "Catuaba em Po",
      "Catuaba"
    ],
    descricao: "Catuaba em pó vendida a granel.",
    preco: 8.00,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Suplementos",
    codigo: "219",
    imagem: "https://www.silvashopping.com.br/4489-large_default/catuaba-em-po-nutri-forte.jpg"
  },

  {
    nome: "Ginseng em Pó",
    aliases: [
      "Ginseng em Pó",
      "Ginseng em Po",
      "Ginseng"
    ],
    descricao: "Ginseng em pó vendido a granel.",
    preco: 5.99,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Suplementos",
    codigo: "357",
    imagem: "https://http2.mlstatic.com/D_872219-MLB108732224851_032026-C.jpg"
  },

  {
    nome: "Spirulina em Pó",
    aliases: [
      "Spirulina em Pó",
      "Spirulina em Po",
      "Espirulina em Pó",
      "Espirulina em Po"
    ],
    descricao: "Spirulina em pó vendida a granel.",
    preco: 34.90,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Suplementos",
    codigo: "380",
    imagem: "https://down-br.img.susercontent.com/file/cde33c269410b8624a16c5c8882961fe"
  },

  {
    nome: "Farinha de Grão-de-Bico",
    aliases: [
      "Farinha de Grão-de-Bico",
      "Farinha de Grao de Bico",
      "Farinha de Grão de Bico",
      "Grão de Bico em Farinha"
    ],
    descricao: "Farinha de grão-de-bico vendida a granel.",
    preco: 2.90,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Farinhas",
    codigo: "340",
    imagem: "https://images.tcdn.com.br/img/img_prod/1113620/farinha_de_gro_de_bico_1_20260617113630_9ce40c052280.jpg"
  },

  {
    nome: "Farinha de Banana Verde",
    aliases: [
      "Farinha de Banana Verde",
      "Farinha de Banana",
      "Banana Verde em Pó"
    ],
    descricao: "Farinha de banana verde vendida a granel.",
    preco: 4.50,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Farinhas",
    codigo: "332",
    imagem: "https://images.tcdn.com.br/img/img_prod/1376008/farinha_de_banana_verde_pura_100g_bellnutry_1_20260325120903_3091d4287839.jpg"
  },

  {
    nome: "Trigo para Kibe",
    aliases: [
      "Trigo para Kibe",
      "Trigo para Quibe",
      "Trigo para Kibbe",
      "Triguilho",
      "Bulgur"
    ],
    descricao: "Trigo para kibe vendido a granel.",
    preco: 1.30,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Grãos e Cereais",
    codigo: "274",
    imagem: "https://www.focoalternativo.com.br/media/cache/small/uploads/media/Default/0001/14/1e74fdda1ca89b4fa9d65aa13a82c1088861243f.jpeg"
  },

  {
    nome: "Extrato de Soja",
    aliases: [
      "Extrato de Soja",
      "Extrato de Soja em Pó",
      "Soja em Pó"
    ],
    descricao: "Extrato de soja em pó vendido a granel.",
    preco: 1.50,
    marca: "",
    peso: "",
    unidade: "100 g",
    categoria: "Farinhas e Pós",
    codigo: "323",
    imagem: "https://assets.instabuy.app.br/ib.item.image.large/l-6c8b6d9865c34ae2878861075f6514d0.jpeg"
  }
];

function normalizar(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function proximoId() {
  return Math.max(
    ...produtos.map(p => Number(p.id) || 0),
    0
  ) + 1;
}

console.log("");
console.log("==========================================");
console.log("        CATALYST — LOTE 08");
console.log("==========================================");
console.log("");

let adicionados = 0;
let ignorados = 0;

for (const novo of novosProdutos) {

  // Para produtos a granel:
  // o mesmo produto pode existir em outra apresentação.
  // Só bloqueamos se já houver exatamente o mesmo nome
  // com a mesma unidade de venda.

  const existente = produtos.find(
    p =>
      normalizar(p.nome) === normalizar(novo.nome) &&
      normalizar(p.unidade) === normalizar(novo.unidade)
  );

  if (existente) {
    console.log(`⚠️ JÁ EXISTE: ${novo.nome}`);
    console.log(`   ID existente: ${existente.id}`);
    console.log(`   Código existente: ${existente.codigo || "—"}`);
    console.log(`   → Cadastro preservado.`);
    console.log("");
    ignorados++;
    continue;
  }

  const produto = {
    id: proximoId(),
    nome: novo.nome,
    descricao: novo.descricao,
    preco: novo.preco,
    precoAnterior: null,
    destaque: false,
    marca: novo.marca,
    peso: novo.peso,
    unidade: novo.unidade,
    categoria: novo.categoria,
    codigo: novo.codigo,
    imagem: novo.imagem,
    aliases: novo.aliases
  };

  produtos.push(produto);

  console.log(`✅ Produto adicionado: ${produto.nome}`);
  console.log(`   ID: ${produto.id}`);
  console.log(`   Código: ${produto.codigo}`);
  console.log(`   Preço: R$ ${produto.preco.toFixed(2)} / ${produto.unidade}`);
  console.log(`   Imagem: ${produto.imagem}`);
  console.log("");

  adicionados++;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("==========================================");
console.log("        RESULTADO — LOTE 08");
console.log("==========================================");
console.log(`Processados: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`Já existentes/protegidos: ${ignorados}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
console.log("");
