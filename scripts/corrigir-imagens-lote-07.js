const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const fontes = {
  226: "https://www.lojabemnatural.com.br/Boldo-do-Chile-100g",
  227: "https://www.mercadolivre.com.br/cha-de-urtiga-urtiga-dioica-l-100-natural-100g/up/MLBU797677683",
  231: "https://www.bancadoramon.com.br/germen-de-trigo"
};

async function buscarImagem(url) {
  try {
    const resposta = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36"
      }
    });

    if (!resposta.ok) {
      console.log(`❌ HTTP ${resposta.status}: ${url}`);
      return "";
    }

    const html = await resposta.text();

    const padroes = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+property=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']twitter:image["']/i
    ];

    for (const regex of padroes) {
      const resultado = html.match(regex);

      if (resultado && resultado[1]) {
        return new URL(resultado[1], url).href;
      }
    }

    // Procura imagens comuns dentro do HTML
    const imagens = [
      ...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)
    ].map(x => x[1]);

    for (const img of imagens) {
      const urlImagem = new URL(img, url).href;

      if (
        /\.(jpg|jpeg|png|webp)(\?|$)/i.test(urlImagem) &&
        !/logo|icon|banner|avatar|favicon/i.test(urlImagem)
      ) {
        return urlImagem;
      }
    }

    return "";
  } catch (erro) {
    console.log(`❌ Erro ao acessar: ${url}`);
    return "";
  }
}

(async () => {
  for (const [id, fonte] of Object.entries(fontes)) {
    const produto = produtos.find(p => p.id === Number(id));

    if (!produto) {
      console.log(`❌ Produto ID ${id} não encontrado.`);
      continue;
    }

    console.log(`\n🔎 Procurando imagem: ${produto.nome}`);

    const imagem = await buscarImagem(fonte);

    if (imagem) {
      produto.imagem = imagem;

      console.log(`✅ IMAGEM ENCONTRADA`);
      console.log(imagem);
    } else {
      console.log(`⚠️ Não foi possível encontrar imagem direta.`);
    }
  }

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );

  console.log("\n==========================================");
  console.log(" IMAGENS — LOTE 07");
  console.log("==========================================");

  for (const id of [226, 227, 231]) {
    const produto = produtos.find(p => p.id === id);
    console.log(`${id} — ${produto.nome}`);
    console.log(`IMG: ${produto.imagem || "SEM IMAGEM"}`);
  }

  console.log("==========================================");
})();
