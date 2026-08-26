const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    nome: "Drageado de Banana c/ Chocolate 70% Dietético",
    aliases: [
      "Drageado de Banana c/ Chocolate 70% Dietético",
      "Drageado de Banana com Chocolate 70% Dietético",
      "Banana Passa c/ Chocolate 70% Zero Açúcar"
    ],
    descricao: "Banana passa drageada com chocolate 70%, vendida a granel.",
    preco: 22.00,
    marca: "",
    codigo: "773",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: "https://cdn.awsli.com.br/2500x2500/1901/1901991/produto/98473215/6cce6e2b78.jpg"
  },

  {
    nome: "Castanhinha de Banana c/ Chocolate 70%",
    aliases: [
      "Castanhinha de Banana c/ Chocolate 70%",
      "Castanhinha de Banana com Chocolate 70%"
    ],
    descricao: "Castanhinha de banana com cobertura de chocolate 70%, vendida a granel.",
    preco: 19.00,
    marca: "",
    codigo: "597",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: ""
  },

  {
    nome: "Amendoim c/ Chocolate 70%",
    aliases: [
      "Amendoim c/ Chocolate 70%",
      "Drageado de Amendoim c/ Chocolate 70%",
      "Drageado de Amendoim com Chocolate 70%"
    ],
    descricao: "Amendoim drageado com cobertura de chocolate 70% cacau, vendido a granel.",
    preco: 24.90,
    marca: "",
    codigo: "776",
    unidade: "100 g",
    categoria: "Oleaginosas",
    imagem: ""
  },

  {
    nome: "Gotas Branca 0 Açúcar",
    aliases: [
      "Gotas Branca 0 Açúcar",
      "Gotas Brancas 0 Açúcar",
      "Gotas de Chocolate Branco 0 Açúcar"
    ],
    descricao: "Gotas de chocolate branco sem açúcar, vendidas a granel.",
    preco: 19.90,
    marca: "",
    codigo: "774",
    unidade: "100 g",
    categoria: "Chocolates",
    imagem: ""
  },

  {
    nome: "Gotas de Chocolate ao Leite 0 Açúcar",
    aliases: [
      "Gotas de Chocolate ao Leite 0 Açúcar",
      "Gotas Chocolate ao Leite 0 Açúcar"
    ],
    descricao: "Gotas de chocolate ao leite sem açúcar, vendidas a granel.",
    preco: 19.90,
    marca: "",
    codigo: "774",
    unidade: "100 g",
    categoria: "Chocolates",
    imagem: ""
  },

  {
    nome: "Drageado de Uva c/ Chocolate 70%",
    aliases: [
      "Drageado de Uva c/ Chocolate 70%",
      "Drageado de Uva Passa c/ Chocolate 70%",
      "Drageado de Uva Passa com Chocolate 70%"
    ],
    descricao: "Uva passa drageada com cobertura de chocolate 70%, vendida a granel.",
    preco: 20.00,
    marca: "",
    codigo: "773",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: "https://www.lojadivinaterra.com.br/drageado-de-uva-passa-com-chocolate-70--cacau-a-granel/p"
  },

  {
    nome: "Drageado de Amendoim c/ Chocolate 70%",
    aliases: [
      "Drageado de Amendoim c/ Chocolate 70%",
      "Drageado de Amendoim com Chocolate 70% Cacau"
    ],
    descricao: "Amendoim drageado com chocolate 70% cacau, vendido a granel.",
    preco: 20.00,
    marca: "",
    codigo: "773",
    unidade: "100 g",
    categoria: "Oleaginosas",
    imagem: ""
  },

  {
    nome: "Drageado de Cranberry c/ Chocolate 70%",
    aliases: [
      "Drageado de Cranberry c/ Chocolate 70%",
      "Drageado de Cranberry com Chocolate 70%"
    ],
    descricao: "Cranberry drageado com cobertura de chocolate 70%, vendido a granel.",
    preco: 20.00,
    marca: "",
    codigo: "773",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: ""
  },

  {
    nome: "Drageado de Cranberry Zero Açúcar",
    aliases: [
      "Drageado de Cranberry Zero Açúcar",
      "Drageado Cranberry Chocolate 70% Zero Açúcar"
    ],
    descricao: "Cranberry drageado com chocolate 70% sem açúcar, vendido a granel.",
    preco: 20.00,
    marca: "",
    codigo: "773",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: ""
  },

  {
    nome: "Only4 Chocolate + Cranberry 70%",
    aliases: [
      "Only4 Chocolate + Cranberry 70%",
      "Only4 70% Cacau com Cranberry 70g",
      "Chocolate Only4 Cranberry 70%"
    ],
    descricao: "Chocolate Only4 com 70% de cacau e cranberry, embalagem de 70 g.",
    preco: 28.90,
    marca: "Only4",
    codigo: "",
    unidade: "70 g",
    categoria: "Chocolates",
    imagem: "https://www.zerolatte.com/categoria-chocolates"
  },

  {
    nome: "Bala de Alcaçuz",
    aliases: [
      "Bala de Alcaçuz",
      "Alcaçuz"
    ],
    descricao: "Bala de alcaçuz vendida a granel.",
    preco: 11.00,
    marca: "",
    codigo: "265",
    unidade: "100 g",
    categoria: "Guloseimas",
    imagem: ""
  },

  {
    nome: "Damasco c/ Chocolate 70%",
    aliases: [
      "Damasco c/ Chocolate 70%",
      "Damasco com Chocolate 70%",
      "Drageado de Damasco com Chocolate 70%"
    ],
    descricao: "Damasco drageado com cobertura de chocolate 70%, vendido a granel.",
    preco: 21.90,
    marca: "",
    codigo: "776",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: ""
  },

  {
    nome: "Drageado de Limão Siciliano",
    aliases: [
      "Drageado de Limão Siciliano",
      "Drageado Limão Siciliano"
    ],
    descricao: "Limão siciliano drageado, vendido a granel.",
    preco: 23.00,
    marca: "",
    codigo: "777",
    unidade: "100 g",
    categoria: "Frutas Desidratadas",
    imagem: ""
  }
];

function normalizar(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function jaExiste(produto) {
  const nomeBusca = normalizar(produto.nome);

  return produtos.some(p => {
    const nomeExistente = normalizar(p.nome);

    if (nomeExistente === nomeBusca) return true;

    if (
      produto.codigo &&
      String(p.codigo || "") === String(produto.codigo)
    ) {
      return false;
    }

    return (produto.aliases || []).some(alias =>
      nomeExistente === normalizar(alias)
    );
  });
}

console.log("==========================================");
console.log("        CATALYST — LOTE 10");
console.log("==========================================");

let adicionados = 0;
let protegidos = 0;

for (const produto of novosProdutos) {
  if (jaExiste(produto)) {
    console.log(`\n⚠️ JÁ EXISTENTE/PROTEGIDO: ${produto.nome}`);
    protegidos++;
    continue;
  }

  const novoId =
    Math.max(0, ...produtos.map(p => Number(p.id) || 0)) + 1;

  const registro = {
    ...produto,
    id: novoId
  };

  produtos.push(registro);
  adicionados++;

  console.log(`\n✅ Produto adicionado: ${produto.nome}`);
  console.log(`   ID: ${novoId}`);
  console.log(`   Código: ${produto.codigo || "SEM CÓDIGO"}`);
  console.log(
    `   Preço: R$ ${produto.preco.toFixed(2)} / ${produto.unidade}`
  );
  console.log(
    `   Imagem: ${produto.imagem || "PENDENTE — localizar depois"}`
  );
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("\n==========================================");
console.log("        RESULTADO — LOTE 10");
console.log("==========================================");
console.log(`Processados: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`Já existentes/protegidos: ${protegidos}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
