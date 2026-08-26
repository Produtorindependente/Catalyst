const fs = require("fs");

const ARQUIVO = "data/produtos.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

/*
============================================================
 CATALYST — CADASTRO — LOTE 16
 IDs: 386 a 395
============================================================
*/

const fontesImagem = {

  386:
    "https://www.lojarelvaverde.com.br/alho-granulado-100g-p3793",

  387:
    "https://www.magnavita.com.br/products/manjericao-100g",

  388:
    "https://www.mundonaturais.com.br/alecrim-desidratado",

  389:
    "https://www.atacadoprodutosnaturais.com.br/produto/alho-em-po-100g/",

  390:
    "https://www.gonzaloalimentos.com.br/produtos/flor-de-sal-original-100g/",

  391:
    "https://www.seugranelemporio.com.br/produtos-naturais/sementes-graos/trigo-sarraceno-100g",

  392:
    "https://www.magnavita.com.br/products/canela-em-pau-100g",

  393:
    "https://www.emporioecia.com.br/produto/folhas-de-ginkgo-biloba-ginkgo-biloba-pacote-100gr.html",

  394:
    "https://chaecia.com.br/products/ch%C3%A1-de-guaco-mikania-glomerata-sprengel-100g",

  395:
    "https://www.nacaoverde.com.br/products/cha-verde-nacao-verde-100g"

};


/*
============================================================
 PRODUTOS
============================================================
*/

const novosProdutos = [

  {
    id: 386,
    nome: "Alho Granulado",
    descricao:
      "Alho desidratado em pequenos grânulos, com sabor e aroma característicos. Uma opção prática para temperar carnes, aves, peixes, arroz, massas, legumes, molhos e diversas preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "103",
    imagem: fontesImagem[386]
  },

  {
    id: 387,
    nome: "Manjericão",
    descricao:
      "Manjericão desidratado, erva aromática de sabor marcante e agradável. Ideal para pizzas, massas, molhos, saladas, carnes, sopas, refogados e outras preparações culinárias.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "NÃO LEGÍVEL",
    imagem: fontesImagem[387]
  },

  {
    id: 388,
    nome: "Alecrim Desidratado",
    descricao:
      "Erva aromática desidratada de sabor e aroma marcantes. Pode ser utilizada no preparo de carnes, aves, peixes, legumes, molhos, marinadas, pães e outras receitas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "204",
    imagem: fontesImagem[388]
  },

  {
    id: 389,
    nome: "Alho em Pó",
    descricao:
      "Alho desidratado moído em pó fino, prático para realçar o sabor das preparações. Ideal para carnes, frango, peixes, arroz, feijão, legumes, sopas, molhos e marinadas.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "402",
    imagem: fontesImagem[389]
  },

  {
    id: 390,
    nome: "Flor de Sal",
    descricao:
      "Flor de sal composta por delicados cristais de sal marinho, utilizada principalmente para finalizar e realçar o sabor de carnes, peixes, legumes, saladas e outras preparações.",
    preco: 7.90,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "162",
    imagem: fontesImagem[390]
  },

  {
    id: 391,
    nome: "Trigo Sarraceno",
    descricao:
      "Grão de sabor suave e versátil, utilizado em diversas preparações. Pode ser empregado em saladas, acompanhamentos, bowls, sopas e receitas variadas.",
    preco: 3.80,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Grãos",
    peso: 100,
    unidade: "g",
    codigo: "190",
    imagem: fontesImagem[391]
  },

  {
    id: 392,
    nome: "Canela em Pau",
    descricao:
      "Canela em pedaços, com aroma quente e sabor característico. Ideal para chás, cafés, bebidas aromatizadas, doces, compotas, sobremesas e preparações culinárias.",
    preco: 12.00,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Temperos Naturais",
    peso: 100,
    unidade: "g",
    codigo: "246",
    imagem: fontesImagem[392]
  },

  {
    id: 393,
    nome: "Ginkgo Biloba",
    descricao:
      "Folhas desidratadas de Ginkgo biloba, tradicionalmente utilizadas no preparo de infusões. Produto apresentado em folhas secas para preparo de chá.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Chás",
    peso: 100,
    unidade: "g",
    codigo: "232",
    imagem: fontesImagem[393]
  },

  {
    id: 394,
    nome: "Guaco",
    descricao:
      "Folhas desidratadas de guaco, tradicionalmente utilizadas no preparo de infusões. Produto apresentado em folhas secas para preparo de chá.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Chás",
    peso: 100,
    unidade: "g",
    codigo: "234",
    imagem: fontesImagem[394]
  },

  {
    id: 395,
    nome: "Chá Verde",
    descricao:
      "Folhas de chá verde provenientes da Camellia sinensis, utilizadas para o preparo de infusão quente ou gelada. Possui sabor característico e aroma vegetal.",
    preco: 9.50,
    precoAnterior: null,
    destaque: false,
    marca: "Cantinho Bom",
    categoria: "Chás",
    peso: 100,
    unidade: "g",
    codigo: "221",
    imagem: fontesImagem[395]
  }

];


/*
============================================================
 DESCOBRIR IMAGEM COMERCIAL
============================================================
*/

async function descobrirImagem(url) {

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
      return null;
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

        if (imagem.startsWith("//")) {
          imagem = "https:" + imagem;
        }

        else if (imagem.startsWith("/")) {
          imagem = new URL(imagem, url).href;
        }

        return imagem;
      }
    }

    console.log("   ⚠️ Não encontrei og:image.");
    return null;

  } catch (erro) {

    console.log(
      `   ⚠️ Falha ao consultar imagem: ${erro.message}`
    );

    return null;
  }
}


/*
============================================================
 EXECUÇÃO
============================================================
*/

(async () => {

  console.log("");
  console.log("==========================================");
  console.log(" CATALYST — CADASTRO — LOTE 16");
  console.log("==========================================");
  console.log("");

  let adicionados = 0;
  let duplicados = 0;
  let imagensEncontradas = 0;
  let imagensPendentes = 0;

  for (const produto of novosProdutos) {

    const existePorId = produtos.some(
      p => Number(p.id) === produto.id
    );

    const existePorNome = produtos.some(
      p =>
        String(p.nome || "")
          .trim()
          .toLowerCase() ===
        produto.nome.trim().toLowerCase()
    );

    if (existePorId || existePorNome) {

      console.log(
        `⚠️ DUPLICADO — ${produto.nome} — ignorado`
      );

      duplicados++;
      continue;
    }

    console.log(`🔎 ${produto.nome}`);

    const imagem = await descobrirImagem(
      produto.imagem
    );

    if (imagem) {

      produto.imagem = imagem;
      imagensEncontradas++;

      console.log(`   🖼️ IMAGEM: ${imagem}`);

    } else {

      /*
       * Não colocamos URL de página no campo imagem.
       * Se a imagem comercial não puder ser localizada,
       * deixamos null para não quebrar o catálogo.
       */

      produto.imagem = null;
      imagensPendentes++;

      console.log(
        "   ⚠️ Imagem comercial pendente"
      );
    }

    produtos.push(produto);

    adicionados++;

    console.log(
      `   ✅ ID ${produto.id} — ${produto.nome}`
    );

    console.log(
      `   💰 R$ ${produto.preco
        .toFixed(2)
        .replace(".", ",")}`
    );

    console.log(
      `   🏷️ Código: ${produto.codigo}`
    );

    console.log("");
  }


  /*
  ==========================================================
   ORDENAR POR ID
  ==========================================================
  */

  produtos.sort(
    (a, b) => Number(a.id) - Number(b.id)
  );


  /*
  ==========================================================
   SALVAR
  ==========================================================
  */

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );


  /*
  ==========================================================
   RESULTADO
  ==========================================================
  */

  console.log("");
  console.log("==========================================");
  console.log(" CATALYST — RESULTADO — LOTE 16");
  console.log("==========================================");

  console.log(
    `Produtos adicionados: ${adicionados}`
  );

  console.log(
    `Duplicados ignorados: ${duplicados}`
  );

  console.log(
    `Imagens encontradas: ${imagensEncontradas}`
  );

  console.log(
    `Imagens pendentes: ${imagensPendentes}`
  );

  console.log(
    `TOTAL NO CATÁLOGO: ${produtos.length}`
  );

  console.log("==========================================");
  console.log("");

})();
