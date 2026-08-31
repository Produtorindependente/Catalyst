const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

/*
===========================================================
 CATALYST — CORREÇÃO DE IMAGENS — LOTE 10
===========================================================

 REGRA:
 - Só inserir URL direta de imagem.
 - NÃO usar página de produto.
 - NÃO usar página de categoria.
 - NÃO substituir imagem existente por URL duvidosa.
 - Produtos sem URL segura permanecem sem alteração.

 URLs já validadas:
 ID 264 — Drageado de Banana c/ Chocolate 70% Dietético
 ID 267 — Gotas Branca 0 Açúcar
 ID 268 — Gotas de Chocolate ao Leite 0 Açúcar
 ID 271 — Drageado de Cranberry c/ Chocolate 70%

===========================================================
*/

const imagens = {
  264: "https://cdn.awsli.com.br/2500x2500/1901/1901991/produto/98473215/6cce6e2b78.jpg",

  267: "https://funchal.vtexassets.com/arquivos/ids/257044/capa_1_001.jpg?v=638858541543970000",

  268: "https://http2.mlstatic.com/D_NQ_NP_622921-MLU78958138334_092024-F.jpg",

  271: "https://http2.mlstatic.com/D_NQ_NP_888005-MLB54978270148_042023-O-drageado-cranberry-com-chocolate-belga-70-250g-dragee-pp.webp"
};

let atualizados = 0;
let ignorados = 0;
let naoEncontrados = 0;

console.log("==========================================");
console.log("   CATALYST — CORREÇÃO IMAGENS LOTE 10");
console.log("==========================================\n");

for (const [id, url] of Object.entries(imagens)) {

  const produto = produtos.find(p => String(p.id) === String(id));

  if (!produto) {
    console.log(`❌ ID ${id} não encontrado no catálogo`);
    naoEncontrados++;
    continue;
  }

  const imagemAnterior = produto.imagem || "";

  produto.imagem = url;

  console.log(`✅ ID ${id}`);
  console.log(`   ${produto.nome}`);
  console.log(`   Imagem atualizada`);
  console.log(`   URL: ${url}`);

  if (imagemAnterior && imagemAnterior !== url) {
    console.log(`   ⚠️ URL anterior substituída`);
  }

  console.log("");

  atualizados++;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("==========================================");
console.log("           RESULTADO — LOTE 10");
console.log("==========================================");
console.log(`Imagens atualizadas: ${atualizados}`);
console.log(`Não encontradas no catálogo: ${naoEncontrados}`);
console.log(`Ignoradas: ${ignorados}`);
console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log("==========================================");
