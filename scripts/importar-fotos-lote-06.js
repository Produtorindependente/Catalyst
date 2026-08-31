const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const novosProdutos = [
  {
    nome: "Cardo Mariano",
    aliases: [
      "Cardo Mariano",
      "Cardo de Santa Maria",
      "Silybum marianum"
    ],
    categoria: "Chás",
    preco: 39.9,
    peso: "100 g",
    imagem: "https://www.culturademontania.org.ar/ccam/upload/cardo_mariano_plantas_curativas_montana_11.jpg"
  },

  {
    nome: "Uxi Amarelo",
    aliases: [
      "Uxi Amarelo",
      "Uxi-Amarelo",
      "Endopleura uchi"
    ],
    categoria: "Chás",
    preco: 19.9,
    peso: "30 g",
    imagem: "https://images.tcdn.com.br/img/img_prod/805151/uxi_amarelo_30g_chamel_cha_cascas_423_1_20200724161333.jpg"
  },

  {
    nome: "Zimbro",
    aliases: [
      "Zimbro",
      "Enebro",
      "Juniperus communis"
    ],
    categoria: "Temperos Naturais",
    preco: 44.9,
    peso: "100 g",
    imagem: "https://www.produtosnaturaisonline.com/todos-os-produtos/zimbro-100g-a-granel"
  },

  {
    nome: "Maçã com Canela",
    aliases: [
      "Chá de Maçã com Canela",
      "Maçã Canela",
      "Chá Maçã com Canela"
    ],
    categoria: "Chás",
    preco: 8.5,
    peso: "13 g",
    imagem: "https://www.emporioceliaco.com.br/diversos/cha-de-maca-com-canela-10-saches-chamel-13g-sem-gluten"
  },

  {
    nome: "Chá Verde com Hibiscus",
    aliases: [
      "Chá Verde com Hibiscus",
      "Chá Verde com Hibisco",
      "Chá Misto de Chá Verde e Hibiscus"
    ],
    categoria: "Chás",
    preco: 7.9,
    peso: "15 g",
    imagem: "https://down-br.img.susercontent.com/file/0886ad9c5a75fe368c5134170d67aa32"
  },

  {
    nome: "Picão",
    aliases: [
      "Picão",
      "Picão Preto",
      "Bidens pilosa"
    ],
    categoria: "Chás",
    preco: 6.5,
    peso: "30 g",
    imagem: "https://www.nattuatacado.com.br/picao-30g-chamel"
  },

  {
    nome: "Quebra-Pedra",
    aliases: [
      "Quebra-Pedra",
      "Quebra Pedra",
      "Phyllanthus niruri"
    ],
    categoria: "Chás",
    preco: 9.9,
    peso: "30 g",
    imagem: "https://www.drogasil.com.br/cha-pacote-quebra-pedra-30g-chamel-1342910.html"
  },

  {
    nome: "Sálvia",
    aliases: [
      "Sálvia",
      "Salvia officinalis"
    ],
    categoria: "Chás",
    preco: 6,
    peso: "30 g",
    imagem: "https://www.florasaudedistribuidora.com.br/produtos/salvia-30g-chamel/"
  },

  {
    nome: "Arruda",
    aliases: [
      "Arruda",
      "Ruta graveolens"
    ],
    categoria: "Chás",
    preco: 9.5,
    peso: "30 g",
    imagem: "https://www.florasaudedistribuidora.com.br/chas/page/4/"
  },

  {
    nome: "Artemísia",
    aliases: [
      "Artemísia",
      "Artemisia",
      "Artemisia vulgaris"
    ],
    categoria: "Chás",
    preco: 7.9,
    peso: "30 g",
    imagem: "https://www.expressonatural.com.br/pacote-artemisia-30g-chamel"
  },

  {
    nome: "Barbatimão",
    aliases: [
      "Barbatimão",
      "Barbatimão Casca",
      "Stryphnodendron adstringens"
    ],
    categoria: "Chás",
    preco: 9.9,
    peso: "50 g",
    imagem: "https://images.tcdn.com.br/img/img_prod/557982/barbatimao_casca_50g_chamel_2399_1_998c4e22eaa2d3a4e0af7766625285cd.jpg"
  },

  {
    nome: "Boldo do Chile",
    aliases: [
      "Boldo do Chile",
      "Boldo-do-Chile",
      "Peumus boldus"
    ],
    categoria: "Chás",
    preco: 9.9,
    peso: "30 g",
    imagem: "https://www.nattuatacado.com.br/boldo-do-chile-30g-chamel"
  },

  {
    nome: "Cavalinha",
    aliases: [
      "Cavalinha",
      "Equisetum hyemale"
    ],
    categoria: "Chás",
    preco: 9.9,
    peso: "30 g",
    imagem: "https://www.farmasesi.com.br/produto/99863-chaa-chamel-cavalinha-folhas-a-granel-30g"
  },

  {
    nome: "Carqueja",
    aliases: [
      "Carqueja",
      "Carqueja Folhas",
      "Baccharis genistelloides"
    ],
    categoria: "Chás",
    preco: 5.5,
    peso: "30 g",
    imagem: "https://product-data.raiadrogasil.io/images/16080044.webp"
  },

  {
    nome: "Dente-de-Leão",
    aliases: [
      "Dente-de-Leão",
      "Dente de Leão",
      "Taraxacum officinale"
    ],
    categoria: "Chás",
    preco: 6,
    peso: "30 g",
    imagem: "https://www.drogasil.com.br/pacote-de-cha-dente-de-leao-30g-chamel-1201951.html"
  },

  {
    nome: "Erva-de-Bicho",
    aliases: [
      "Erva-de-Bicho",
      "Erva de Bicho",
      "Polygonum persicaria"
    ],
    categoria: "Chás",
    preco: 6,
    peso: "30 g",
    imagem: "https://www.nattuatacado.com.br/erva-de-bicho-30g-chamel"
  },

  {
    nome: "Erva-Baleeira",
    aliases: [
      "Erva-Baleeira",
      "Erva Baleeira",
      "Cordia verbenacea"
    ],
    categoria: "Chás",
    preco: 6,
    peso: "30 g",
    imagem: "https://shopee.com.br/Erva-Baleeira-30G-Chamel-i.394192376.53603527168"
  },

  {
    nome: "Erva-de-Bugre",
    aliases: [
      "Erva-de-Bugre",
      "Erva de Bugre",
      "Casearia sylvestris"
    ],
    categoria: "Chás",
    preco: 6,
    peso: "30 g",
    imagem: "https://www.nattuatacado.com.br/erva-de-bugre-30g-chamel"
  },

  {
    nome: "Graviola",
    aliases: [
      "Graviola",
      "Graviola Folhas",
      "Annona muricata"
    ],
    categoria: "Chás",
    preco: 8,
    peso: "30 g",
    imagem: "https://florasaudedistribuidora.com.br/produtos/graviola-30g-chamel/"
  },

  {
    nome: "Guiné",
    aliases: [
      "Guiné",
      "Petiveria alliacea"
    ],
    categoria: "Chás",
    preco: 8,
    peso: "30 g",
    imagem: "https://shop.pontalbrazil.com/products/chamel-cha-de-guine-30g"
  },

  {
    nome: "Goiabeira",
    aliases: [
      "Goiabeira",
      "Psidium guajava"
    ],
    categoria: "Chás",
    preco: 8,
    peso: "30 g",
    imagem: "https://shop.pontalbrazil.com/products/chamel-cha-de-goiabeira-30g"
  },

  {
    nome: "Louro",
    aliases: [
      "Louro",
      "Folha de Louro",
      "Laurus nobilis"
    ],
    categoria: "Chás",
    preco: 14,
    peso: "30 g",
    imagem: "https://www.drogasil.com.br/pacote-de-cha-de-louro-30g-chamel-1209058.html"
  },

  {
    nome: "Urtiga Folha",
    aliases: [
      "Urtiga",
      "Urtiga Folha",
      "Urtiga Folhas",
      "Urtica dioica"
    ],
    categoria: "Chás",
    preco: 14,
    peso: "100 g",
    imagem: "https://acdn-us.mitiendanube.com/stores/004/851/893/products/urtiga-cha-11e9bebc6b81a9081c17544884779365-1024-1024.webp"
  },

  {
    nome: "Manacá",
    aliases: [
      "Manacá",
      "Manacá em Folhas",
      "Brunfelsia uniflora"
    ],
    categoria: "Chás",
    preco: 9.5,
    peso: "100 g",
    imagem: "https://www.armazemsantahelena.com.br/manaca-brunsfesia-uniflora-"
  }
];

const dados = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

let adicionados = 0;

for (const novo of novosProdutos) {
  const existente = dados.find(
    p => p.nome?.toLowerCase() === novo.nome.toLowerCase()
  );

  if (existente) {
    console.log(`⚠️ Já existe: ${novo.nome}`);
    continue;
  }

  const proximoId =
    dados.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;

  dados.push({
    id: proximoId,
    nome: novo.nome,
    descricao: `Produto natural selecionado, disponível para compra a granel ou em embalagem, conforme apresentação.`,
    preco: novo.preco,
    precoAnterior: null,
    destaque: false,
    unidade: novo.peso,
    categoria: novo.categoria,
    imagem: novo.imagem,
    aliases: novo.aliases
  });

  adicionados++;
  console.log(`✅ Produto adicionado: ${novo.nome}`);
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(dados, null, 2) + "\n",
  "utf8"
);

console.log("");
console.log("==========================================");
console.log("   LOTE 06 — PRODUTOS + IMAGENS");
console.log("==========================================");
console.log(`Processados: ${novosProdutos.length}`);
console.log(`Novos adicionados: ${adicionados}`);
console.log(`TOTAL NO CATÁLOGO: ${dados.length}`);
console.log("==========================================");
