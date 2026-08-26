const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // COPRA
  // =====================================================

  "Óleo de Coco Copra Extravirgem — 500 ml":
    "https://copra.com.br/wp-content/uploads/2020/05/copra_banner_oleoextravirgem_proteste__X_X_X_XX_X.jpg",

  "Óleo de Coco Copra Extravirgem — 200 ml":
    "https://copra.com.br/wp-content/uploads/2020/05/copra_banner_oleoextravirgem_proteste__X_X_X_XX_X.jpg",

  "Óleo de Coco Copra sem Sabor e sem Cheiro — 200 ml":
    "https://atacadaomaromba.fbitsstatic.net/img/p/oleo-de-coco-sem-sabor-500ml-copra-152027/343788.jpg?w=710&h=710&v=202604101603",

  "Óleo de Coco Copra sem Sabor e sem Cheiro — 500 ml":
    "https://atacadaomaromba.fbitsstatic.net/img/p/oleo-de-coco-sem-sabor-500ml-copra-152027/343788.jpg?w=710&h=710&v=202604101603",

  // =====================================================
  // SANTO ÓLEO
  // =====================================================

  "Óleo de Coco Santo Óleo Extravirgem — 200 ml":
    "https://loja.santooleo.com.br/cdn/shop/files/oleo-de-coco-de-polpa-200ml-santo-oleo.jpg",

  "Óleo de Coco Santo Óleo Extravirgem — 500 ml":
    "https://loja.santooleo.com.br/cdn/shop/files/oleo-de-coco-de-polpa-500ml-santo-oleo.jpg",

  // =====================================================
  // SÉSAMO REAL
  // =====================================================

  "Tahine Tradicional — 320 g":
    "https://sesamoreal.com.br/cdn/shop/files/tahine-tradicional-320g.png",

  "Tahine Integral — 320 g":
    "https://sesamoreal.com.br/cdn/shop/files/tahine-integral-320g.png",

  "Gergelim Mix — 170 g":
    "https://sesamoreal.com.br/cdn/shop/files/gergelim-mix-170g.png"
};

let aplicadas = 0;
let existentes = 0;
let naoEncontrados = 0;

function normalizar(txt) {
  return String(txt || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const [nome, url] of Object.entries(imagens)) {

  const alvo = normalizar(nome);

  const produto = produtos.find(p => {
    const n = normalizar(p.nome);

    // correspondência direta
    if (n === alvo) return true;

    // correspondência por partes para produtos cujo nome
    // no JSON não contém a marca/peso exatamente
    const partes = alvo.split(" ").filter(x => x.length > 2);

    return partes.filter(x => n.includes(x)).length >=
      Math.min(4, partes.length);
  });

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
console.log("   PRIORIDADE 01 — IMAGENS");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
