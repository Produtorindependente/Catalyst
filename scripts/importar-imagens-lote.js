const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const ARQUIVO_PENDENTES = "data/imagens-pendentes.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

/*
===========================================================
IMAGENS IDENTIFICADAS COM SEGURANÇA
===========================================================
*/

const imagens = {

    // NUTRATA
    "Bacio di Latte Pistacchio — 40g":
        "https://images.tcdn.com.br/img/img_prod/1305881/nutrata_bacio_di_latte_40g_display_com_12_barras_1_20260715115114_6f17cb0d75d8.jpg",

    "Bacio di Latte Caramello Salgado — 45g":
        "https://images.tcdn.com.br/img/img_prod/1305881/nutrata_bacio_di_latte_45gr_display_c12_barras_s_1_20251110120010_47ab6aaae759.png",

    "Havanna Brownie de Chocolate e Dulce de Leche — 40g":
        "https://http2.mlstatic.com/D_NQ_NP_2X_888036-MLB113388099136_072026-F-nutrata-havanna-browniedoce-de-leite-11g-proteina-40g-12un.webp",

    /*
    ATENÇÃO:
    Esta imagem é HAVANNA ZERO.
    Não será colocada no produto "Havanna Legítimo Dulce de Leche".
    Ela ficará em pendências.
    */


    // TOPWAY
    "Protein Pão de Mel — 45g":
        "https://dcdn-us.mitiendanube.com/stores/007/563/993/products/protein-pao-de-mel-unidade-scuw-2216d0e2a95cc71f6e17857890828152-1024-1024.webp",


    // AIRON
    "Paçoquinha Zero Adição de Açúcares — 17g":
        "https://img.irroba.com.br/fit-in/600x600/filters:format(webp):fill(fff):quality(80)/aironcom/catalog/pacoca-individual-quadrada-1000x1000px.jpg",


    // LATAM PROTEIN
    "Wafer Cappuccino — 25g":
        "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/phbufoyu/lp-barra-wafer-cappuccino.png",

    "Wafer Creme de Avelã — 25g":
        "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/agpxlhlx/lp-wafer-avela-1.png",


    // APIÁRIO SANTO ANTÔNIO
    "Mel Flores Silvestres — 35g":
        "https://images.tcdn.com.br/img/img_prod/584955/mel_de_flores_silvestres_em_sache_35g_211_1_9539578ead450413390f3e056f622845.jpg",

    "Extrato de Própolis Glicólico — 30ml":
        "https://images.tcdn.com.br/img/img_prod/584955/extrato_de_propolis_verde_em_solucao_glicolica_30ml_299_1_0887eac5ce13c4133457288099fab20e.jpg",

    "Spray de Mel com Própolis, Romã e Gengibre":
        "https://images.tcdn.com.br/img/img_prod/584955/spray_composto_de_mel_com_extrato_de_propolis_extrato_fluido_de_roma_e_gengibre_em_frasco_pet_ambar__429_1_f57e529ebf4b87b3d147139aaebc41d3.jpg",


    // FAUNA & FLORA
    "Verdprópolis — Extrato de Própolis Verde":
        "https://www.faunaeflora.com.br/cdn/shop/files/propolis-alecrim-do-campo-15.webp?v=1778179531&width=713",

    "Redprópolis — Extrato de Própolis Vermelho":
        "https://www.faunaeflora.com.br/cdn/shop/files/red-propolis-rabo-de-bugio-15.webp?v=1778181017&width=713",


    // CHAMED
    "Óleo de Linhaça — 1000mg — 100 cápsulas":
        "https://http2.mlstatic.com/D_NQ_NP_2X_647596-MLB46783522215_072021-F-oleo-de-linhaca-1000-mg-100-capsulas--chamed.webp",

    "Chlorella — 500mg — 100 cápsulas":
        "https://images.tcdn.com.br/img/img_prod/745295/clorella_500mg_100_capsulas_chamel_1471_1_d5dba0cf7602694eb87997256f2f7d93.jpg",

    "Amora — 600mg — 100 cápsulas":
        "https://http2.mlstatic.com/D_NQ_NP_2X_700267-MLB113423757163_062026-F-amora-100-capsulas-600mg-chamel.webp",


    // NATURE FOOD TECH
    "Tâmara com Colágeno":
        "https://http2.mlstatic.com/D_NQ_NP_2X_629389-MLA107404073562_032026-F-barrinhas-de-tamara-com-colageno-verisol-12-un-nature-food.webp",


    // FITOGREEN
    "Mulungu — 500mg — 60 cápsulas":
        "https://images.tcdn.com.br/img/img_prod/971897/mulungu_em_cpsula_500mg_60caps_ninho_verde_1_20260303153558_b71506d145d1.jpg",


    // GUMMY ORIGINAL
    "Gummy Original AIR Zero":
        "https://http2.mlstatic.com/D_NQ_NP_2X_664270-MLA99936158267_112025-F.webp",

    "Gummy Original AIR Maçã Verde":
        "https://http2.mlstatic.com/D_NQ_NP_2X_631962-MLB113559279475_062026-F.webp",

    "Gummy Original Apple Vinegar":
        "https://http2.mlstatic.com/D_NQ_NP_2X_652370-MLA96872765725_102025-F.webp",

    "Gummy Original Hair One":
        "https://http2.mlstatic.com/D_NQ_NP_2X_646990-MLA112779977842_062026-F.webp",


    // +MU
    "Crush Bar Morango — 35g":
        "https://acdn-us.mitiendanube.com/stores/005/697/238/products/74-65821e865f1865c37017575152457342-1024-1024.webp",


    // MOINHO WAFERS
    "Stroopwafel Wafel Holandês — 28g":
        "https://http2.mlstatic.com/D_NQ_NP_2X_987597-MLB109355188421_032026-F-moinho-wafers-stroopwafel-biscoito-wafel-holandes-28g.webp",

    "Stroopwafel Wafel Holandês — 230g":
        "https://http2.mlstatic.com/D_NQ_NP_2X_807522-MLB104857568430_012026-F-stroopwafel-wafel-holandes-230g--moinho-wafers.webp",


    // MUMA
    "Muma Biscoito de Arroz Chocolate Zero — 60g":
        "https://mumasnacks.com.br/cdn/shop/files/Muma_Frente_Arroz_Chocolate_Zero_1.png?v=1780503468&width=1200",

    "Muma Biscoito de Milho Mediterrâneo — 65g":
        "https://mumasnacks.com.br/cdn/shop/files/Muma_Frente_Milho_Mediterraneo_sombra_5.png?v=1767952070&width=1200",

    "Muma Biscoito de Milho Ervas Finas e Azeite — 65g":
        "https://mumasnacks.com.br/cdn/shop/files/Muma_Frente_Milho_Ervas_Finas_sombra_3.png?v=1767952234&width=1200",


    // REPEAT
    "Repeat Snack Alga Marinha Original — 5g":
        "https://http2.mlstatic.com/D_NQ_NP_2X_919182-MLB104793039106_012026-F-snack-de-alga-marinha-original-5g-repeat.webp",


    // BANANINHAS
    "Bananinha sem Adição de Açúcar":
        "https://http2.mlstatic.com/D_NQ_NP_2X_829390-MLB110126899205_042026-F-bananinha-paraibuna-sem-acucar-vegana-460g-zero-natural.webp",

    "Doce de Banana sem Adição de Açúcares":
        "https://http2.mlstatic.com/D_NQ_NP_2X_965500-MLB93211948099_092025-F-doce-banana-zero-adicao-acucar-bananinha-cremosa-21-unidades.webp",

    "Bananinha Coberta com Chocolate":
        "https://www.tachao.com.br/cdn/shop/files/tachaoubatuba_bananinhachocolate_200g_mockup.png?v=1725044431&width=600",

    "Bananinha com Canela":
        "https://www.tachao.com.br/cdn/shop/files/tachaoubatuba_bananinhacanela_200g_mockup.png?v=1725044431&width=600"
};


/*
===========================================================
URLS RECEBIDAS MAS QUE NÃO SERÃO ATRIBUÍDAS AUTOMATICAMENTE
===========================================================
*/

const pendentes = [

    {
        produto: "Havanna Dulce de Leche ZERO",
        url: "https://images.tcdn.com.br/img/img_prod/1305881/nutrata_whey_grego_havanna_zero_40g_display_c_12_b_1_20260518103907_f99c2a72e9b3.jpg",
        motivo: "Imagem é da versão ZERO; não atribuir ao Havanna Legítimo Dulce de Leche sem confirmação."
    },

    {
        produto: "Imagem não identificada",
        url: "https://acdn-us.mitiendanube.com/stores/005/697/238/products/01-claim_proteina-yk11jp4dw2-76b8f8a4e4e4f80ab817455294026936-1024-1024.webp",
        motivo: "URL sem identificação suficiente para atribuição segura."
    },

    {
        produto: "Imagem não identificada",
        url: "https://acdn-us.mitiendanube.com/stores/005/697/238/products/01-claim_proteina-1-68u52zgtrr-c2865b714263b24b6a17455293640168-1024-1024.webp",
        motivo: "URL sem identificação suficiente para atribuição segura."
    },

    {
        produto: "Imagem não identificada",
        url: "https://storetheme.vtexassets.com/unsafe/800x800/center/middle/https%3A%2F%2Fsantaluzia.vtexassets.com%2Farquivos%2Fids%2F1005943%2F3030490.png%3Fv%3D639066075750130000",
        motivo: "URL sem identificação suficiente para atribuição segura."
    },

    {
        produto: "Mel & Alho — 160g",
        url: null,
        motivo: "Usuário decidiu buscar diretamente com o fornecedor."
    },

    {
        produto: "Bisco Light — Coco Branco com Pistache — 150g",
        url: null,
        motivo: "Nenhuma imagem comercial localizada."
    },

    {
        produto: "Bisco Light — Churros — 150g",
        url: null,
        motivo: "Nenhuma imagem comercial localizada."
    },

    {
        produto: "Imagem de banana não identificada",
        url: "https://http2.mlstatic.com/D_NQ_NP_2X_980633-MLU74856669935_032024-F.webp",
        motivo: "URL sem identificação suficiente."
    },

    {
        produto: "Imagem de banana não identificada",
        url: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/wazeqaef/pk-banana-com-choco.png",
        motivo: "Possível produto de banana/chocolate; não atribuir sem confirmação."
    },

    {
        produto: "Imagem não identificada",
        url: "https://http2.mlstatic.com/D_NQ_NP_2X_960211-MLB82080120847_012025-F.webp",
        motivo: "URL sem identificação suficiente."
    },

    {
        produto: "Imagem de banana/chocolate não identificada",
        url: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/ubzekved/pk-banana-com-choco.png",
        motivo: "Possível duplicata/variação; não atribuir automaticamente."
    },

    {
        produto: "Imagem não identificada",
        url: "https://http2.mlstatic.com/D_Q_NP_2X_879214-MLA97929548148_112025-F.webp",
        motivo: "URL sem identificação suficiente."
    }
];


/*
===========================================================
NORMALIZAÇÃO DE NOMES
===========================================================
*/

function normalizar(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[—–-]/g, " ")
        .replace(/[^\w\s%]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


/*
===========================================================
LOCALIZAÇÃO SEGURA DO PRODUTO
===========================================================
*/

function encontrarProduto(nome) {

    const alvo = normalizar(nome);

    // 1 — correspondência exata
    let produto = produtos.find(p =>
        normalizar(p.nome) === alvo
    );

    if (produto) return produto;

    // 2 — correspondência por nome sem peso
    const semPeso = alvo
        .replace(/\b\d+(?:[.,]\d+)?\s*(g|kg|mg|ml|l)\b/g, "")
        .replace(/\s+/g, " ")
        .trim();

    produto = produtos.find(p => {

        const nomeProduto = normalizar(p.nome)
            .replace(/\b\d+(?:[.,]\d+)?\s*(g|kg|mg|ml|l)\b/g, "")
            .replace(/\s+/g, " ")
            .trim();

        return nomeProduto === semPeso;
    });

    return produto || null;
}


/*
===========================================================
APLICAÇÃO
===========================================================
*/

let aplicadas = 0;
let jaPossui = 0;
let naoEncontrados = [];

for (const [nome, url] of Object.entries(imagens)) {

    const produto = encontrarProduto(nome);

    if (!produto) {
        naoEncontrados.push({
            produto: nome,
            url,
            motivo: "Produto não encontrado no produtos.json"
        });

        console.log(`⚠️ Produto não encontrado: ${nome}`);
        continue;
    }

    if (produto.imagem) {

        jaPossui++;

        console.log(`⏭️ Já possui imagem: ${produto.nome}`);

        continue;
    }

    produto.imagem = url;

    aplicadas++;

    console.log(`✅ Imagem aplicada: ${produto.nome}`);
}


/*
===========================================================
SALVAR PRODUTOS
===========================================================
*/

fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 4) + "\n",
    "utf8"
);


/*
===========================================================
SALVAR PENDÊNCIAS
===========================================================
*/

const pendenciasFinais = [
    ...pendentes,
    ...naoEncontrados
];

fs.writeFileSync(
    ARQUIVO_PENDENTES,
    JSON.stringify(pendenciasFinais, null, 4) + "\n",
    "utf8"
);


/*
===========================================================
RESUMO
===========================================================
*/

const comImagem = produtos.filter(p => p.imagem).length;
const semImagem = produtos.filter(p => !p.imagem).length;

console.log("");
console.log("==========================================");
console.log("      IMPORTAÇÃO DE IMAGENS FINALIZADA");
console.log("==========================================");
console.log(`Imagens aplicadas agora: ${aplicadas}`);
console.log(`Já possuíam imagem: ${jaPossui}`);
console.log(`Pendências registradas: ${pendenciasFinais.length}`);
console.log(`Produtos com imagem: ${comImagem}`);
console.log(`Produtos sem imagem: ${semImagem}`);
console.log(`Total de produtos: ${produtos.length}`);
console.log("==========================================");
console.log(`Pendências salvas em: ${ARQUIVO_PENDENTES}`);
console.log("==========================================");
