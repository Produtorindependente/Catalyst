const fs = require("fs");

const arquivo = "data/produtos.json";

const produtosAtuais = JSON.parse(
    fs.readFileSync(arquivo, "utf8")
);

const novosProdutos = [
    {
        sku: "NUTTRIPANNI-PFS-350",
        nome: "Pão Francês com Sementes",
        descricao: "Pão sem glúten com sementes, ideal para o café da manhã e lanches.",
        preco: 27.90,
        precoAnterior: null,
        destaque: false,
        marca: "NuttriPänni",
        peso: "350 g",
        unidade: "5 unidades",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "MINASBREAD-PQG-300",
        nome: "Pão de Queijo com Goiabada",
        descricao: "Pão de queijo com recheio de goiabada.",
        preco: 28.90,
        precoAnterior: null,
        destaque: false,
        marca: "Minasbread",
        peso: "300 g",
        unidade: "",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "BEE-HOTDOG-125",
        nome: "Pão de Hot Dog sem Glúten",
        descricao: "Pão para hot dog sem glúten.",
        preco: 24.90,
        precoAnterior: null,
        destaque: false,
        marca: "Bee Gluten Free",
        peso: "125 g",
        unidade: "2 unidades",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "BEE-BISNAGUINHA",
        nome: "Bisnaguinha",
        descricao: "Bisnaguinha sem glúten.",
        preco: 24.90,
        precoAnterior: null,
        destaque: false,
        marca: "Bee Gluten Free",
        peso: "150 g",
        unidade: "",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "BEE-HAMBURGUER-125",
        nome: "Pão de Hambúrguer",
        descricao: "Pão de hambúrguer sem glúten.",
        preco: 24.90,
        precoAnterior: null,
        destaque: false,
        marca: "Bee Gluten Free",
        peso: "125 g",
        unidade: "2 unidades",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "BELIVE-CEBOLA-200",
        nome: "Pãozinho de Cebola",
        descricao: "Pãozinho de cebola sem glúten, sem lactose e sem proteína do leite.",
        preco: 23.90,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "200 g",
        unidade: "aprox. 9 unidades",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "BELIVE-CENOURA-200",
        nome: "Pãozinho de Cenoura",
        descricao: "Pãozinho de cenoura sem glúten, zero lactose e sem proteína do leite.",
        preco: 27.90,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "200 g",
        unidade: "aprox. 8 unidades",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "CASARIGANI-PITA-200",
        nome: "Pão Sírio Tipo Pita",
        descricao: "Pão sírio tipo pita sem glúten.",
        preco: 24.00,
        precoAnterior: null,
        destaque: false,
        marca: "Casa Rigani",
        peso: "200 g",
        unidade: "4 unidades",
        categoria: "Pães",
        imagem: ""
    },

    {
        sku: "CASARIGANI-WRAP-220",
        nome: "Wrap sem Glúten",
        descricao: "Massa para wrap sem glúten.",
        preco: 33.90,
        precoAnterior: null,
        destaque: false,
        marca: "Casa Rigani",
        peso: "220 g",
        unidade: "6 unidades",
        categoria: "Wraps e Massas",
        imagem: ""
    },

    {
        sku: "DATERRINHA-WRAP-150",
        nome: "Wrap de Tapioca Original",
        descricao: "Wrap de tapioca sem glúten.",
        preco: 10.90,
        precoAnterior: null,
        destaque: false,
        marca: "Da Terrinha",
        peso: "150 g",
        unidade: "5 unidades",
        categoria: "Wraps e Massas",
        imagem: ""
    },

    {
        sku: "BELIVE-CHIPS-BATATA-SALROSA-50",
        nome: "Chips de Batata-Doce com Sal Rosa do Himalaia",
        descricao: "Chips de batata-doce temperados com sal rosa do Himalaia.",
        preco: 9.90,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "50 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "BELIVE-CHIPS-MANDIOCA-CHIMICHURRI-50",
        nome: "Chips de Mandioca com Chimi Churri",
        descricao: "Chips de mandioca temperados com Chimi Churri.",
        preco: 9.99,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "50 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "BELIVE-CHIPS-MANDIOCA-LEMONPEPPER-50",
        nome: "Chips de Mandioca com Lemon Pepper",
        descricao: "Chips de mandioca temperados com Lemon Pepper.",
        preco: 9.99,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "50 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "BELIVE-CHIPS-BATATADOCE-SWEETCHILLI-50",
        nome: "Chips de Batata-Doce Sweet Chilli",
        descricao: "Chips de batata-doce temperados com Sweet Chilli.",
        preco: 9.99,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "50 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "ROOTS-CHIPS-BATATADOCE-MANJERICAO-45",
        nome: "Chips de Batata-Doce com Azeite e Manjericão",
        descricao: "Chips de batata-doce com azeite e manjericão.",
        preco: 9.90,
        precoAnterior: null,
        destaque: false,
        marca: "Roots To Go",
        peso: "45 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "TAMARA-CHIPS-BATATAROXA-GERGELIM-30",
        nome: "Chips de Batata Roxa com Gergelim Branco",
        descricao: "Chips de batata roxa com gergelim branco.",
        preco: 19.90,
        precoAnterior: null,
        destaque: false,
        marca: "Tâmara",
        peso: "30 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "TAMARA-CHIPS-BATATADOCE-30",
        nome: "Chips de Batata-Doce",
        descricao: "Chips de batata-doce.",
        preco: 19.90,
        precoAnterior: null,
        destaque: false,
        marca: "Tâmara",
        peso: "30 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "OKOSHI-CANJICA-SAL-40",
        nome: "Canjica de Milho com Sal Marinho",
        descricao: "Canjica de milho crocante com sal marinho.",
        preco: 6.90,
        precoAnterior: null,
        destaque: false,
        marca: "Okoshi",
        peso: "40 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "BELIVE-REQUEIJAO-MILHO-QUINOA-25",
        nome: "Salgadinho de Requeijão com Milho e Quinoa",
        descricao: "Snack de milho com sabor requeijão.",
        preco: 5.90,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "25 g",
        unidade: "",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "BELIVE-COOKIE-BAUNILHA-CHOCOLATE-ZERO-67",
        nome: "Cookies Baunilha & Chocolate Zero Açúcar",
        descricao: "Cookies de baunilha e chocolate sem adição de açúcar.",
        preco: 9.90,
        precoAnterior: null,
        destaque: false,
        marca: "Belive",
        peso: "67 g",
        unidade: "",
        categoria: "Cookies e Doces",
        imagem: ""
    }
];

const skusExistentes = new Set(
    produtosAtuais.map(p => p.sku).filter(Boolean)
);

let proximoId =
    Math.max(...produtosAtuais.map(p => Number(p.id) || 0)) + 1;

for (const produto of novosProdutos) {

    if (skusExistentes.has(produto.sku)) {
        console.log("Já existe:", produto.sku);
        continue;
    }

    produto.id = proximoId++;
    produtosAtuais.push(produto);

    console.log("Adicionado:", produto.id, produto.nome);
}

fs.writeFileSync(
    arquivo,
    JSON.stringify(produtosAtuais, null, 4) + "\n"
);

console.log("\nProdutos no catálogo:", produtosAtuais.length);