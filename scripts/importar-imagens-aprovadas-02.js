const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

    // WRAP
    "Wrap sem Glúten":
        "https://images.tcdn.com.br/img/img_prod/1025031/wrap_casa_rigani_240g_sem_gluten_ovos_soja_leite_e_vegano_691_1_e950a5c368ec9a36c5917fcac2a6415a.png",

    // CHIPS
    "Chips de Batata-Doce com Sal Rosa do Himalaia":
        "https://images.tcdn.com.br/img/img_prod/1061514/chips_de_batata_doce_original_40g_nazinha_10504_1_1ea5792649ecad6be8ee3b2f12f2c3fb.png",

    // LACIELLE
    "Water Timber's Zero Pistache":
        "https://http2.mlstatic.com/D_NQ_NP_2X_719089-MLA99803362037_112025-F.webp",

    // LATAM FIT
    "Nuts & Fruits Cranberry":
        "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/ubzekved/pk-banana-com-choco.png",

    "Goiabinha Cremosa Zero":
        "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/yelnegzp/9d740dce-afba-447b-9f00-7381bf853525.png",

    // OS SEGUINTES FORAM CONFERIDOS POR VOCÊ,
    // MAS SÓ ENTRAM AQUI QUANDO TIVERMOS URL DIRETA
    // DA IMAGEM, NÃO URL DE PÁGINA.
};

let aplicadas = 0;
let jaPossui = 0;
let naoEncontrados = 0;

for (const [nome, url] of Object.entries(imagens)) {

    const produto = produtos.find(p =>
        p.nome === nome ||
        p.nome.startsWith(nome)
    );

    if (!produto) {
        console.log(`⚠️ Produto não encontrado: ${nome}`);
        naoEncontrados++;
        continue;
    }

    if (produto.imagem) {
        console.log(`⏭️ Já possui imagem: ${produto.nome}`);
        jaPossui++;
        continue;
    }

    produto.imagem = url;

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
console.log(" IMAGENS APROVADAS — LOTE 02");
console.log("==========================================");
console.log(`Imagens aplicadas agora: ${aplicadas}`);
console.log(`Já possuíam imagem: ${jaPossui}`);
console.log(`Produtos não encontrados: ${naoEncontrados}`);
console.log(`Total de produtos: ${produtos.length}`);
console.log(
    `Produtos com imagem: ${produtos.filter(p => p.imagem).length}`
);
console.log(
    `Produtos sem imagem: ${produtos.filter(p => !p.imagem).length}`
);
console.log("==========================================");
