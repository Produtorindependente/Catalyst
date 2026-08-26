const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

/*
===========================================================
 CATALYST — IMPORTAÇÃO DE FOTOS — LOTE 11
===========================================================

 REGRA:
 - Preço SEMPRE vem da foto enviada pelo usuário.
 - Produtos a granel: preço referente a 100g.
 - Código vem da etiqueta da foto.
 - Imagem comercial somente quando houver URL direta.
 - NÃO substituir produto existente automaticamente.
 - NÃO apagar produtos existentes.
===========================================================
*/

const novosProdutos = [
  {
    nome: "Castanha do Pará c/ Chocolate ao Leite",
    aliases: [
      "Castanha do Pará c/ Chocolate ao Leite",
      "Castanha do Pará com Chocolate ao Leite",
      "Castanha do Pará ao Leite",
      "Drageado de Castanha do Pará ao Leite"
    ],
    descricao: "Castanha do Pará envolvida em cobertura de chocolate ao leite, vendida a granel.",
    preco: 24.90,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "466",
    categoria: "Drageados e Chocolates",
    imagem: "https://acdn-us.mitiendanube.com/stores/002/370/060/products/para-ao-leite-2-4e3d9067ae2a781e8517326512193319-1024-1024.webp"
  },

  {
    nome: "Drageado de Amendoim c/ Chocolate ao Leite",
    aliases: [
      "Drageado de Amendoim c/ Chocolate ao Leite",
      "Drageado de Amendoim com Chocolate ao Leite",
      "Amendoim com Chocolate ao Leite",
      "Amendoim Drageado"
    ],
    descricao: "Amendoim coberto com chocolate ao leite, vendido a granel.",
    preco: 23.00,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "777",
    categoria: "Drageados e Chocolates",
    imagem: "https://cdn.awsli.com.br/2417/2417061/arquivos/draga-amendoim-leite.png"
  },

  {
    nome: "Drageado de Uva Passa c/ Chocolate ao Leite",
    aliases: [
      "Drageado de Uva Passa c/ Chocolate ao Leite",
      "Drageado de Uva Passa com Chocolate ao Leite",
      "Drageado de Uva",
      "Uva Passa com Chocolate ao Leite"
    ],
    descricao: "Uvas passas cobertas com chocolate ao leite, vendidas a granel.",
    preco: 23.00,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "777",
    categoria: "Drageados e Chocolates",
    imagem: "https://cdn.awsli.com.br/1305/1305297/produto/152916935cfdd8e108b.jpg"
  },

  {
    nome: "Drageado de Castanha do Pará",
    aliases: [
      "Drageado de Castanha do Pará",
      "Drageado de Castanha",
      "Castanha do Pará Drageada",
      "Castanha do Pará com Chocolate"
    ],
    descricao: "Castanha do Pará envolvida em cobertura de chocolate, vendida a granel.",
    preco: 23.00,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "777",
    categoria: "Drageados e Chocolates",
    imagem: "https://images.tcdn.com.br/img/img_prod/1126302/180_drageas_de_castanha_do_para_com_chocolate_intenso_70_70_1_fe53efce1c6a0f91f5a25649475aafce.jpg"
  },

  {
    nome: "Cebola, Alho e Salsa",
    aliases: [
      "Cebola, Alho e Salsa",
      "Cebola Alho e Salsa",
      "Cebola/Salsa/Alho",
      "Tempero Cebola Alho e Salsa"
    ],
    descricao: "Mistura de cebola, alho e salsa desidratados para uso culinário.",
    preco: 7.90,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "309",
    categoria: "Temperos e Especiarias",
    imagem: "https://images.tcdn.com.br/img/img_prod/758670/cebola_salsa_alho_100g.jpg"
  },

  {
    nome: "Cebola Granulada",
    aliases: [
      "Cebola Granulada",
      "Cebola Granulada Desidratada",
      "Cebola em Flocos"
    ],
    descricao: "Cebola desidratada granulada para uso culinário.",
    preco: 7.90,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "387",
    categoria: "Temperos e Especiarias",
    imagem: "https://cdnhuawei.lojavirtuolpro.com/sscondimentos/produto/multifotos/hd/20250214111420_6115993885_DZ.webp"
  },

  {
    nome: "Tempero Edu Guedes",
    aliases: [
      "Tempero Edu Guedes",
      "Edu Guedes",
      "Tempero Edú Guedes"
    ],
    descricao: "Blend de temperos e vegetais desidratados inspirado no Tempero Edu Guedes.",
    preco: 7.90,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "147",
    categoria: "Temperos e Especiarias",
    imagem: ""
  },

  {
    nome: "Chimichurri s/ Pimenta",
    aliases: [
      "Chimichurri s/ Pimenta",
      "Chimichurri sem Pimenta",
      "Chimichurri S/Pimenta"
    ],
    descricao: "Mistura de ervas e especiarias para preparo de carnes e outros pratos, sem pimenta.",
    preco: 8.70,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "1123",
    categoria: "Temperos e Especiarias",
    imagem: "https://cdn.iset.io/assets/39790/produtos/1039/chimichurri-sem-pimenta-ziplock-relva-verde-100g.jpg"
  },

  {
    nome: "Orégano",
    aliases: [
      "Orégano",
      "Oregano"
    ],
    descricao: "Orégano desidratado para uso culinário.",
    preco: 7.90,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "28",
    categoria: "Temperos e Especiarias",
    imagem: "https://www.bernardoalimentos.com.br/produtos/c560e2eb4580913c542025272286f1e1.png"
  },

  {
    nome: "Tempero Gaúcho",
    aliases: [
      "Tempero Gaúcho",
      "Tempero Gaucho"
    ],
    descricao: "Mistura de temperos e especiarias para preparo de carnes, arroz, massas e outras receitas.",
    preco: 7.00,
    marca: "",
    peso: "100 g",
    unidade: "100 g",
    codigo: "310",
    categoria: "Temperos e Especiarias",
    imagem: "https://images.tcdn.com.br/img/img_prod/764158/tempero_gaucho_150g_793_1_962087a94bbd1f11e179547d9e0e8daf.png"
  }
];

/*
===========================================================
 FUNÇÕES
===========================================================
*/

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function encontrarExistente(produto) {
  const aliases = [
    produto.nome,
    ...(produto.aliases || [])
  ].map(normalizar);

  return produtos.find(p => {
    const nomesExistentes = [
      p.nome,
      ...(p.aliases || [])
    ].map(normalizar);

    return aliases.some(a =>
      nomesExistentes.some(e => e === a)
    );
  });
}

function proximoId() {
  const ids = produtos
    .map(p => Number(p.id))
    .filter(Number.isFinite);

  return ids.length ? Math.max(...ids) + 1 : 1;
}

/*
===========================================================
 IMPORTAÇÃO
===========================================================
*/

let adicionados = 0;
let protegidos = 0;
let pendentes = 0;

console.log("==========================================");
console.log("        CATALYST — LOTE 11");
console.log("==========================================");

for (const novo of novosProdutos) {

  console.log("");
  console.log(`🔎 ${novo.nome}`);

  const existente = encontrarExistente(novo);

  if (existente) {
    console.log(`⚠️ POSSÍVEL EXISTENTE — protegido`);
    console.log(`   ID: ${existente.id}`);
    console.log(`   Nome: ${existente.nome}`);
    console.log(`   Código existente: ${existente.codigo || "SEM CÓDIGO"}`);
    protegidos++;
    continue;
  }

  const produto = {
    id: proximoId(),
    nome: novo.nome,
    aliases: novo.aliases,
    descricao: novo.descricao,
    preco: novo.preco,
    marca: novo.marca,
    peso: novo.peso,
    unidade: novo.unidade,
    codigo: novo.codigo,
    categoria: novo.categoria,
    imagem: novo.imagem
  };

  produtos.push(produto);

  adicionados++;

  if (!novo.imagem) {
    pendentes++;
  }

  console.log(`✅ Produto adicionado: ${produto.nome}`);
  console.log(`   ID: ${produto.id}`);
  console.log(`   Código: ${produto.codigo}`);
  console.log(`   Preço: R$ ${produto.preco.toFixed(2)} / ${produto.unidade}`);
  console.log(`   Categoria: ${produto.categoria}`);

  if (produto.imagem) {
    console.log(`   Imagem: ${produto.imagem}`);
  } else {
    console.log(`   Imagem: PENDENTE — localizar depois`);
  }
}

/*
===========================================================
 SALVAR
===========================================================
*/

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log("           RESULTADO — LOTE 11");
console.log("==========================================");
console.log(`Processados: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`Já existentes/protegidos: ${protegidos}`);
console.log(`Imagens pendentes: ${pendentes}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
