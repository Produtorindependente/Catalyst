const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {
  265: "https://http2.mlstatic.com/D_NQ_NP_2X_862267-MLB75424085776_042024-F-bananinha-com-chocolate-70-gourmet-18x20g.webp",

  269: "https://www.cerealistaexpress.com.br/media/tmp/webp/catalog/product/cache/1/image/420x545/9df78eab33525d08d6e5fb8d27136e95/d/r/dragee-de-uva-passa-70_-cacau-cerealista-express_1_jpg.webp",

  270: "https://lojadivinaterra.vtexassets.com/arquivos/ids/156474-1200-auto?v=638945045585530000&width=1200&height=auto&aspect=true",

  272: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOMEI_8bw9BbJOTatJMeCXkmDFQBRuL11UOA2q8hHS3_QaptZcft4-mBf81nGILiGarSfKq2x6kug7FeeevETyDUudF4xDkuvE-N94I3yaCOCO5ku6QpxZKQ",

  274: "https://http2.mlstatic.com/D_NQ_NP_969023-MLB112422375386_062026-O-bala-de-alcacuz-favette-clementine-di-calabria-amarelli-60g.webp",

  275: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS6VpybWzFh9XkrLa1SP4399OxHlHNYdU2BKZVPut-dN745GJL9nWAkZrNGdxg9FgEw8mKt1JylT_VP6q3nGzGW-ah72CkdvNVmMZT6-tarmhT8v_bnH20-",

  276: "https://www.atacadaodascastanhas.com.br/icontrole/files/1685037541599_amendoa-de-limao-siciliano.webp"
};

console.log("==========================================");
console.log(" CATALYST — IMAGENS FINAIS — LOTE 10");
console.log("==========================================");

let atualizados = 0;

for (const [id, url] of Object.entries(imagens)) {

  const produto = produtos.find(p => p.id === Number(id));

  if (!produto) {
    console.log(`❌ ID ${id} não encontrado`);
    continue;
  }

  produto.imagem = url;

  console.log(`✅ ID ${id} — ${produto.nome}`);
  console.log(`   IMAGEM: ${url}`);

  atualizados++;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" RESULTADO — LOTE 10 FINAL");
console.log("==========================================");
console.log(`Imagens atualizadas: ${atualizados}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
