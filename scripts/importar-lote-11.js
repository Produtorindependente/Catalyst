const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // APIÁRIO
  // =====================================================

  "Mel & Alho":
    "https://www.apiariosantoantonio.com.br/wp-content/uploads/2024/05/mel-alho-160g.jpg",

  // =====================================================
  // BISCOITOS — EMPÓRIO QUATRO ESTRELAS
  // =====================================================

  "Biscoito de Castanha de Pecã":
    "https://www.emporioquatroestrelas.com.br/media/catalog/product/b/i/biscoito_castanha_peca_100g.jpg",

  "Biscoito com Gotas de Chocolate 52%":
    "https://www.emporioquatroestrelas.com.br/media/catalog/product/b/i/biscoito_low_carb_gotas_chocolate_100g.jpg",

  "Biscoito Parmesão com Páprica e Cúrcuma":
    "https://www.emporioquatroestrelas.com.br/media/catalog/product/b/i/biscoito_low_carb_parmesao_paprica_curcuma_100g.jpg",

  // =====================================================
  // AMENDOIM
  // =====================================================

  "Amendoim Japonês":
    "https://loja.santoantonioalimento.com/media/catalog/product/a/m/amendoim-japones-100g.jpg",

  "Amendoim Olhinho":
    "https://www.bancadoramon.com.br/media/catalog/product/a/m/amendoim-olhinho-100g.jpg",

  // =====================================================
  // GRANEL
  // =====================================================

  "Chips de Mandioca Premium":
    "https://www.emporioquatroestrelas.com.br/media/catalog/product/c/h/chips_mandioca_100g.jpg",

  "Farinha Mineira":
    "https://www.emporioquatroestrelas.com.br/media/catalog/product/f/a/farinha_mineira_100g.jpg"

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
console.log(" LOTE 11 — BISCOITOS / AMENDOIM / GRANEL");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
