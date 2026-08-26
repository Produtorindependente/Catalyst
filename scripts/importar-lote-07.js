const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  "Pistache com Casca":
    "https://www.masternatunutri.com.br/pistache-com-casca-100g-a-granel",

  "Pistache Inteiro sem Casca":
    "https://saboremgraos.com.br/produto/pistache-sem-casca-cru-granel-100g/",

  "Castanha de Caju Torrada sem Sal":
    "https://www.lojarelvaverde.com.br/castanha-de-caju-sem-sal-100g-p263",

  "Chips de Kiwi":
    "https://www.naturallepinhais.com.br/products/chips-de-kiwi",

  "Chips de Coco sem Açúcar":
    "https://www.ameninadalinhaca.com.br/chips-de-coco-sem-acucar",

  "Polvilho com Chia":
    "https://www.terracerealista.com.br/biscoitos-e-cookies/biscoito-de-polvilho-chia",

  "Noz Quartz":
    "https://www.donacastanha.com.br/nozes-quartz-extra-light-100g.html",

  "Amendoim Doce":
    "https://saboremgraos.com.br/produto/amendoim-doce-granel-100g/",

  "Xerém de Amendoim":
    "https://www.rotulodobem.com.br/alimentos-naturais/xerem-de-amendoim-a-granel",

  "Castanha de Caju Torrada com Sal":
    "https://www.magazineluiza.com.br/busca/castanha%2Bcaju%2Btorrada%2Bcom%2Bsal%2B100g/"
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
console.log(" LOTE 07 — GRANEL");
console.log("==========================================");
console.log(`Novas imagens: ${aplicadas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${naoEncontrados}`);
console.log(`Total produtos estruturados: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
