const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {
  "Tahine Tradicional":
    "https://sesamoreal.com.br/cdn/shop/files/tahine-tradicional-320g.png",

  "Tahine Integral":
    "https://sesamoreal.com.br/cdn/shop/files/tahine-integral-320g.png",

  "Gergelim Mix":
    "https://sesamoreal.com.br/cdn/shop/files/gergelim-mix-170g.png"
};

let aplicadas = 0;

for (const [nome, url] of Object.entries(imagens)) {
  const produto = produtos.find(p =>
    String(p.nome || "").toLowerCase().trim() === nome.toLowerCase()
  );

  if (!produto) {
    console.log(`⚠️ Não encontrado: ${nome}`);
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
  JSON.stringify(produtos, null, 2) + "\n"
);

console.log("");
console.log("==========================================");
console.log(" SÉSAMO REAL");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
