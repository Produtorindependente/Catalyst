const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const fontes = {
  227: [
    "https://www.lojabemnatural.com.br/cha-de-urtiga-100g",
    "https://www.mercadolivre.com.br/cha-de-urtiga-urtiga-dioica-l-100-natural-100g/up/MLBU797677683"
  ],
  231: [
    "https://www.banca12.com.br/germen-de-trigo-100g",
    "https://www.emporioquatroestrelas.com.br/germen-de-trigo-100g10643-6/p",
    "https://www.malaguetaprodutosnaturais.com.br/germen-de-trigo-100g"
  ]
};

async function buscarImagem(url) {
  try {
    const resposta = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
      }
    });

    if (!resposta.ok) {
      console.log(`   ⚠️ HTTP ${resposta.status}`);
      return "";
    }

    const html = await resposta.text();

    const padroes = [
      /property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
      /content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
      /name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
      /content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i,
      /itemprop=["']image["'][^>]*content=["']([^"']+)["']/i,
      /itemprop=["']image["'][^>]*src=["']([^"']+)["']/i
    ];

    for (const regex of padroes) {
      const resultado = html.match(regex);

      if (resultado && resultado[1]) {
        const imagem = new URL(resultado[1], url).href;

        if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(imagem)) {
          return imagem;
        }
      }
    }

    const imagens = [
      ...html.matchAll(/<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi)
    ].map(x => x[1]);

    for (const img of imagens) {
      const imagem = new URL(img, url).href;

      if (
        /\.(jpg|jpeg|png|webp)(\?|$)/i.test(imagem) &&
        !/logo|icon|favicon|banner|avatar/i.test(imagem)
      ) {
        return imagem;
      }
    }

    return "";
  } catch (erro) {
    console.log(`   ⚠️ Erro de acesso`);
    return "";
  }
}

(async () => {
  for (const id of [227, 231]) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) continue;

    console.log(`\n🔎 ${produto.nome}`);

    for (const fonte of fontes[id]) {
      console.log(`   Fonte: ${fonte}`);

      const imagem = await buscarImagem(fonte);

      if (imagem) {
        produto.imagem = imagem;
        console.log(`   ✅ IMAGEM ENCONTRADA`);
        console.log(`   ${imagem}`);
        break;
      }
    }

    if (!produto.imagem) {
      console.log(`   ❌ Nenhuma imagem encontrada.`);
    }
  }

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );

  console.log("\n==========================================");
  console.log(" IMAGENS — CORREÇÃO 07B");
  console.log("==========================================");

  for (const id of [226, 227, 231]) {
    const p = produtos.find(x => x.id === id);
    console.log(`${id} — ${p.nome}`);
    console.log(`IMG: ${p.imagem || "SEM IMAGEM"}`);
  }

  console.log("==========================================");
})();
