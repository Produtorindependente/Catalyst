const fs = require("fs");

const arquivo = "data/produtos.json";

const produtos = JSON.parse(
    fs.readFileSync(arquivo, "utf8")
);

const novosProdutos = [

    {
        sku: "PARAIBUNA-BANANINHA-SEM-ACUCAR",
        nome: "Bananinha sem Adição de Açúcar",
        descricao: "Doce de banana sem adição de açúcar.",
        preco: 5.50,
        precoAnterior: null,
        destaque: false,
        marca: "Paraibuna",
        peso: "",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "TACHAO-BANANA-SEM-ACUCAR",
        nome: "Doce de Banana sem Adição de Açúcares",
        descricao: "Doce de banana sem adição de açúcares.",
        preco: 5.90,
        precoAnterior: null,
        destaque: false,
        marca: "Tachão de Ubatuba",
        peso: "",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "TACHAO-BANANINHA-CHOCOLATE",
        nome: "Bananinha Coberta com Chocolate",
        descricao: "Bananinha coberta com chocolate.",
        preco: 5.90,
        precoAnterior: null,
        destaque: false,
        marca: "Tachão de Ubatuba",
        peso: "",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "TACHAO-BANANINHA-CANELA",
        nome: "Bananinha com Canela",
        descricao: "Bananinha com canela.",
        preco: 4.50,
        precoAnterior: null,
        destaque: false,
        marca: "Tachão de Ubatuba",
        peso: "",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "TACHAO-DOCE-BANANA-CANELA",
        nome: "Doce de Banana com Açúcar e Canela",
        descricao: "Doce de banana com açúcar e canela.",
        preco: 4.50,
        precoAnterior: null,
        destaque: false,
        marca: "Tachão de Ubatuba",
        peso: "",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    }
];

const skusExistentes = new Set(
    produtos.map(p => p.sku).filter(Boolean)
);

let proximoId =
    Math.max(...produtos.map(p => Number(p.id) || 0)) + 1;

let adicionados = 0;

for (const produto of novosProdutos) {

    if (skusExistentes.has(produto.sku)) {
        console.log("Já existe:", produto.sku);
        continue;
    }

    produto.id = proximoId++;
    produtos.push(produto);
    skusExistentes.add(produto.sku);

    adicionados++;

    console.log(
        `Adicionado: ${produto.id} — ${produto.nome}`
    );
}

fs.writeFileSync(
    arquivo,
    JSON.stringify(produtos, null, 4) + "\n"
);

console.log("");
console.log("Novos adicionados:", adicionados);
console.log("Total no catálogo:", produtos.length);