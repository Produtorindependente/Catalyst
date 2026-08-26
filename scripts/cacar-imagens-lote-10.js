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

function extrair(html) {
  const candidatos = [];

  const padroes = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    /"image"\s*:\s*"([^"]+)"/gi,
    /"imageUrl"\s*:\s*"([^"]+)"/gi,
    /<img[^>]+src=["']([^"']+)["']/gi,
    /<img[^>]+data-src=["']([^"']+)["']/gi
  ];

  for (const regex of padroes) {
    let m;
    while ((m = regex.exec(html)) !== null) {
      candidatos.push(m[1]);
    }
  }

  return candidatos
    .map(x => x.replace(/\\u002F/g, "/").replace(/\\\//g, "/"))
    .map(x => {
      try {
        return new URL(x).href;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function pareceImagem(url) {
  const u = url.toLowerCase();

  return (
    /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(u) ||
    u.includes("image") ||
    u.includes("images") ||
    u.includes("arquivos") ||
    u.includes("produto")
  );
}

async function buscar(url) {
  try {
    const resposta = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
      },
      redirect: "follow"
    });

    if (!resposta.ok) {
      console.log(`   ⚠️ HTTP ${resposta.status}`);
      return [];
    }

    const html = await resposta.text();
    return extrair(html).filter(pareceImagem);

  } catch (erro) {
    console.log(`   ❌ ${erro.message}`);
    return [];
  }
}

(async () => {

  console.log("==========================================");
  console.log("   CATALYST — CAÇA DE IMAGENS — LOTE 10");
  console.log("==========================================");

  let atualizados = 0;

  for (const [id, urls] of Object.entries(fontes)) {

    const produto = produtos.find(p => String(p.id) === String(id));

    if (!produto) {
      console.log(`\n❌ ID ${id} não encontrado`);
      continue;
    }

    console.log(`\n🔎 ID ${id} — ${produto.nome}`);

    let encontrada = "";

    for (const fonte of urls) {

      console.log(`   Fonte: ${fonte}`);

      const imagens = await buscar(fonte);

      if (imagens.length) {
        encontrada = imagens[0];

        console.log("   ✅ IMAGEM ENCONTRADA");
        console.log(`   ${encontrada}`);

        break;
      }

      console.log("   ⚠️ Nenhuma imagem direta encontrada.");
    }

    if (encontrada) {
      produto.imagem = encontrada;
      atualizados++;
    } else {
      console.log("   ⏳ CONTINUA PENDENTE");
    }
  }

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );

  console.log("\n==========================================");
  console.log("       RESULTADO — CAÇA LOTE 10");
  console.log("==========================================");
  console.log(`Imagens encontradas agora: ${atualizados}`);
  console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
  console.log("==========================================");

})();
