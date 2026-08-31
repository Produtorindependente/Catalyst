const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    id: 367,
    nome: "Coentro em Grão",
    descricao: "Sementes de coentro inteiras, vendidas a granel. Possuem aroma marcante e são utilizadas em carnes, peixes, frutos do mar, molhos, marinadas, caldos, legumes e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: null,
    validade: null,
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 368,
    nome: "Pimenta Jamaica em Grão",
    descricao: "Pimenta Jamaica em grãos, vendida a granel. Especiaria aromática utilizada em carnes, molhos, marinadas, ensopados, caldos e diversas preparações culinárias.",
    preco: 20.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "909",
    validade: "Nov/26",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 369,
    nome: "Pimenta Jamaica",
    descricao: "Pimenta Jamaica moída, vendida a granel. Especiaria aromática indicada para carnes, molhos, marinadas, caldos, ensopados e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "981",
    validade: "Nov/26",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 370,
    nome: "Pimenta Branca em Grão",
    descricao: "Pimenta-do-reino branca em grãos, vendida a granel. Possui sabor marcante e é indicada para carnes, peixes, aves, molhos, purês e outras preparações.",
    preco: 19.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "132",
    validade: "Set/26",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 371,
    nome: "Pimenta Branca em Pó",
    descricao: "Pimenta-do-reino branca moída, vendida a granel. Ideal para temperar carnes, peixes, aves, molhos, sopas, purês e diversas preparações culinárias.",
    preco: 18.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "356",
    validade: "Set/26",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 372,
    nome: "Pimenta do Reino em Pó",
    descricao: "Pimenta-do-reino preta moída, vendida a granel. Tempero versátil para carnes, aves, peixes, ovos, arroz, feijão, molhos, sopas e diversas receitas.",
    preco: 11.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "134",
    validade: "Mar/27",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 373,
    nome: "Pimenta Malagueta",
    descricao: "Pimenta Malagueta moída, vendida a granel. Possui sabor picante e é indicada para molhos, carnes, feijão, caldos, marinadas e preparações que pedem maior intensidade.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "12902",
    validade: "Nov/27",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 374,
    nome: "Pimenta Caiena",
    descricao: "Pimenta Caiena em pó, vendida a granel. Tem sabor picante e é indicada para carnes, aves, molhos, sopas, legumes, marinadas e diversas preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "931",
    validade: "Nov/26",
    categoria: "Temperos Naturais",
    imagem: null
  },
  {
    id: 375,
    nome: "Pimenta Preta em Grão",
    descricao: "Pimenta-do-reino preta em grãos, vendida a granel. Especiaria de sabor marcante e versátil, indicada para carnes, aves, peixes, molhos, caldos, marinadas e finalização de pratos.",
    preco: 12.99,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    peso: "100g",
    codigo: "159",
    validade: "Jun/27",
    categoria: "Temperos Naturais",
    imagem: null
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
    const mesmoNome =
      normalizar(p.nome) === normalizar(produto.nome);

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

  console.log(
    `✅ ID ${produto.id} — ${produto.nome} — R$ ${produto.preco
      .toFixed(2)
      .replace(".", ",")} — código: ${produto.codigo || "não legível"}`
  );
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — CADASTRO — LOTE 14");
console.log("==========================================");
console.log(`Produtos processados: ${adicionados.length}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
