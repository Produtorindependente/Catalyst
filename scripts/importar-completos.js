const fs = require("fs");
const { execFileSync } = require("child_process");

const arquivo = "data/produtos.json";

const produtos = JSON.parse(
    fs.readFileSync(arquivo, "utf8")
);

/*
=========================================================
PRODUTOS COMPLETOS
Critério:
NOME + PESO/QUANTIDADE + PREÇO
=========================================================
*/

const novos = [

    // =========================
    // BISCOITOS / SNACKS
    // =========================

    {
        nome: "Bisco Light Coco Branco com Pistache",
        peso: "150 g",
        preco: 37.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Bisco Light Churros",
        peso: "150 g",
        preco: 37.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Crush Bar Morango",
        peso: "35 g",
        preco: 70.90,
        unidade: "caixa com 12 unidades",
        categoria: "Barras de Proteína"
    },

    {
        nome: "Stroopwafel Wafel Holandês",
        peso: "28 g",
        preco: 0,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Stroopwafel Wafel Holandês",
        peso: "230 g",
        preco: 22.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Muma Biscoito de Arroz Chocolate Zero",
        peso: "60 g",
        preco: 17.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Muma Biscoito de Milho Mediterrâneo",
        peso: "65 g",
        preco: 14.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Muma Biscoito de Milho Ervas Finas e Azeite",
        peso: "65 g",
        preco: 14.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Repeat Snack Alga Marinha Original",
        peso: "5 g",
        preco: 9.90,
        categoria: "Snacks"
    },

    {
        nome: "Biscoito Sembei",
        peso: "100 g",
        preco: 9.90,
        codigo: "160",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito Beliscão",
        peso: "100 g",
        preco: 8.50,
        codigo: "187",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito Banana e Canela",
        peso: "100 g",
        preco: 11.00,
        codigo: "137",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito de Maracujá Vegano",
        peso: "100 g",
        preco: 12.90,
        codigo: "653",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito de Castanha de Pecã",
        peso: "100 g",
        preco: 16.90,
        codigo: "3084",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito com Gotas de Chocolate 52%",
        peso: "100 g",
        preco: 17.00,
        codigo: "3039",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito Parmesão com Páprica e Cúrcuma",
        peso: "100 g",
        preco: 17.00,
        codigo: "84",
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Polvilho com Provolone",
        peso: "100 g",
        preco: 11.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Polvilho com Chia",
        peso: "100 g",
        preco: 11.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Polvilho com Cebola",
        peso: "100 g",
        preco: 11.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Biscoito Polvilho Perfeito Pimenta e Limão",
        peso: "80 g",
        preco: 18.90,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Provolone com Goiabada",
        peso: "100 g",
        preco: 18.00,
        categoria: "Biscoitos e Snacks"
    },

    {
        nome: "Snack de Queijo Coalho",
        peso: "100 g",
        preco: 18.99,
        categoria: "Snacks"
    },

    {
        nome: "Banana Chips Doce",
        peso: "100 g",
        preco: 8.59,
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Amendoim Japonês",
        peso: "100 g",
        preco: 3.50,
        categoria: "Snacks"
    },

    {
        nome: "Amendoim Olhinho",
        peso: "100 g",
        preco: 4.90,
        categoria: "Snacks"
    },

    {
        nome: "Mix Crocante",
        peso: "100 g",
        preco: 15.90,
        categoria: "Snacks"
    },

    // =========================
    // FRUTAS DESIDRATADAS
    // =========================

    {
        nome: "Mix de Frutas Tropicais",
        peso: "100 g",
        preco: 21.90,
        codigo: "80",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Mix de Frutas Vermelhas",
        peso: "100 g",
        preco: 16.90,
        codigo: "645",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Damasco",
        peso: "100 g",
        preco: 18.90,
        codigo: "48",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Manga Desidratada",
        peso: "100 g",
        preco: 12.00,
        codigo: "62",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Kiwi Desidratado",
        peso: "100 g",
        preco: 11.00,
        codigo: "58",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Goji Berry",
        peso: "100 g",
        preco: 9.90,
        codigo: "56",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Blueberry",
        peso: "100 g",
        preco: 26.90,
        codigo: "35",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Morango Glaceado",
        peso: "100 g",
        preco: 14.90,
        codigo: "171",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Cereja Desidratada",
        peso: "100 g",
        preco: 13.50,
        codigo: "975",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Abacaxi Desidratado",
        peso: "100 g",
        preco: 19.90,
        codigo: "3",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Mamão Cristalizado",
        peso: "100 g",
        preco: 12.00,
        codigo: "61",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Frutas Cristalizadas",
        peso: "100 g",
        preco: 3.90,
        codigo: "53",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Tâmara sem Caroço",
        peso: "100 g",
        preco: 5.90,
        codigo: "976",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Tâmara Jumbo",
        peso: "100 g",
        preco: 9.90,
        codigo: "95",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Banana Passa",
        peso: "100 g",
        preco: 6.50,
        codigo: "27",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Mini Figo Turco",
        peso: "100 g",
        preco: 15.00,
        codigo: "169",
        categoria: "Frutas Desidratadas"
    },

    {
        nome: "Figo Turco",
        peso: "100 g",
        preco: 15.90,
        codigo: "51",
        categoria: "Frutas Desidratadas"
    },

    // =========================
    // CHIPS
    // =========================

    {
        nome: "Banana Chips Salgada",
        peso: "100 g",
        preco: 12.00,
        codigo: "26",
        categoria: "Chips e Snacks"
    },

    {
        nome: "Chips de Mandioca Premium",
        peso: "100 g",
        preco: 18.00,
        codigo: "45",
        categoria: "Chips e Snacks"
    },

    {
        nome: "Chips de Kiwi",
        peso: "100 g",
        preco: 25.00,
        codigo: "674",
        categoria: "Chips e Snacks"
    },

    {
        nome: "Chips de Coco sem Açúcar",
        peso: "100 g",
        preco: 10.90,
        codigo: "195",
        categoria: "Chips e Snacks"
    },

    {
        nome: "Chips de Coco com Bordo",
        peso: "100 g",
        preco: 12.00,
        codigo: "06",
        categoria: "Chips e Snacks"
    },

    // =========================
    // OLEAGINOSAS
    // =========================

    {
        nome: "Mix de Castanhas",
        peso: "100 g",
        preco: 19.90,
        codigo: "73",
        categoria: "Oleaginosas"
    },

    {
        nome: "Amêndoa Laminada",
        peso: "100 g",
        preco: 16.90,
        codigo: "11",
        categoria: "Oleaginosas"
    },

    {
        nome: "Macadâmia sem Sal",
        peso: "100 g",
        preco: 26.00,
        codigo: "63",
        categoria: "Oleaginosas"
    },

    {
        nome: "Pistache com Casca",
        peso: "100 g",
        preco: 20.00,
        codigo: "85",
        categoria: "Oleaginosas"
    },

    {
        nome: "Pistache Inteiro sem Casca",
        peso: "100 g",
        preco: 32.00,
        codigo: "86",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha do Pará Inteira",
        peso: "100 g",
        preco: 21.00,
        codigo: "43",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha do Pará Quebrada",
        peso: "100 g",
        preco: 14.90,
        codigo: "44",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha de Caju Crua W1",
        peso: "100 g",
        preco: 13.00,
        codigo: "37",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha de Caju Quebrada sem Sal",
        peso: "100 g",
        preco: 10.00,
        codigo: "230",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha de Caju Assada sem Sal",
        peso: "100 g",
        preco: 14.00,
        codigo: "625",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha de Caju Torrada com Sal",
        peso: "100 g",
        preco: 14.00,
        codigo: "38",
        categoria: "Oleaginosas"
    },

    {
        nome: "Castanha de Caju Torrada sem Sal",
        peso: "100 g",
        preco: 14.00,
        codigo: "40",
        categoria: "Oleaginosas"
    },

    {
        nome: "Noz Pecan",
        peso: "100 g",
        preco: 19.90,
        codigo: "81",
        categoria: "Oleaginosas"
    },

    {
        nome: "Noz Quartilho",
        peso: "100 g",
        preco: 9.90,
        codigo: "620",
        categoria: "Oleaginosas"
    },

    {
        nome: "Noz Quartz",
        peso: "100 g",
        preco: 10.50,
        codigo: "82",
        categoria: "Oleaginosas"
    },

    {
        nome: "Noz Mariposa",
        peso: "100 g",
        preco: 12.90,
        codigo: "119",
        categoria: "Oleaginosas"
    },

    {
        nome: "Xerém de Amendoim",
        peso: "100 g",
        preco: 3.90,
        codigo: "951",
        categoria: "Oleaginosas"
    },

    {
        nome: "Amendoim Doce",
        peso: "100 g",
        preco: 3.90,
        codigo: "16",
        categoria: "Oleaginosas"
    },

    {
        nome: "Amendoim Natural",
        peso: "100 g",
        preco: 5.50,
        codigo: "19",
        categoria: "Oleaginosas"
    },

    {
        nome: "Amendoim sem Casca",
        peso: "100 g",
        preco: 2.90,
        codigo: "15",
        categoria: "Oleaginosas"
    },

    // =========================
    // CACAU / INGREDIENTES
    // =========================

    {
        nome: "Cacau 100% Alcalino",
        peso: "100 g",
        preco: 7.90,
        codigo: "639",
        categoria: "Ingredientes Naturais"
    },

    {
        nome: "Cacau 70%",
        peso: "100 g",
        preco: 7.50,
        codigo: "316",
        categoria: "Ingredientes Naturais"
    },

    {
        nome: "Cacau 50%",
        peso: "100 g",
        preco: 5.50,
        codigo: "353",
        categoria: "Ingredientes Naturais"
    },

    {
        nome: "Nibs de Cacau",
        peso: "100 g",
        preco: 24.90,
        codigo: "716",
        categoria: "Ingredientes Naturais"
    },

    {
        nome: "Eritritol",
        peso: "100 g",
        preco: 6.20,
        codigo: "315",
        categoria: "Adoçantes"
    },

    {
        nome: "Stevia em Pó",
        peso: "100 g",
        preco: 42.00,
        codigo: "940",
        categoria: "Adoçantes"
    },

    {
        nome: "Cravo em Pó",
        peso: "100 g",
        preco: 6.50,
        codigo: "196",
        categoria: "Temperos"
    },

    {
        nome: "Bicarbonato de Sódio",
        peso: "100 g",
        preco: 1.90,
        codigo: "314",
        categoria: "Ingredientes Naturais"
    },

    {
        nome: "Farinha Panko",
        peso: "100 g",
        preco: 4.00,
        codigo: "346",
        categoria: "Farinhas"
    },

    {
        nome: "Farinha Mineira",
        peso: "100 g",
        preco: 4.10,
        codigo: "439",
        categoria: "Farinhas"
    },

    {
        nome: "Polvilho Doce",
        peso: "100 g",
        preco: 1.90,
        codigo: "373",
        categoria: "Farinhas"
    },

    {
        nome: "Polvilho Azedo",
        peso: "100 g",
        preco: 1.99,
        codigo: "372",
        categoria: "Farinhas"
    },

    {
        nome: "Flocos de Arroz",
        peso: "100 g",
        preco: 4.00,
        codigo: "262",
        categoria: "Cereais"
    },

    {
        nome: "Fubá Italiano",
        peso: "100 g",
        preco: 3.10,
        codigo: "156",
        categoria: "Farinhas"
    },

    {
        nome: "Açúcar Mascavo",
        peso: "100 g",
        preco: 4.69,
        codigo: "303",
        categoria: "Açúcares Naturais"
    },

    {
        nome: "Açúcar de Coco",
        peso: "100 g",
        preco: 6.00,
        codigo: "301",
        categoria: "Açúcares Naturais"
    },

    {
        nome: "Açúcar Demerara",
        peso: "100 g",
        preco: 1.49,
        codigo: "302",
        categoria: "Açúcares Naturais"
    },

    // =========================
    // CAFÉ
    // =========================

    {
        nome: "Café Bossa Nova",
        peso: "500 g",
        preco: 59.90,
        categoria: "Cafés"
    },

    {
        nome: "Café Bossa Nova",
        peso: "250 g",
        preco: 30.00,
        categoria: "Cafés"
    },

    // =========================
    // ESSÊNCIA DO VALE
    // =========================

    {
        nome: "Cebola em Conserva Temperada",
        peso: "340 g",
        preco: 31.00,
        categoria: "Conservas",
        marca: "Essência do Vale"
    },

    {
        nome: "Homus",
        peso: "320 g",
        preco: 42.00,
        categoria: "Pastas e Patês",
        marca: "Essência do Vale"
    },

    {
        nome: "Pasta de Truta Defumada Tradicional",
        peso: "160 g",
        preco: 39.90,
        categoria: "Pastas e Patês",
        marca: "Essência do Vale"
    },

    {
        nome: "Geleia de Abacaxi com Hortelã Diet",
        peso: "200 g",
        preco: 34.90,
        categoria: "Geleias",
        marca: "Essência do Vale"
    },

    {
        nome: "Geleia de Frutos Vermelhos Diet",
        peso: "200 g",
        preco: 39.90,
        categoria: "Geleias",
        marca: "Essência do Vale"
    },

    {
        nome: "Geleia de Pimenta Diet",
        peso: "200 g",
        preco: 34.90,
        categoria: "Geleias",
        marca: "Essência do Vale"
    },

    // =========================
    // ÓLEOS / MOLHOS
    // =========================

    {
        nome: "Óleo de Coco Copra Extravirgem",
        peso: "500 ml",
        preco: 64.90,
        categoria: "Óleos"
    },

    {
        nome: "Óleo de Coco Copra Extravirgem",
        peso: "200 ml",
        preco: 29.90,
        categoria: "Óleos"
    },

    {
        nome: "Óleo de Coco Copra sem Sabor e sem Cheiro",
        peso: "200 ml",
        preco: 25.00,
        categoria: "Óleos"
    },

    {
        nome: "Óleo de Coco Copra sem Sabor e sem Cheiro",
        peso: "500 ml",
        preco: 51.90,
        categoria: "Óleos"
    },

    {
        nome: "Óleo de Coco Santo Óleo Extravirgem",
        peso: "200 ml",
        preco: 28.00,
        categoria: "Óleos"
    },

    {
        nome: "Óleo de Coco Santo Óleo Extravirgem",
        peso: "500 ml",
        preco: 54.90,
        categoria: "Óleos"
    },

    {
        nome: "Azeite de Abacate Extravirgem",
        peso: "250 ml",
        preco: 39.00,
        categoria: "Óleos"
    },

    {
        nome: "Tahine Integral",
        peso: "320 g",
        preco: 36.90,
        categoria: "Pastas e Patês",
        marca: "Sésamo Real"
    },

    {
        nome: "Tahine Tradicional",
        peso: "320 g",
        preco: 37.90,
        categoria: "Pastas e Patês",
        marca: "Sésamo Real"
    },

    {
        nome: "Gergelim Mix",
        peso: "170 g",
        preco: 19.90,
        categoria: "Sementes",
        marca: "Sésamo Real"
    },

    {
        nome: "Sriracha Hot Chili Sauce",
        peso: "330 g",
        preco: 31.90,
        categoria: "Molhos",
        marca: "Bombay Herbs & Spices"
    },

    {
        nome: "Molho Mrs Chicken",
        peso: "320 g",
        preco: 32.90,
        categoria: "Molhos",
        marca: "Mrs Taste"
    },

    {
        nome: "Geleia de Pimenta com Frutas Vermelhas",
        peso: "260 g",
        preco: 24.90,
        categoria: "Geleias",
        marca: "UAI Red Pepper"
    },

    {
        nome: "Molho Agridoce Defumado",
        peso: "260 g",
        preco: 24.90,
        categoria: "Molhos",
        marca: "UAI Red Pepper"
    },

    // =========================
    // SAL
    // =========================

    {
        nome: "Sal Sertão Integral",
        peso: "1 kg",
        preco: 14.90,
        categoria: "Sais"
    },

    {
        nome: "Sal Marinho Integral de Mossoró",
        peso: "500 g",
        preco: 12.00,
        categoria: "Sais",
        marca: "BR Spices"
    },

    {
        nome: "Sal Marinho Integral de Mossoró",
        peso: "1 kg",
        preco: 20.00,
        categoria: "Sais",
        marca: "BR Spices"
    },

    {
        nome: "Sal Marinho Integral",
        peso: "1 kg",
        preco: 15.90,
        categoria: "Sais",
        marca: "OuroMar"
    },

    // =========================
    // OUTROS
    // =========================

    {
        nome: "Flocos de Milho Livre",
        peso: "500 g",
        preco: 9.90,
        categoria: "Cereais"
    },

    {
        nome: "Extrato Natural de Baunilha",
        peso: "30 ml",
        preco: 44.00,
        categoria: "Ingredientes Naturais",
        marca: "Bombay Herbs & Spices"
    },

    {
        nome: "Shoyu de Coco Copra",
        peso: "250 ml",
        preco: 34.90,
        categoria: "Molhos"
    },

    {
        nome: "Santo Óleo Chantilly de Coco",
        peso: "200 g",
        preco: 0,
        categoria: "Derivados de Coco"
    }
];


/*
=========================================================
FUNÇÕES
=========================================================
*/

function normalizar(texto) {

    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}


function jaExiste(produto) {

    return produtos.some(p => {

        const mesmoNome =
            normalizar(p.nome) === normalizar(produto.nome);

        const mesmoPeso =
            normalizar(p.peso) === normalizar(produto.peso);

        const mesmoPreco =
            Number(p.preco) === Number(produto.preco);

        return mesmoNome && mesmoPeso && mesmoPreco;

    });

}


function buscarImagem(url) {

    if (!url) return "";

    try {

        const html = execFileSync(
            "curl",
            [
                "-L",
                "-s",
                "-A",
                "Mozilla/5.0",
                url
            ],
            {
                encoding: "utf8",
                maxBuffer: 30 * 1024 * 1024
            }
        );

        const encontrados = [

            html.match(
                /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
            ),

            html.match(
                /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
            ),

            html.match(
                /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
            )

        ];

        for (const resultado of encontrados) {

            if (resultado && resultado[1]) {

                return resultado[1]
                    .replace(/&amp;/g, "&");

            }

        }

    } catch (erro) {

        return "";

    }

    return "";

}


/*
=========================================================
PÁGINAS OFICIAIS CONHECIDAS
=========================================================
*/

const paginas = {

    "Homus":
        "https://loja.essenciadovale.com/homus-pasta-de-grao-de-bico-da-essencia-do-vale-320g",

    "Pasta de Truta Defumada Tradicional":
        "https://loja.essenciadovale.com/",

    "Nutrata Bacio":
        "https://loja.nutrata.com.br/barra-de-proteina/barra-bacio-di-latte-pistache-40gr",

    "Nutrata Havanna":
        "https://loja.nutrata.com.br/nutrata-havanna-proto-wafer-30g-dulce-de-leche-display-c-12-wafers",

    "Repeat":
        "https://repeatonline.com.br/",

    "Sriracha":
        "https://bombayhs.com.br/",

};


/*
=========================================================
IMPORTAÇÃO
=========================================================
*/

let adicionados = 0;
let duplicados = 0;
let semImagem = 0;

for (const item of novos) {

    if (!item.preco || item.preco <= 0) {

        console.log(
            "⏭️ Sem preço válido:",
            item.nome,
            item.peso
        );

        continue;

    }

    if (jaExiste(item)) {

        console.log(
            "🔁 Já existe:",
            item.nome,
            item.peso,
            item.preco
        );

        duplicados++;

        continue;

    }

    const id =
        Math.max(
            0,
            ...produtos.map(p => Number(p.id) || 0)
        ) + 1;

    let pagina = "";

    if (item.nome.includes("Homus")) {
        pagina = paginas["Homus"];
    }

    if (item.nome.includes("Pasta de Truta")) {
        pagina = paginas["Pasta de Truta Defumada Tradicional"];
    }

    if (item.nome.includes("Sriracha")) {
        pagina = paginas["Sriracha"];
    }

    let imagem = "";

    if (pagina) {
        imagem = buscarImagem(pagina);
    }

    if (!imagem) {
        semImagem++;
    }

    produtos.push({

        id,

        nome: item.nome,

        descricao:
            item.marca
                ? `${item.marca} — ${item.nome}.`
                : item.nome,

        preco: item.preco,

        precoAnterior: null,

        destaque: false,

        marca: item.marca || "",

        peso: item.peso,

        unidade: item.unidade || "1 unidade",

        categoria: item.categoria,

        codigo: item.codigo || "",

        imagem

    });

    adicionados++;

    console.log(
        `${imagem ? "🖼️" : "⚠️"} ${item.nome} — ${item.peso}`
    );

}

fs.writeFileSync(
    arquivo,
    JSON.stringify(produtos, null, 4) + "\n"
);

console.log("");
console.log("======================================");
console.log("IMPORTAÇÃO FINALIZADA");
console.log("======================================");
console.log("Novos produtos:", adicionados);
console.log("Duplicados:", duplicados);
console.log("Sem imagem:", semImagem);
console.log("TOTAL CATALYST:", produtos.length);
console.log("======================================");
