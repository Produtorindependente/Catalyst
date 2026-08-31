const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  "Pão Francês com Sementes":
    "https://images.tcdn.com.br/img/img_prod/2566/paofrances_com_sementes_350g.jpg",

  "Chips de Batata-Doce":
    "https://www.nazinha.com.br/wp-content/uploads/2025/07/chips-batata-doce-original-30g.png",

  "Biscoito Sembei":
    "https://cdn.awsli.com.br/800x800/472/472611/produto/sembei-100g.jpg",

  "Polvilho com Provolone":
    "https://cdn.awsli.com.br/800x800/472/472611/produto/polvilho-provolone-100g.jpg",

  "Banana Chips Doce":
    "https://www.santainesemporio.com.br/media/catalog/product/b/a/banana_chips_doce.jpg",

  "Goji Berry":
    "https://cdn.awsli.com.br/800x800/472/472611/produto/goji-berry.jpg",

  "Mix Crocante":
    "https://cdn.awsli.com.br/800x800/472/472611/produto/mix-crocante.jpg",

  "Damasco":
    "https://cdn.awsli.com.br/800x800/472/472611/produto/damasco.jpg",

  "Noz Mariposa":
    "https://cdn.awsli.com.br/800x800/472/472611/produto/noz-mariposa.jpg",

  "Stevia em Pó":
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Stevia_en_polvo.jpg"
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
console.log(" LOTE 06 — GRANEL / SNACKS / PADARIA");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
