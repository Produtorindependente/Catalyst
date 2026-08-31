const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

/*
============================================================
 CATALYST — CADASTRO + IMAGENS — LOTE 15
 Produtos: IDs 376 a 385
============================================================
*/

// ----------------------------------------------------------
// URLs comerciais
//
// Quando temos URL direta de imagem, usamos diretamente.
// Quando temos apenas a página comercial, o script tenta
// encontrar automaticamente og:image / twitter:image.
// ----------------------------------------------------------

const fontesImagem = {

  376: "https://www.magnavita.com.br/products/funghi-seco-chileno-100g",

  377: "https://www.carrefour.com.br/produto/sal-negro-do-himalaia-324969065",

  378: "https://www.rotadosgraos.com.br/produtos/mostarda-em-grao/",

  379: "https://www.rotadosgraos.com.br/produtos/tempero-ana-maria-light/",

  380: "https://cipria.com.br/wp-content/uploads/2020/12/especiarias-cipria-cominho-em-grao.jpg",

  381: "https://images.tcdn.com.br/img/img_prod/600293/tomilho_desidratado_em_flocos_100g_tlc_tudo_low_ca_2_20251112172131_4dba3dd789ba.jpg",

  382: "https://cdn.iset.io/assets/39790/produtos/1791/alho-po-ziplock-relva-verde-100g.jpg",

  383: "https://www.cocinista.es/download/bancorecursos/Productos5/10045c-copos-de-ajo-laminado-natco-100g.jpg",

  384: "https://www.focoalternativo.com.br/uploads/media/Default/0001/07/b052ac2473d8e4e8b13b4e9a1d160629002aa003.jpeg",

  385: "https://cdn.iset.io/assets/39790/produtos/3793/alho-granulado-embalagem-ziplock-relva-verde-100g.jpg"

};


// ----------------------------------------------------------
// Produtos
// ----------------------------------------------------------

const novosProdutos = [

  {
    id: 376,
    nome: "Funghi Seco",
    descricao:
      "Cogumelo desidratado de sabor intenso, aroma marcante e notas terrosas e umami. Ideal para risotos, massas, molhos, sopas, caldos e diversas preparações culinárias.",
    preco: 12.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "230",
    imagem: fontesImagem[376]
  },

  {
    id: 377,
    nome: "Sal Negro Fino",
    descricao:
      "Sal negro fino do Himalaia, também conhecido como Kala Namak, com coloração característica e aroma e sabor levemente sulfurosos. Pode ser utilizado para temperar saladas, legumes, arroz, preparações vegetarianas, molhos e finalizações.",
    preco: 21.49,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "140",
    imagem: fontesImagem[377]
  },

  {
    id: 378,
    nome: "Mostarda em Grão",
    descricao:
      "Sementes inteiras de mostarda, aromáticas e de sabor levemente picante. Podem ser utilizadas em molhos, marinadas, conservas, picles, carnes, legumes, feijões e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "748",
    imagem: fontesImagem[378]
  },

  {
    id: 379,
    nome: "Tempero Ana Maria Light",
    descricao:
      "Blend de temperos desidratados com alho, cebola, cebolinha, coentro, orégano, pimentões, salsa e tomate em flocos. Uma opção leve e prática para realçar o sabor de carnes, frango, arroz, feijão, legumes, sopas e refogados.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "769",
    imagem: fontesImagem[379]
  },

  {
    id: 380,
    nome: "Cominho em Grão",
    descricao:
      "Sementes inteiras de cominho, de aroma marcante e sabor terroso levemente picante. Muito utilizado em carnes, feijão, arroz, molhos, marinadas, legumes, curries e diversas receitas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "612",
    imagem: fontesImagem[380]
  },

  {
    id: 381,
    nome: "Tomilho",
    descricao:
      "Erva aromática desidratada de sabor marcante e levemente terroso. Ideal para carnes, aves, peixes, frutos do mar, sopas, molhos, legumes, marinadas e diversos pratos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "143",
    imagem: fontesImagem[381]
  },

  {
    id: 382,
    nome: "Alho em Pó",
    descricao:
      "Alho desidratado e moído em pó fino, prático para realçar o sabor e o aroma das preparações. Ideal para carnes, frango, peixes, arroz, feijão, legumes, sopas, molhos, marinadas e temperos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "659",
    imagem: fontesImagem[382]
  },

  {
    id: 383,
    nome: "Alho em Flocos",
    descricao:
      "Alho desidratado em flocos, preservando o aroma e o sabor característicos do alho. Pode ser utilizado em carnes, frango, peixes, sopas, molhos, arroz, massas, legumes, saladas e marinadas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "901",
    imagem: fontesImagem[383]
  },

  {
    id: 384,
    nome: "Ervas Finas",
    descricao:
      "Blend de ervas aromáticas desidratadas, desenvolvido para proporcionar aroma e sabor às preparações. Ideal para carnes, aves, peixes, massas, molhos, saladas, legumes e diversos pratos.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "116",
    imagem: fontesImagem[384]
  },

  {
    id: 385,
    nome: "Alho Granulado",
    descricao:
      "Alho desidratado em pequenos grânulos, com sabor e aroma concentrados. Uma opção prática para temperar carnes, aves, peixes, sopas, molhos, marinadas, arroz, massas, legumes e diversas receitas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "104",
    imagem: fontesImagem[385]
  }

];


// ----------------------------------------------------------
// Função para descobrir imagem dentro da página comercial
// ----------------------------------------------------------

async function descobrirImagem(url) {

  // Se já for uma imagem direta, não precisa pesquisar
  if (/\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(url)) {
    return url;
  }

  try {

    const resposta = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36"
      }
    });

    if (!resposta.ok) {
      console.log(`   ⚠️ Página não respondeu: ${resposta.status}`);
      return url;
    }

    const html = await resposta.text();

    const padroes = [

      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,

      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,

      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,

      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i

    ];

    for (const regex of padroes) {

      const encontrado = html.match(regex);

      if (encontrado && encontrado[1]) {

        let imagem = encontrado[1]
          .replace(/&amp;/g, "&")
          .replace(/\\u002F/g, "/");

        // Converte URL relativa em absoluta
        if (imagem.startsWith("//")) {
          imagem = "https:" + imagem;
        } else if (imagem.startsWith("/")) {
          imagem = new URL(imagem, url).href;
        }

        return imagem;
      }
    }

    console.log("   ⚠️ Não encontrei og:image.");
    return url;

  } catch (erro) {

    console.log(`   ⚠️ Falha ao consultar imagem: ${erro.message}`);
    return url;

  }

}


// ----------------------------------------------------------
// Execução
// ----------------------------------------------------------

(async () => {

  console.log("");
  console.log("==========================================");
  console.log(" CATALYST — CADASTRO — LOTE 15");
  console.log("==========================================");
  console.log("");

  let adicionados = 0;
  let duplicados = 0;

  for (const produto of novosProdutos) {

    const existePorId = produtos.some(p => Number(p.id) === produto.id);

    const existePorNome = produtos.some(
      p =>
        String(p.nome || "")
          .trim()
          .toLowerCase() === produto.nome.trim().toLowerCase()
    );

    if (existePorId || existePorNome) {

      console.log(
        `⚠️ DUPLICADO — ${produto.nome} — não foi adicionado`
      );

      duplicados++;
      continue;
    }

    console.log(`🔎 ${produto.nome}`);

    produto.imagem = await descobrirImagem(produto.imagem);

    produtos.push(produto);

    adicionados++;

    console.log(
      `✅ ID ${produto.id} — ${produto.nome} — R$ ${produto.preco.toFixed(2).replace(".", ",")} — código: ${produto.codigo}`
    );

    console.log(`   IMAGEM: ${produto.imagem}`);
    console.log("");
  }


  // --------------------------------------------------------
  // Ordena pelo ID
  // --------------------------------------------------------

  produtos.sort((a, b) => Number(a.id) - Number(b.id));


  // --------------------------------------------------------
  // Salva JSON
  // --------------------------------------------------------

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );


  // --------------------------------------------------------
  // Resultado
  // --------------------------------------------------------

  console.log("==========================================");
  console.log(" CATALYST — RESULTADO — LOTE 15");
  console.log("==========================================");

  console.log(`Produtos adicionados: ${adicionados}`);
  console.log(`Duplicados ignorados: ${duplicados}`);
  console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);

  console.log("==========================================");
  console.log("");

})();
