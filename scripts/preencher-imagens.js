const fs = require("fs");
const https = require("https");
const http = require("http");

const arquivo = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(arquivo, "utf8"));

const USER_AGENT =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128 Safari/537.36";

/*
=========================================================
PÁGINAS OFICIAIS JÁ CONHECIDAS
=========================================================
*/

const paginasConhecidas = {

    "Protein Crisp Ovomaltine":
        "https://www.integralmedica.com.br/protein-crisp-bar-ovomaltine-unidade/p?sabor=Ovomaltine&tamanho=1+Unidade",

    "100% Whey Cookies":
        "https://www.topwayfit.com.br/produto/whey-100-monodose-35g-175",

    "100% Whey Coco com Baunilha":
        "https://www.topwayfit.com.br/produto/whey-100-monodose-35g-175",

    "100% Whey Torta de Limão":
        "https://www.topwayfit.com.br/produto/whey-100-monodose-35g-175",

    "100% Whey Banoffee":
        "https://www.topwayfit.com.br/produto/whey-100-monodose-35g-175",

    "100% Whey Chocolate com Avelã":
        "https://www.topwayfit.com.br/produto/whey-100-monodose-35g-175",

    "Bacio Pistacchio":
        "https://www.nutrata.com.br/",

    "Bacio Caramello":
        "https://www.nutrata.com.br/",

    "Havanna Dulce":
        "https://www.nutrata.com.br/",

    "Havanna Brownie":
        "https://www.nutrata.com.br/",

    "Crush Bar Morango":
        "https://www.maismu.com.br/",

    "Stroopwafel Wafel Holandês":
        "https://www.moinhowafers.com.br/",

    "Muma Biscoito de Arroz Chocolate Zero":
        "https://www.muma.com.br/",

    "Repeat Snack Alga Marinha Original":
        "https://repeatonline.com.br/",

    "Sriracha Hot Chili Sauce":
        "https://bombayhs.com.br/",

    "Extrato Natural de Baunilha":
        "https://bombayhs.com.br/",

    "Óleo de Coco Copra":
        "https://www.copra.com.br/",

    "Shoyu de Coco Copra":
        "https://www.copra.com.br/",

    "Geleia de Pimenta com Frutas Vermelhas":
        "https://uairredpepper.com.br/"
};


/*
=========================================================
UTILIDADES
=========================================================
*/

function baixar(url) {

    return new Promise((resolve, reject) => {

        const cliente = url.startsWith("https://")
            ? https
            : http;

        const requisicao = cliente.get(
            url,
            {
                headers: {
                    "User-Agent": USER_AGENT,
                    "Accept":
                        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
                }
            },
            resposta => {

                if (
                    resposta.statusCode >= 300 &&
                    resposta.statusCode < 400 &&
                    resposta.headers.location
                ) {

                    const novaUrl =
                        new URL(
                            resposta.headers.location,
                            url
                        ).href;

                    baixar(novaUrl)
                        .then(resolve)
                        .catch(reject);

                    return;
                }

                let dados = "";

                resposta.setEncoding("utf8");

                resposta.on(
                    "data",
                    parte => dados += parte
                );

                resposta.on(
                    "end",
                    () => resolve(dados)
                );

            }
        );

        requisicao.setTimeout(
            15000,
            () => {
                requisicao.destroy(
                    new Error("Timeout")
                );
            }
        );

        requisicao.on(
            "error",
            reject
        );

    });

}


/*
=========================================================
EXTRAIR IMAGENS DE UMA PÁGINA
=========================================================
*/

function extrairImagens(html) {

    const imagens = [];

    const padroes = [

        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,

        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/gi,

        /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/gi,

        /<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi,

        /<img[^>]+data-src=["']([^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi,

        /https?:\/\/[^"'\\ ]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\ ]*)?/gi

    ];

    for (const regex of padroes) {

        let resultado;

        while (
            (resultado = regex.exec(html)) !== null
        ) {

            let imagem =
                resultado[1] || resultado[0];

            imagem =
                imagem
                    .replace(/&amp;/g, "&")
                    .replace(/\\u0026/g, "&")
                    .replace(/\\\//g, "/");

            if (
                imagem.startsWith("http") &&
                !imagem.includes("favicon") &&
                !imagem.includes("logo") &&
                !imagem.includes("icon")
            ) {

                imagens.push(imagem);

            }

        }

    }

    return [...new Set(imagens)];

}


/*
=========================================================
ESCOLHER A IMAGEM MAIS PROVÁVEL
=========================================================
*/

function escolherImagem(imagens, produto) {

    if (!imagens.length) {
        return null;
    }

    const palavras =
        produto.nome
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .split(/\s+/)
            .filter(p => p.length >= 4);

    let melhor = null;
    let melhorPontuacao = -1;

    for (const imagem of imagens) {

        const texto =
            imagem
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        let pontuacao = 0;

        for (const palavra of palavras) {

            if (texto.includes(palavra)) {
                pontuacao += 2;
            }

        }

        if (
            texto.includes("product") ||
            texto.includes("produto") ||
            texto.includes("product-image")
        ) {
            pontuacao += 2;
        }

        if (
            texto.includes("cdn") ||
            texto.includes("shopify") ||
            texto.includes("cloudfront") ||
            texto.includes("mitienda")
        ) {
            pontuacao += 1;
        }

        if (pontuacao > melhorPontuacao) {

            melhorPontuacao = pontuacao;
            melhor = imagem;

        }

    }

    return melhor || imagens[0];

}


/*
=========================================================
BUSCA GOOGLE/BING VIA DUCKDUCKGO
=========================================================
*/

async function buscarNaWeb(produto) {

    const consulta =
        encodeURIComponent(
            `"${produto.nome}" "${produto.peso || ""}" produto`
        );

    const url =
        `https://html.duckduckgo.com/html/?q=${consulta}`;

    try {

        const html =
            await baixar(url);

        const links = [];

        const regex =
            /uddg=([^&"]+)/g;

        let resultado;

        while (
            (resultado = regex.exec(html)) !== null
        ) {

            try {

                const link =
                    decodeURIComponent(
                        resultado[1]
                    );

                if (
                    link.startsWith("http") &&
                    !link.includes("duckduckgo.com")
                ) {

                    links.push(link);

                }

            } catch {}

        }

        return [...new Set(links)].slice(0, 5);

    } catch {

        return [];

    }

}


/*
=========================================================
PROCESSAMENTO DE CADA PRODUTO
=========================================================
*/

async function processarProduto(produto) {

    if (produto.imagem) {

        console.log(
            `✓ Já possui imagem: ${produto.nome}`
        );

        return "ja-tem";

    }

    console.log("");
    console.log(
        `🔎 Buscando: ${produto.nome}`
    );

    let urls = [];

    /*
    Primeiro tenta página conhecida.
    */

    for (
        const chave of Object.keys(paginasConhecidas)
    ) {

        if (
            produto.nome
                .toLowerCase()
                .includes(
                    chave.toLowerCase()
                )
        ) {

            urls.push(
                paginasConhecidas[chave]
            );

        }

    }

    /*
    Depois procura na web.
    */

    if (!urls.length) {

        const encontrados =
            await buscarNaWeb(produto);

        urls.push(...encontrados);

    }

    urls =
        [...new Set(urls)];

    /*
    Visita páginas encontradas.
    */

    for (const pagina of urls) {

        try {

            const html =
                await baixar(pagina);

            const imagens =
                extrairImagens(html);

            const imagem =
                escolherImagem(
                    imagens,
                    produto
                );

            if (imagem) {

                produto.imagem =
                    imagem;

                produto.imagemFonte =
                    pagina;

                console.log(
                    `  🖼️ Imagem encontrada`
                );

                console.log(
                    `  ${imagem}`
                );

                return "encontrada";

            }

        } catch (erro) {

            console.log(
                `  ⚠️ ${erro.message}`
            );

        }

    }

    console.log(
        `  ❌ Imagem não encontrada`
    );

    return "faltando";

}


/*
=========================================================
EXECUÇÃO EM LOTE
=========================================================
*/

(async () => {

    let encontradas = 0;
    let faltando = 0;
    let jaTinham = 0;

    const total =
        produtos.length;

    for (
        let i = 0;
        i < total;
        i++
    ) {

        const produto =
            produtos[i];

        const resultado =
            await processarProduto(
                produto
            );

        if (
            resultado === "encontrada"
        ) {
            encontradas++;
        }

        if (
            resultado === "faltando"
        ) {
            faltando++;
        }

        if (
            resultado === "ja-tem"
        ) {
            jaTinham++;
        }

        /*
        Salva a cada produto.
        Assim, se houver interrupção,
        não perdemos o progresso.
        */

        fs.writeFileSync(
            arquivo,
            JSON.stringify(
                produtos,
                null,
                4
            ) + "\n"
        );

        console.log(
            `Progresso: ${i + 1}/${total}`
        );

    }

    console.log("");
    console.log(
        "=========================================="
    );
    console.log(
        "BUSCA DE IMAGENS FINALIZADA"
    );
    console.log(
        "=========================================="
    );

    console.log(
        "Já possuíam imagem:",
        jaTinham
    );

    console.log(
        "Novas imagens encontradas:",
        encontradas
    );

    console.log(
        "Sem imagem:",
        faltando
    );

    console.log(
        "Total de produtos:",
        produtos.length
    );

    console.log(
        "=========================================="
    );

})();
