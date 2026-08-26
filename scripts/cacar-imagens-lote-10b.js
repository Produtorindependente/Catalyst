const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const fontes = {
  265: [
    "https://www.lojabemnatural.com.br/castanhinha-de-banana-com-chocolate-70"
  ],

  266: [
    "https://www.lojabemnatural.com.br/amendoim-com-chocolate-70-100g",
    "https://www.suprali.com.br/amendoim-drageao-em-chocolate-70-cacau-200g"
  ],

  269: [
    "https://www.lojadivinaterra.com.br/drageado-de-uva-passa-com-chocolate-70--cacau-a-granel/p"
  ],

  270: [
    "https://www.lojadivinaterra.com.br/drageado-de-amendoim-com-chocolate-70--cacau-a-granel/p",
    "https://www.lojabemnatural.com.br/amendoim-com-chocolate-70-100g"
  ],

  272: [
    "https://www.choconutry.com.br/drageado-de-cranberry-com-chocolate-70"
  ],

  273: [
    "https://www.natuweb.com.br/alimentos/barrinhas/barra-de-chocolate-70-cacau-sabor-cranberry-zero-leite-70g-only-4"
  ],

  274: [
    "https://www.lojabemnatural.com.br/bala-de-alcacuz"
  ],

  275: [
    "https://www.suprali.com.br/damasco-banhado-em-chocolate-70-cacau-200g",
    "https://www.maniadecastanha.com.br/damasco-com-chocolate-70-cacau-500g"
  ],

  276: [
    "https://www.lojadivinaterra.com.br/drageado-de-limao-siciliano"
  ]
};

const MAX_BYTES = 2 * 1024 * 1024;
const TIMEOUT = 10000;

function pareceImagem(url) {
  if (!url) return false;

  const u = url.toLowerCase();

  return (
    /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(u) ||
    u.includes(".jpg?") ||
    u.includes(".jpeg?") ||
    u.includes(".png?") ||
    u.includes(".webp?")
  );
}

function normalizarUrl(url, origem) {
  try {
    return new URL(url, origem).href;
  } catch {
    return "";
  }
}

function extrairImagem(html, origem) {

  const candidatos = [];

  const metaPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
  ];

  for (const regex of metaPatterns) {
    const m = html.match(regex);
    if (m && m[1]) {
      candidatos.push(m[1]);
    }
  }

  const imgRegex =
    /<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi;

  let match;
  let contador = 0;

  while ((match = imgRegex.exec(html)) !== null && contador < 30) {
    candidatos.push(match[1]);
    contador++;
  }

  for (const candidato of candidatos) {

    const url = normalizarUrl(
      candidato
        .replace(/\\u002F/g, "/")
        .replace(/\\\//g, "/"),
      origem
    );

    if (pareceImagem(url)) {
      return url;
    }
  }

  return "";
}

async function buscar(url) {

  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, TIMEOUT);

  try {

    const resposta = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml"
      }
    });

    if (!resposta.ok) {
      console.log(`   ⚠️ HTTP ${resposta.status}`);
      return "";
    }

    const tipo = resposta.headers.get("content-type") || "";

    if (!tipo.includes("text/html")) {
      console.log(`   ⚠️ Não é HTML: ${tipo}`);
      return "";
    }

    const tamanho = Number(
      resposta.headers.get("content-length") || 0
    );

    if (tamanho > MAX_BYTES) {
      console.log(
        `   ⚠️ Página muito grande (${Math.round(tamanho / 1024)} KB)`
      );
      return "";
    }

    const reader = resposta.body.getReader();

    const partes = [];
    let total = 0;

    while (true) {

      const { value, done } = await reader.read();

      if (done) break;

      total += value.length;

      if (total > MAX_BYTES) {
        reader.cancel();

        console.log(
          `   ⚠️ Limite de ${MAX_BYTES / 1024 / 1024} MB atingido`
        );

        return "";
      }

      partes.push(Buffer.from(value));
    }

    const html = Buffer.concat(partes).toString("utf8");

    return extrairImagem(html, url);

  } catch (erro) {

    if (erro.name === "AbortError") {
      console.log("   ⏱️ Timeout");
    } else {
      console.log(`   ❌ ${erro.message}`);
    }

    return "";

  } finally {
    clearTimeout(timer);
  }
}

(async () => {

  console.log("==========================================");
  console.log(" CATALYST — CAÇA DE IMAGENS LOTE 10B");
  console.log("==========================================");

  let encontradas = 0;
  let pendentes = 0;

  for (const [id, urls] of Object.entries(fontes)) {

    const produto = produtos.find(
      p => String(p.id) === String(id)
    );

    if (!produto) {
      console.log(`\n❌ ID ${id} não encontrado`);
      continue;
    }

    console.log(`\n🔎 ID ${id} — ${produto.nome}`);

    let imagemEncontrada = "";

    for (const fonte of urls) {

      console.log(`   Fonte: ${fonte}`);

      imagemEncontrada = await buscar(fonte);

      if (imagemEncontrada) {

        console.log("   ✅ IMAGEM DIRETA ENCONTRADA");
        console.log(`   ${imagemEncontrada}`);

        break;

      } else {

        console.log("   ⚠️ Nenhuma imagem direta encontrada");
      }
    }

    if (imagemEncontrada) {

      produto.imagem = imagemEncontrada;
      encontradas++;

    } else {

      console.log("   ⏳ CONTINUA PENDENTE");
      pendentes++;
    }
  }

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );

  console.log("\n==========================================");
  console.log(" RESULTADO — LOTE 10B");
  console.log("==========================================");
  console.log(`Imagens encontradas: ${encontradas}`);
  console.log(`Ainda pendentes: ${pendentes}`);
  console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
  console.log("==========================================");

})();
