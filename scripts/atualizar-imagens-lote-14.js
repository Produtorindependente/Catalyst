const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {
  367: "https://cdn.iset.io/assets/39790/produtos/1793/coentro-ziplock-relva-verde-100g.jpg",

  368: "https://santaluzia.vtexassets.com/arquivos/ids/969201/433004.jpg?v=637385308112570000",

  369: "https://santaluzia.vtexassets.com/arquivos/ids/965807/432989.jpg?v=637385057929470000",

  370: "https://cdn.iset.io/assets/39790/produtos/1373/pimenta-branca-100g-ziplock.jpg",

  372: "https://hortifrutibr.vtexassets.com/arquivos/ids/163662/Pimenta-do-Reino-Preta-em-Po-Natural-Da-Terra-100g.png?v=638671093810400000",

  373: "https://www.lojaalecrim.com.br/image/cache/catalog/Produtos/Pimenta/pimenta-malagueta-em-po-90g-800x800.jpg",

  374: "https://cdn.awsli.com.br/600x450/1587/1587813/produto/69678347/rdpc-pimenta-caiena---100g-j7ms0e939h.png",

  375: "https://cdn.iset.io/assets/39790/produtos/1796/pimenta-do-reino-em-graos-100g.jpg"
};

let atualizados = 0;

for (const produto of produtos) {
  if (imagens[produto.id]) {
    produto.imagem = imagens[produto.id];
    atualizados++;

    console.log(
      `✅ ID ${produto.id} — ${produto.nome}`
    );
    console.log(`   IMAGEM: ${produto.imagem}`);
  }
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — IMAGENS — LOTE 14");
console.log("==========================================");
console.log(`Imagens atualizadas: ${atualizados}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
