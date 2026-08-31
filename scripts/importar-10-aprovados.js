const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // 3 — +MU
  "Choco Wheyfer Chocolate com Avelã":
    "https://acdn-us.mitiendanube.com/stores/005/697/238/products/01-claim_proteina-yk11jp4dw2-76b8f8a4e4e4f80ab817455294026936-1024-1024.webp",

  // 4 — +MU
  "Choco Wheyfer Cookies'n Cream":
    "https://acdn-us.mitiendanube.com/stores/005/697/238/products/01-claim_proteina-1-68u52zgtrr-c2865b714263b24b6a17455293640168-1024-1024.webp",

  // 5 — Australia Nutrition
  "Protein Max Chocolate & Nibs":
    "https://storetheme.vtexassets.com/unsafe/800x800/center/middle/https%3A%2F%2Fsantaluzia.vtexassets.com%2Farquivos%2Fids%2F1005943%2F3030490.png%3Fv%3D639066075750130000",

  // 9 — Latam.Fit
  "Cocada com Abacaxi":
    "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/ubzekved/pk-banana-com-choco.png",

  // 10 — Latam.Fit
  "Goiabinha Cremosa Zero":
    "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/yelnegzp/9d740dce-afba-447b-9f00-7381bf853525.png"
};

let aplicadas = 0;
let naoEncontrados = 0;

for (const [nome, url] of Object.entries(imagens)) {

  const produto = produtos.find(p =>
    p.nome &&
    p.nome.toLowerCase().trim() === nome.toLowerCase().trim()
  );

  if (!produto) {
    console.log(`⚠️ Produto não encontrado: ${nome}`);
    naoEncontrados++;
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
console.log("      LOTE 03 — IMAGENS APROVADAS");
console.log("==========================================");
console.log(`Imagens aplicadas: ${aplicadas}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total de produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
