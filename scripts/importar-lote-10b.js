const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  // =====================================================
  // COPRA
  // =====================================================

  "Óleo de Coco Copra Extravirgem":
    "https://copra.com.br/wp-content/uploads/2020/05/copra_banner_oleoextravirgem_proteste__X_X_X_XX_X.jpg",

  "Óleo de Coco Copra sem Sabor e sem Cheiro":
    "https://copra.com.br/wp-content/uploads/2025/02/copra_AguaDeCoco1L.png",

  // =====================================================
  // SANTO ÓLEO
  // =====================================================

  "Óleo de Coco Santo Óleo Extravirgem":
    "https://loja.santooleo.com.br/cdn/shop/files/oleo-de-coco-extravirgem-da-pelicula-500ml.png",

  // =====================================================
  // ESSÊNCIA DO VALE
  // =====================================================

  "Geleia de Pimenta Diet":
    "https://loja.essenciadovale.com/media/catalog/product/g/e/geleia_de_pimenta_diet_200g.png",

  // =====================================================
  // BR SPICES
  // =====================================================

  "Sal Marinho Integral de Mossoró":
    "https://www.loja.brspices.com.br/media/catalog/product/s/a/sal_marinho_integral_mossoro_500g.jpg"
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

  const encontrados = produtos.filter(
    p => normalizar(p.nome) === normalizar(nome)
  );

  if (!encontrados.length) {
    console.log(`⚠️ Não encontrado: ${nome}`);
    naoEncontrados++;
    continue;
  }

  for (const produto of encontrados) {

    if (produto.imagem) {
      console.log(`⏭️ Já possui imagem: ${produto.nome} — ${produto.peso || ""}`);
      existentes++;
      continue;
    }

    produto.imagem = url;
    console.log(`✅ Imagem aplicada: ${produto.nome} — ${produto.peso || ""}`);
    aplicadas++;
  }
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" LOTE 10B — ÓLEOS / GELEIA / SAL");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
