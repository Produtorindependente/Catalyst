const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {
  317: "https://cdn.awsli.com.br/2500x2500/2618/2618089/produto/271334773/castanha-do-para-media-inteira-100g-mania-de-castanha-1-5e6b9f9c.jpg",

  318: "https://cdn.akakce.com/z/patiswiss/patiswiss-100-gr-bitter-kapli-cilekli-draje.jpg",

  319: "https://cdn.awsli.com.br/2500x2500/2600/2600061/produto/217497456/choconuts-pp-licor-de-morango.jpg",

  320: "https://www.emporioaurea.com.br/cdn/shop/files/chocolate-ao-leite-com-licor-de-conhaque-100g.jpg",

  321: "https://cdn.awsli.com.br/2500x2500/1445/1445920844/produto/222982148/tempero-cebola-alho-e-salsa-1kg.jpg",

  322: "https://cdn.awsli.com.br/2500x2500/2600/2600061/produto/217497456/cebola-granulada.jpg",

  325: "https://www.mika.com.br/wp-content/uploads/2024/01/oregano-100g.jpg",

  330: "https://cdn.awsli.com.br/2500x2500/2600/2600061/produto/217497456/mix-mexicano.jpg",

  331: "https://cdn.awsli.com.br/2500x2500/2600/2600061/produto/217497456/sal-rosa-fino.jpg",

  333: "https://cdn.awsli.com.br/2500x2500/2600/2600061/produto/217497456/mix-mexicano-em-po.jpg",

  335: "https://www.mika.com.br/wp-content/uploads/2024/01/louro-em-po-10g.jpg"
};

console.log("==========================================");
console.log(" CATALYST — CORREÇÃO DE IMAGENS — LOTE 11");
console.log("==========================================");

let atualizados = 0;

for (const [id, url] of Object.entries(imagens)) {
  const produto = produtos.find(p => Number(p.id) === Number(id));

  if (!produto) {
    console.log(`⚠️ ID ${id} não encontrado.`);
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

console.log("==========================================");
console.log(`Imagens atualizadas: ${atualizados}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
