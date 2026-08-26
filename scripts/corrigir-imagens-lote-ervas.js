const fs = require("fs");
const path = require("path");

const ARQUIVO = "data/produtos.json";
const BACKUP = "data/produtos.backup_imagens_ervas.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

/*
============================================================
 CATALYST — CORREÇÃO DE IMAGENS — LOTE ERVAS
============================================================

 SOMENTE ESTES 3 PRODUTOS:
 - Alho Frito Granulado
 - Erva Doce
 - Hibisco

 NÃO ALTERA NENHUM OUTRO PRODUTO.
============================================================
*/

const fontes = {

  "Alho Frito Granulado": [
    "https://www.pitadadetempero.com.br/alho-frito-granulado",
    "https://www.jaunorte.com.br/alhogranuladofrito"
  ],

  "Erva Doce": [
    "https://www.sejavs.com.br/produtos/chas/erva-doce-100g/"
  ],

  "Hibisco": [
    "https://www.lojanaturaldavila.com.br/hibisco-em-flor",
    "https://www.belezadaterra.com.br/FE0880"
  ]

};


/*
============================================================
 BUSCA OG:IMAGE
============================================================
*/

async function buscarImagem(url) {

  try {

    const resposta = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
      }
    });

    if (!resposta.ok) {
      console.log(`   ⚠️ HTTP ${resposta.status}`);
      return null;
    }

    const html = await resposta.text();

    const padroes = [

      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,

      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,

      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,

      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,

      /"image"\s*:\s*"([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i

    ];

    for (const regex of padroes) {

      const encontrado = html.match(regex);

      if (!encontrado || !encontrado[1]) {
        continue;
      }

      let imagem = encontrado[1]
        .replace(/&amp;/g, "&")
        .replace(/\\u002F/g, "/")
        .replace(/\\\//g, "/");

      if (imagem.startsWith("//")) {
        imagem = "https:" + imagem;
      }

      else if (imagem.startsWith("/")) {
        imagem = new URL(imagem, resposta.url).href;
      }

      if (
        /^https?:\/\//i.test(imagem) &&
        /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(imagem)
      ) {
        return imagem;
      }

      /*
       * Algumas lojas colocam parâmetros depois
       * da extensão ou URLs CDN diferentes.
       */
      if (/^https?:\/\//i.test(imagem)) {
        return imagem;
      }
    }

  } catch (erro) {

    console.log(`   ⚠️ Falha: ${erro.message}`);

  }

  return null;
}


/*
============================================================
 DOWNLOAD DA IMAGEM
============================================================
*/

async function baixarImagem(url, destino) {

  try {

    const resposta = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        "Accept":
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });

    if (!resposta.ok) {
      return false;
    }

    const tipo = resposta.headers.get("content-type") || "";

    if (!tipo.startsWith("image/")) {
      return false;
    }

    const buffer = Buffer.from(
      await resposta.arrayBuffer()
    );

    if (!buffer.length) {
      return false;
    }

    fs.writeFileSync(destino, buffer);

    return true;

  } catch (erro) {

    console.log(
      `   ⚠️ Falha no download: ${erro.message}`
    );

    return false;
  }
}


/*
============================================================
 EXTENSÃO
============================================================
*/

function extensaoImagem(url) {

  const limpo = url.split("?")[0].toLowerCase();

  if (limpo.endsWith(".png")) return ".png";
  if (limpo.endsWith(".webp")) return ".webp";
  if (limpo.endsWith(".jpeg")) return ".jpeg";

  return ".jpg";
}


/*
============================================================
 EXECUÇÃO
============================================================
*/

(async () => {

  console.log("");
  console.log("==========================================");
  console.log(" CATALYST — CORREÇÃO IMAGENS — ERVAS");
  console.log("==========================================");
  console.log("");

  /*
   * Backup antes de qualquer alteração
   */

  fs.copyFileSync(
    ARQUIVO,
    BACKUP
  );

  const pasta = path.join(
    "assets",
    "img",
    "produtos"
  );

  fs.mkdirSync(
    pasta,
    { recursive: true }
  );

  let corrigidos = 0;
  let pendentes = 0;

  for (const nome of Object.keys(fontes)) {

    const produto = produtos.find(
      p =>
        String(p.nome || "")
          .trim()
          .toLowerCase() ===
        nome.trim().toLowerCase()
    );

    if (!produto) {

      console.log(
        `⚠️ Produto não encontrado: ${nome}`
      );

      pendentes++;
      continue;
    }

    console.log(
      `🔎 ${produto.nome} — ID ${produto.id}`
    );

    let imagem = null;

    for (const fonte of fontes[nome]) {

      console.log(
        `   Fonte: ${fonte}`
      );

      imagem = await buscarImagem(fonte);

      if (imagem) {

        console.log(
          `   ✅ IMAGEM ENCONTRADA`
        );

        console.log(
          `   ${imagem}`
        );

        break;
      }

      console.log(
        `   ⚠️ Imagem não localizada nesta fonte`
      );
    }

    if (!imagem) {

      console.log(
        `   ❌ CONTINUA SEM IMAGEM`
      );

      pendentes++;
      console.log("");
      continue;
    }

    /*
     * Baixa uma cópia local para o Catalyst.
     */

    const ext = extensaoImagem(imagem);

    const arquivoLocal =
      `produto-${produto.id}${ext}`;

    const caminhoLocal =
      path.join(pasta, arquivoLocal);

    const baixou =
      await baixarImagem(
        imagem,
        caminhoLocal
      );

    if (baixou) {

      /*
       * O catálogo passa a usar a imagem local.
       * Assim não dependemos eternamente da loja externa.
       */

      produto.imagem =
        `assets/img/produtos/${arquivoLocal}`;

      produto.imagemFonte =
        imagem;

      console.log(
        `   💾 IMAGEM SALVA: ${produto.imagem}`
      );

    } else {

      /*
       * Se o download falhar, ainda guardamos
       * a URL comercial encontrada.
       */

      produto.imagem = imagem;
      produto.imagemFonte = imagem;

      console.log(
        `   ⚠️ Download local falhou.`
      );

      console.log(
        `   URL comercial preservada no catálogo.`
      );
    }

    corrigidos++;

    console.log("");
  }


  /*
   * Salva JSON
   */

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(
      produtos,
      null,
      2
    ) + "\n",
    "utf8"
  );


  /*
   * Resultado
   */

  console.log("==========================================");
  console.log(" RESULTADO — IMAGENS ERVAS");
  console.log("==========================================");

  console.log(
    `Imagens corrigidas: ${corrigidos}`
  );

  console.log(
    `Pendências: ${pendentes}`
  );

  console.log(
    `Backup: ${BACKUP}`
  );

  console.log(
    `JSON: ${ARQUIVO}`
  );

  console.log("==========================================");
  console.log("");

})();
