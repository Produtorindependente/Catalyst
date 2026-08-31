const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {
  "Cookies Baunilha & Chocolate Zero Açúcar":
    "https://consultaprodutos.com.br/assets/produtos/7898380412291.webp",

  "Havanna Legítimo Dulce de Leche":
    "https://www.drogasil.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F17309860.webp&w=828&q=75",

  "Best Whey Cookies & Cream":
    "https://www.drogarianovaesperanca.com.br/imagens-complete/1000x1000/barra-best-whey-cookies-cream-com-12g-e8990d5a26.jpg",

  "Chips de Mandioca com Chimi Churri":
    "https://cdn.awsli.com.br/800x800/206/206579/produto/96014394/snack-mandioca-chimichurri-belive-megustaveg-yxwwxzdppb.jpg",

  "Chips de Batata-Doce Sweet Chilli":
    "https://belivebefree.com.br/wp-content/uploads/2026/05/chips-de-batata-doce-sem-gluten-belive-sabor-sweet-chilli-belive-1-600x600.webp"
};

let aplicadas = 0;
let naoEncontrados = 0;

for (const [nome, url] of Object.entries(imagens)) {
  const produto = produtos.find(p =>
    p.nome &&
    p.nome.toLowerCase().includes(nome.toLowerCase())
  );

  if (!produto) {
    console.log(`⚠️ NÃO ENCONTRADO: ${nome}`);
    naoEncontrados++;
    continue;
  }

  if (produto.imagem) {
    console.log(`⏭️ Já possui imagem: ${produto.nome}`);
    continue;
  }

  produto.imagem = url;
  console.log(`✅ Imagem aplicada: ${produto.nome}`);
  aplicadas++;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log("      LOTE 04 — 5 IMAGENS APROVADAS");
console.log("==========================================");
console.log(`Imagens aplicadas: ${aplicadas}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
