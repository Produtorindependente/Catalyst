const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(
    fs.readFileSync(ARQUIVO, "utf8")
);

const imagens = {

    "Pão de Hambúrguer":
        "https://cdn.awsli.com.br/2500x2500/2566/2566099/produto/316659241/whatsapp-image-2025-09-04-at-13-00-54--3--n77v1lxsng.jpeg",

    "Pão de Hot Dog":
        "https://emporio4estrelas.vtexassets.com/arquivos/ids/232139/Pao-de-Hot-Dog-Sem-Gluten-125g-Bee-Gluten-Free-ProEmbImagem-3175.jpg?v=638721094772000000",

    "Bisnaguinha":
        "https://emporioquatroestrelas.vteximg.com.br/arquivos/ids/236853-1000-1000/Bisnaguinha-125g-Bee-Gluten-Free.jpg?v=639064156649400000",

    "Chips de Mandioca com Chimi Churri":
        "https://images.tcdn.com.br/img/img_prod/1221015/belive_chips_mandioca_sabor_chimichurri_s_glt_50g_1221_1_cdeb03a95a755c6dad072ce7b4ae73e2.jpg",

    "Chlorella":
        "https://product-data.raiadrogasil.io/images/16785923.webp",

    "Amora":
        "https://images.tcdn.com.br/img/img_prod/745295/amora_600mg_100_capsulas_chamel_1257_1_df52613776be9d4dfe132de2eb67f26b.jpg"
};

let aplicadas = 0;
let jaPossui = 0;
let naoEncontrados = 0;

console.log("");
console.log("==========================================");
console.log(" IMPORTAÇÃO — IMAGENS SEGURAS LOTE 01");
console.log("==========================================");

for (const produto of produtos) {

    const chave = Object.keys(imagens).find(
        nome => produto.nome === nome ||
                produto.nome.startsWith(nome)
    );

    if (!chave) continue;

    if (produto.imagem) {
        console.log(`⏭️ Já possui imagem: ${produto.nome}`);
        jaPossui++;
        continue;
    }

    produto.imagem = imagens[chave];

    console.log(`✅ Imagem aplicada: ${produto.nome}`);
    aplicadas++;
}

fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2),
    "utf8"
);

console.log("");
console.log("==========================================");
console.log(" IMPORTAÇÃO FINALIZADA");
console.log("==========================================");
console.log(`Imagens aplicadas agora: ${aplicadas}`);
console.log(`Já possuíam imagem: ${jaPossui}`);
console.log(`Total de produtos: ${produtos.length}`);
console.log(
    `Produtos com imagem: ${produtos.filter(p => p.imagem).length}`
);
console.log(
    `Produtos sem imagem: ${produtos.filter(p => !p.imagem).length}`
);
console.log("==========================================");
