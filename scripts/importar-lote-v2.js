const fs = require("fs");

const arquivo = "data/produtos.json";

const produtos = JSON.parse(
    fs.readFileSync(arquivo, "utf8")
);

const novosProdutos = [

    {
        sku: "LATAMPROTEIN-WAFER-CAPPUCCINO-25",
        nome: "Wafer Cappuccino",
        descricao: "Wafer proteico sabor cappuccino.",
        preco: 8.90,
        precoAnterior: null,
        destaque: false,
        marca: "Latamprotein",
        peso: "25 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "LATAMPROTEIN-WAFER-AVELÃ-25",
        nome: "Wafer Creme de Avelã",
        descricao: "Wafer proteico sabor creme de avelã.",
        preco: 8.90,
        precoAnterior: null,
        destaque: false,
        marca: "Latamprotein",
        peso: "25 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "NUTRATA-BACIO-PISTACCHIO",
        nome: "Bacio di Latte Pistacchio",
        descricao: "Produto proteico sabor pistache.",
        preco: 15.90,
        precoAnterior: null,
        destaque: false,
        marca: "Nutrata",
        peso: "",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "NUTRATA-BACIO-CARAMELLO",
        nome: "Bacio di Latte Caramello Salgado",
        descricao: "Produto proteico sabor caramelo salgado.",
        preco: 13.90,
        precoAnterior: null,
        destaque: false,
        marca: "Nutrata",
        peso: "",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "NUTRATA-HAVANNA-DULCE",
        nome: "Havanna Legítimo Dulce de Leche",
        descricao: "Produto proteico sabor dulce de leche.",
        preco: 14.00,
        precoAnterior: null,
        destaque: false,
        marca: "Nutrata",
        peso: "",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "NUTRATA-HAVANNA-BROWNIE",
        nome: "Havanna Brownie de Chocolate e Dulce de Leche",
        descricao: "Produto proteico sabor brownie de chocolate e dulce de leche.",
        preco: 19.90,
        precoAnterior: null,
        destaque: false,
        marca: "Nutrata",
        peso: "",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "INTEGRALMEDICA-PROTEINCRISP-OVOMALTINE",
        nome: "Protein Crisp Ovomaltine",
        descricao: "Barra proteica sabor Ovomaltine.",
        preco: 12.90,
        precoAnterior: null,
        destaque: false,
        marca: "Integralmédica",
        peso: "45 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "AUSTRALIA-PROTEINMAX-CHOCNIBS",
        nome: "Protein Max Chocolate & Nibs",
        descricao: "Barra proteica com chocolate e nibs.",
        preco: 19.00,
        precoAnterior: null,
        destaque: false,
        marca: "Austrália",
        peso: "",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "MU-CHOCO-WHEYFER-AVELÃ",
        nome: "Choco Wheyfer Chocolate com Avelã",
        descricao: "Wheyfer proteico sabor chocolate com avelã.",
        preco: 9.90,
        precoAnterior: null,
        destaque: false,
        marca: "+Mu",
        peso: "25 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "MU-CHOCO-WHEYFER-COOKIES",
        nome: "Choco Wheyfer Cookies'n Cream",
        descricao: "Wheyfer proteico sabor cookies'n cream.",
        preco: 9.90,
        precoAnterior: null,
        destaque: false,
        marca: "+Mu",
        peso: "25 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "TOPWAY-WHEY-COOKIES-35",
        nome: "100% Whey Cookies",
        descricao: "Whey protein monodose sabor cookies.",
        preco: 12.00,
        precoAnterior: null,
        destaque: false,
        marca: "Topway",
        peso: "35 g",
        unidade: "1 sachê",
        categoria: "Proteínas",
        imagem: ""
    },

    {
        sku: "TOPWAY-WHEY-COCO-35",
        nome: "100% Whey Coco com Baunilha",
        descricao: "Whey protein monodose sabor coco com baunilha.",
        preco: 12.00,
        precoAnterior: null,
        destaque: false,
        marca: "Topway",
        peso: "35 g",
        unidade: "1 sachê",
        categoria: "Proteínas",
        imagem: ""
    },

    {
        sku: "TOPWAY-WHEY-LIMAO-35",
        nome: "100% Whey Torta de Limão",
        descricao: "Whey protein monodose sabor torta de limão.",
        preco: 12.00,
        precoAnterior: null,
        destaque: false,
        marca: "Topway",
        peso: "35 g",
        unidade: "1 sachê",
        categoria: "Proteínas",
        imagem: ""
    },

    {
        sku: "TOPWAY-WHEY-BANOFFEE-35",
        nome: "100% Whey Banoffee",
        descricao: "Whey protein monodose sabor banoffee.",
        preco: 12.00,
        precoAnterior: null,
        destaque: false,
        marca: "Topway",
        peso: "35 g",
        unidade: "1 sachê",
        categoria: "Proteínas",
        imagem: ""
    },

    {
        sku: "TOPWAY-WHEY-AVELÃ-35",
        nome: "100% Whey Chocolate com Avelã",
        descricao: "Whey protein monodose sabor chocolate com avelã.",
        preco: 12.00,
        precoAnterior: null,
        destaque: false,
        marca: "Topway",
        peso: "35 g",
        unidade: "1 sachê",
        categoria: "Proteínas",
        imagem: ""
    },

    {
        sku: "AIRON-PACOQUINHA-ZERO-17",
        nome: "Paçoquinha Zero Adição de Açúcares",
        descricao: "Paçoquinha sem adição de açúcares.",
        preco: 5.00,
        precoAnterior: null,
        destaque: false,
        marca: "Airon",
        peso: "17 g",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "LATAMFIT-COCADA-ABACAXI",
        nome: "Cocada com Abacaxi",
        descricao: "Cocada sabor abacaxi.",
        preco: 4.90,
        precoAnterior: null,
        destaque: false,
        marca: "Latam Fit",
        peso: "",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "LATAMFIT-NUTS-CRANBERRY-25",
        nome: "Nuts & Fruits Cranberry",
        descricao: "Mix de nuts e frutas com cranberry.",
        preco: 5.00,
        precoAnterior: null,
        destaque: false,
        marca: "Latam Fit",
        peso: "25 g",
        unidade: "1 unidade",
        categoria: "Snacks",
        imagem: ""
    },

    {
        sku: "LATAMFIT-GOIABINHA-ZERO-22",
        nome: "Goiabinha Cremosa Zero",
        descricao: "Goiabinha cremosa sem adição de açúcar.",
        preco: 3.90,
        precoAnterior: null,
        destaque: false,
        marca: "Latam Fit",
        peso: "22 g",
        unidade: "1 unidade",
        categoria: "Doces",
        imagem: ""
    },

    {
        sku: "TOPWAY-PROTEIN-PAODEMEL-45",
        nome: "Protein Pão de Mel",
        descricao: "Produto proteico sabor pão de mel.",
        preco: 11.00,
        precoAnterior: null,
        destaque: false,
        marca: "Topway",
        peso: "45 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "ATL-PROTEIN-COOKIES-49",
        nome: "Best Whey Cookies & Cream",
        descricao: "Produto proteico sabor cookies & cream.",
        preco: 14.90,
        precoAnterior: null,
        destaque: false,
        marca: "Atlhetica Nutrition",
        peso: "49 g",
        unidade: "1 unidade",
        categoria: "Proteicos",
        imagem: ""
    },

    {
        sku: "LACIELLE-TIMBERS-PISTACHE",
        nome: "Water Timber's Zero Pistache",
        descricao: "Bebida zero sabor pistache.",
        preco: 6.90,
        precoAnterior: null,
        destaque: false,
        marca: "Lacielle",
        peso: "324 g",
        unidade: "12 unidades",
        categoria: "Bebidas",
        imagem: ""
    },

    {
        sku: "APIARIO-MEL-FLORES-35",
        nome: "Mel Flores Silvestres",
        descricao: "Mel de flores silvestres em sachês.",
        preco: 6.90,
        precoAnterior: null,
        destaque: false,
        marca: "Apiário Santo Antonio",
        peso: "35 g",
        unidade: "10 sachês",
        categoria: "Mel e Própolis",
        imagem: ""
    },

    {
        sku: "APIARIO-MEL-ALHO-160",
        nome: "Mel & Alho",
        descricao: "Mel combinado com alho.",
        preco: 19.90,
        precoAnterior: null,
        destaque: false,
        marca: "Apiário Santo Antonio",
        peso: "160 g",
        unidade: "1 pote",
        categoria: "Mel e Própolis",
        imagem: ""
    },

    {
        sku: "FAUNA-VERDPROPOLIS-30",
        nome: "Verdprópolis — Extrato de Própolis Verde",
        descricao: "Extrato de própolis verde.",
        preco: 48.90,
        precoAnterior: null,
        destaque: false,
        marca: "Fauna & Flora",
        peso: "30 ml",
        unidade: "1 frasco",
        categoria: "Mel e Própolis",
        imagem: ""
    },

    {
        sku: "FAUNA-REDPROPOLIS-30",
        nome: "Redprópolis — Extrato de Própolis Vermelho",
        descricao: "Extrato de própolis vermelho.",
        preco: 55.90,
        precoAnterior: null,
        destaque: false,
        marca: "Fauna & Flora",
        peso: "30 ml",
        unidade: "1 frasco",
        categoria: "Mel e Própolis",
        imagem: ""
    },

    {
        sku: "APIARIO-PROPOLIS-GLICOLICO-30",
        nome: "Extrato de Própolis Glicólico",
        descricao: "Extrato de própolis verde sem álcool.",
        preco: 43.90,
        precoAnterior: null,
        destaque: false,
        marca: "Apiário Santo Antonio",
        peso: "30 ml",
        unidade: "1 frasco",
        categoria: "Mel e Própolis",
        imagem: ""
    },

    {
        sku: "APIARIO-SPRAY-MEL-PROPOLIS",
        nome: "Spray de Mel com Própolis, Romã e Gengibre",
        descricao: "Spray à base de mel com extratos de própolis, romã e gengibre.",
        preco: 16.90,
        precoAnterior: null,
        destaque: false,
        marca: "Apiário Santo Antonio",
        peso: "",
        unidade: "1 frasco",
        categoria: "Mel e Própolis",
        imagem: ""
    },

    {
        sku: "CHAMED-LINHACA-1000-100",
        nome: "Óleo de Linhaça",
        descricao: "Suplemento de óleo de linhaça com ômega 3-6-9.",
        preco: 60.90,
        precoAnterior: null,
        destaque: false,
        marca: "Chamed",
        peso: "1000 mg",
        unidade: "100 cápsulas",
        categoria: "Suplementos",
        imagem: ""
    },

    {
        sku: "CHAMED-CHLORELLA-500-100",
        nome: "Chlorella",
        descricao: "Suplemento alimentar de chlorella em cápsulas.",
        preco: 54.90,
        precoAnterior: null,
        destaque: false,
        marca: "Chamed",
        peso: "500 mg",
        unidade: "100 cápsulas",
        categoria: "Suplementos",
        imagem: ""
    },

    {
        sku: "NATURE-TAMARA-COLAGENO",
        nome: "Tâmara com Colágeno",
        descricao: "Tâmara com chocolate meio amargo, proteína e colágeno Verisol.",
        preco: 13.90,
        precoAnterior: null,
        destaque: false,
        marca: "Nature Foodtech",
        peso: "",
        unidade: "12 unidades",
        categoria: "Funcionais",
        imagem: ""
    },

    {
        sku: "FITOGREEN-MULUNGU-500-60",
        nome: "Mulungu",
        descricao: "Suplemento de mulungu em cápsulas.",
        preco: 29.99,
        precoAnterior: null,
        destaque: false,
        marca: "Fitogreen",
        peso: "500 mg",
        unidade: "60 cápsulas",
        categoria: "Suplementos",
        imagem: ""
    },

    {
        sku: "GUMMY-AIR-ZERO-TUTTI-60",
        nome: "Gummy Original AIR Zero",
        descricao: "Gummy sabor tutti-frutti para cabelo, pele e unhas.",
        preco: 151.90,
        precoAnterior: null,
        destaque: false,
        marca: "Gummy Original",
        peso: "",
        unidade: "60 unidades",
        categoria: "Gummies",
        imagem: ""
    },

    {
        sku: "GUMMY-AIR-MACA-60",
        nome: "Gummy Original AIR Maçã Verde",
        descricao: "Gummy sabor maçã verde para cabelo, pele e unhas.",
        preco: 149.90,
        precoAnterior: null,
        destaque: false,
        marca: "Gummy Original",
        peso: "",
        unidade: "60 unidades",
        categoria: "Gummies",
        imagem: ""
    },

    {
        sku: "GUMMY-APPLE-VINEGAR-60",
        nome: "Gummy Original Apple Vinegar",
        descricao: "Gummy de vinagre de maçã sabor cereja.",
        preco: 110.00,
        precoAnterior: null,
        destaque: false,
        marca: "Gummy Original",
        peso: "",
        unidade: "60 unidades",
        categoria: "Gummies",
        imagem: ""
    },

    {
        sku: "GUMMY-HAIR-ONE-60",
        nome: "Gummy Original Hair One",
        descricao: "Gummy para cabelo sabor cereja.",
        preco: 91.00,
        precoAnterior: null,
        destaque: false,
        marca: "Gummy Original",
        peso: "",
        unidade: "60 unidades",
        categoria: "Gummies",
        imagem: ""
    },

    {
        sku: "GENGIBRE-CRISTALIZADO-200",
        nome: "Gengibre Cristalizado",
        descricao: "Gengibre natural cristalizado.",
        preco: 15.00,
        precoAnterior: null,
        destaque: false,
        marca: "",
        peso: "200 g",
        unidade: "1 embalagem",
        categoria: "Naturais",
        imagem: ""
    },

    {
        sku: "AMORA-600-100CAPS",
        nome: "Amora",
        descricao: "Suplemento de amora em cápsulas.",
        preco: 129.90,
        precoAnterior: null,
        destaque: false,
        marca: "",
        peso: "600 mg",
        unidade: "100 cápsulas",
        categoria: "Suplementos",
        imagem: ""
    }
];

const skusExistentes = new Set(
    produtos
        .map(p => p.sku)
        .filter(Boolean)
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

    console.log("Adicionado:", produto.id, produto.nome);
}

fs.writeFileSync(
    arquivo,
    JSON.stringify(produtos, null, 4) + "\n"
);

console.log("");
console.log("Novos adicionados:", adicionados);
console.log("Total no catálogo:", produtos.length);