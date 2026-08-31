const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // SNACKS / BISCOITOS
  // =====================================================

  "Biscoito Polvilho Perfeito Pimenta e Limão":
    "https://www.santaluzia.com.br/biscoito-de-polvilho-pimenta-e-limao-chef-di-serio--80g-3251489/p",

  "Polvilho com Cebola":
    "https://www.martinsatacado.com.br/produto/biscoito-polvilho-cebola-100g-bombiscoito-bombiscoito_77",

  "Provolone com Goiabada":
    "https://emporiocristal.com.br/nossos-produtos/petiscos/provolone-com-goiabada-100g/",

  "Snack de Queijo Coalho":
    "https://armazemgraosdocampo.com.br/produtos/snack-de-queijo-coalho-100g/",

  // =====================================================
  // MOLHOS
  // =====================================================

  "Molho Mrs Chicken":
    "https://cdn.dooca.store/144780/products/download-2024-11-21t145116079.jpg?v=1732211594",

  "Geleia de Pimenta com Frutas Vermelhas":
    "https://www.magazineluiza.com.br/molho-geleia-de-pimenta-frutas-vermelhas-260g-uai-pepper-geleia-uai/p/gce20adhgb/me/glia/",

  "Molho Agridoce Defumado":
    "https://www.magazineluiza.com.br/molho-geleia-de-pimenta-agridoce-defumado-p-carnes-e-queijo-260g-uai-red-pepper-geleia-uai/p/baaadkjc08/me/capx/",

  // =====================================================
  // CAFÉ
  // =====================================================

  "Café Bossa Nova":
    "https://zingrao.com.br/collections/cafes"

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
console.log(" LOTE 09 — SNACKS / MOLHOS / CAFÉ");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
