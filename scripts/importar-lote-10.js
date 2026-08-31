const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // 1 — STEVIA
  // =====================================================

  "Stevia em Pó":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Stevia_en_polvo.jpg",

  // =====================================================
  // 2 — SAL SERTÃO
  // =====================================================

  "Sal Sertão Integral":
    "https://lojagood4you.com.br/cdn/shop/files/sal_marinho_integral_1kg_sertao_5553_1_193ff1d2dc8639eb58674c1503f5bebd.webp?v=1768405191",

  // =====================================================
  // 3 — BR SPICES 500g
  // =====================================================

  "Sal Marinho Integral de Mossoró — 500 g":
    "https://http2.mlstatic.com/D_NQ_NP_2X_794179-MLB114710428511_072026-F.webp",

  // =====================================================
  // 4 — BR SPICES 1kg
  // =====================================================

  "Sal Marinho Integral de Mossoró — 1 kg":
    "https://www.rotulodobem.com.br/alimentos-naturais/sal-marinho-integral-de-mossoro-1kg-brspices",

  // =====================================================
  // 5 — OUROMAR 1kg
  // =====================================================

  "Sal Marinho Integral":
    "https://www.mercadolivre.com.br/sal-marinho-integral-1kg-ouromar/p/MLB36840545",

  // =====================================================
  // 6 — LIVRE 500g
  // =====================================================

  "Flocos de Milho Livre":
    "https://http2.mlstatic.com/D_NQ_NP_2X_654847-MLA94467633519_102025-O.webp",

  // =====================================================
  // 7 — ESSÊNCIA DO VALE
  // =====================================================

  "Cebola em Conserva Temperada":
    "https://cdn.awsli.com.br/2500x2500/1285/1285102/produto/53859500/cebola-em-conserva-tsxbn2ssbe.png",

  // =====================================================
  // 8 — ESSÊNCIA DO VALE
  // =====================================================

  "Pasta de Truta Defumada Tradicional":
    "https://cdn.awsli.com.br/2500x2500/1285/1285102/produto/53860236/pasta-de-truta-defumada-tradicional-sc7jqz76v4.png",

  // =====================================================
  // 9 — ESSÊNCIA DO VALE
  // =====================================================

  "Geleia de Abacaxi com Hortelã Diet":
    "https://loja.essenciadovale.com/geleia-de-abacaxi-com-hortela-diet-200g",

  // =====================================================
  // 10 — ESSÊNCIA DO VALE
  // =====================================================

  "Geleia de Frutos Vermelhos Diet":
    "https://loja.essenciadovale.com/geleia-de-frutas-vermelhas-diet-200g"
};

function normalizar(txt) {
  return String(txt || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

let aplicadas = 0;
let existentes = 0;
let naoEncontrados = 0;

for (const [nome, url] of Object.entries(imagens)) {

  const produto = produtos.find(
    p => normalizar(p.nome) === normalizar(nome)
  );

  if (!produto) {
    console.log(`⚠️ Não encontrado: ${nome}`);
    naoEncontrados++;
    continue;
  }

  if (produto.imagem) {
    console.log(`⏭️ Já possui imagem: ${produto.nome}`);
    existentes++;
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
console.log(" LOTE 10 — SAL / INGREDIENTES / ESSÊNCIA");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
