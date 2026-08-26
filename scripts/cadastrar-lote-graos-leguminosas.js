const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ARQUIVO = "data/produtos.json";
const IMG_DIR = "assets/img/produtos";
const BACKUP = "data/produtos.backup_lote_graos_leguminosas.json";

const PRODUTOS = [
  {
    nome: "Espinheira Santa",
    descricao: "Espinheira Santa em folhas secas para preparo de chá ou infusão.",
    preco: 8.90,
    peso: 100,
    unidade: "g",
    categoria: "Chás",
    codigo: "327",
    aliases: ["espinheira santa", "espinheira-santa"],
    fonte:
      "https://www.armazemsaudavel.com.br/produtos-a-granel/chas/espinheira-santa-100g"
  },
  {
    nome: "Ervilha Verde Partida",
    descricao: "Ervilha verde partida para preparo de sopas, saladas e acompanhamentos.",
    preco: 1.69,
    peso: 100,
    unidade: "g",
    categoria: "Grãos e Leguminosas",
    codigo: "163",
    aliases: ["ervilha partida", "ervilha verde partida"],
    fonte:
      "https://jbjingredientes.com.br/produtos/ervilha-partida-canadense/"
  },
  {
    nome: "Lentilha Canadense",
    descricao: "Lentilha canadense para preparo de sopas, saladas e acompanhamentos.",
    preco: 3.70,
    peso: 100,
    unidade: "g",
    categoria: "Grãos e Leguminosas",
    codigo: "363",
    aliases: ["lentilha canadense"],
    fonte:
      "https://www.magnavita.com.br/products/lentilha-canadense-100g"
  },
  {
    nome: "Grão de Bico",
    descricao: "Grão de bico para preparo de saladas, sopas, homus e diversas receitas.",
    preco: 3.50,
    peso: 100,
    unidade: "g",
    categoria: "Grãos e Leguminosas",
    codigo: "361",
    aliases: ["grao de bico", "grão de bico"],
    fonte:
      "https://loja.emporiorufino.com.br/grao-de-bico-100g-a-granel"
  },
  {
    nome: "Proteína de Soja Clara",
    descricao: "Proteína texturizada de soja clara para preparo de receitas e substituição de carne.",
    preco: 3.50,
    peso: 100,
    unidade: "g",
    categoria: "Proteínas Vegetais",
    codigo: "252",
    aliases: [
      "proteina de soja clara",
      "proteína de soja clara",
      "proteína texturizada de soja clara",
      "pts clara"
    ],
    fonte:
      "https://www.banca13.com.br/produtos-naturais/produtos-a-granel/proteina-texturizada/proteina-texturizada-de-soja-clara-100g"
  },
  {
    nome: "Proteína de Soja Escura",
    descricao: "Proteína texturizada de soja escura para preparo de receitas e substituição de carne.",
    preco: 3.50,
    peso: 100,
    unidade: "g",
    categoria: "Proteínas Vegetais",
    codigo: "254",
    aliases: [
      "proteina de soja escura",
      "proteína de soja escura",
      "proteína texturizada de soja escura",
      "pts escura"
    ],
    fonte:
      "https://www.banca13.com.br/produtos-naturais/produtos-a-granel/proteina-texturizada/proteina-texturizada-de-soja-escura-100g"
  },
  {
    nome: "Bacon de Soja",
    descricao: "Bacon de soja em flocos para preparo de receitas e pratos vegetarianos.",
    preco: 6.60,
    peso: 100,
    unidade: "g",
    categoria: "Proteínas Vegetais",
    codigo: "145",
    aliases: [
      "bacon de soja",
      "bacon de soja em flocos",
      "pts sabor bacon"
    ],
    fonte:
      "https://www.charkprodutosnaturais.com.br/bacon-de-soja-granel"
  },
  {
    nome: "Feijão Preto",
    descricao: "Feijão preto para preparo de refeições, caldos e acompanhamentos.",
    preco: 1.20,
    peso: 100,
    unidade: "g",
    categoria: "Grãos e Leguminosas",
    codigo: "512",
    aliases: ["feijao preto", "feijão preto"],
    fonte:
      "https://loja.emporiorufino.com.br/feijao-preto-100g-a-granel"
  },
  {
    nome: "Feijão Branco",
    descricao: "Feijão branco para preparo de sopas, saladas, ensopados e acompanhamentos.",
    preco: 2.50,
    peso: 100,
    unidade: "g",
    categoria: "Grãos e Leguminosas",
    codigo: "104",
    aliases: ["feijao branco", "feijão branco"],
    fonte:
      "https://loja.emporiorufino.com.br/feijao-branco-100g-a-granel"
  }
];

function normalizar(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(valor) {
  return normalizar(valor).split(/\s+/).filter(Boolean);
}

function similaridade(a, b) {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));

  if (!A.size || !B.size) return 0;

  let iguais = 0;

  for (const t of A) {
    if (B.has(t)) iguais++;
  }

  return iguais / Math.max(A.size, B.size);
}

function encontrarExistente(produto, produtos) {
  const nomes = [
    produto.nome,
    ...(produto.aliases || [])
  ].map(normalizar);

  // 1 — nome/alias exato
  for (const atual of produtos) {
    const nomeAtual = normalizar(atual.nome);

    if (nomes.includes(nomeAtual)) {
      return atual;
    }

    const aliasesAtuais = Array.isArray(atual.aliases)
      ? atual.aliases.map(normalizar)
      : [];

    if (aliasesAtuais.some(a => nomes.includes(a))) {
      return atual;
    }
  }

  // 2 — código + nome parecido
  if (produto.codigo) {
    const candidatos = produtos.filter(
      p => String(p.codigo || "") === String(produto.codigo)
    );

    for (const candidato of candidatos) {
      if (similaridade(produto.nome, candidato.nome) >= 0.55) {
        return candidato;
      }
    }
  }

  return null;
}

function baixarImagem(url, destinoBase) {
  if (!url) return null;

  const temporario = `${destinoBase}.download`;

  try {
    const tipo = execFileSync(
      "curl",
      [
        "-k",
        "-L",
        "-sS",
        "--compressed",
        "--max-time",
        "30",
        "-A",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        "-o",
        temporario,
        "-w",
        "%{content_type}",
        url
      ],
      { encoding: "utf8" }
    ).trim().toLowerCase();

    if (!fs.existsSync(temporario)) {
      return null;
    }

    let extensao = ".jpg";

    if (tipo.includes("png")) extensao = ".png";
    else if (tipo.includes("webp")) extensao = ".webp";
    else if (tipo.includes("jpeg") || tipo.includes("jpg")) extensao = ".jpg";

    const destino = `${destinoBase}${extensao}`;

    fs.renameSync(temporario, destino);

    return destino;
  } catch (erro) {
    try {
      if (fs.existsSync(temporario)) fs.unlinkSync(temporario);
    } catch {}

    return null;
  }
}

function extrairImagemDaPagina(url) {
  try {
    const html = execFileSync(
      "curl",
      [
        "-k",
        "-L",
        "-sS",
        "--compressed",
        "--max-time",
        "30",
        "-A",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
        url
      ],
      { encoding: "utf8", maxBuffer: 15 * 1024 * 1024 }
    );

    const padroes = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
    ];

    for (const regex of padroes) {
      const match = html.match(regex);

      if (match && match[1]) {
        return new URL(
          match[1]
            .replace(/&amp;/g, "&")
            .replace(/&#x2F;/g, "/"),
          url
        ).href;
      }
    }

    // Fallback: primeira imagem relativamente grande encontrada
    const imagens = [
      ...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)
    ];

    for (const match of imagens) {
      const src = match[1];

      if (
        !src ||
        src.startsWith("data:") ||
        src.includes("logo") ||
        src.includes("icon") ||
        src.includes("avatar")
      ) {
        continue;
      }

      try {
        return new URL(src, url).href;
      } catch {}
    }

    return null;
  } catch {
    return null;
  }
}

function obterProximoId(produtos) {
  const ids = produtos
    .map(p => Number(p.id))
    .filter(Number.isFinite);

  return ids.length ? Math.max(...ids) + 1 : 1;
}

if (!fs.existsSync(ARQUIVO)) {
  console.error("❌ data/produtos.json não encontrado.");
  process.exit(1);
}

if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

if (!Array.isArray(produtos)) {
  console.error("❌ data/produtos.json não contém um array.");
  process.exit(1);
}

// BACKUP
fs.copyFileSync(ARQUIVO, BACKUP);

let proximoId = obterProximoId(produtos);

let inseridos = 0;
let existentes = 0;
let atualizados = 0;
let imagensBaixadas = 0;
let imagensPendentes = 0;

console.log("");
console.log("==============================================");
console.log(" CATALYST — LOTE GRÃOS / LEGUMINOSAS");
console.log("==============================================");
console.log("");

for (const item of PRODUTOS) {
  console.log(`🔎 ${item.nome}`);

  let produto = encontrarExistente(item, produtos);
  let novo = false;

  if (!produto) {
    produto = {
      id: proximoId++,
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco,
      destaque: false,
      peso: item.peso,
      unidade: item.unidade,
      categoria: item.categoria,
      codigo: item.codigo,
      imagem: null,
      aliases: item.aliases,
      imagem_fonte: item.fonte
    };

    produtos.push(produto);

    inseridos++;
    novo = true;

    console.log(`   ➕ NOVO — ID ${produto.id}`);
  } else {
    existentes++;

    console.log(`   ♻️ JÁ EXISTE — ID ${produto.id}`);

    // Atualiza preço somente se a foto trouxer preço diferente.
    if (
      typeof item.preco === "number" &&
      Number(produto.preco) !== item.preco
    ) {
      produto.precoAnterior = produto.preco;
      produto.preco = item.preco;
      atualizados++;

      console.log(
        `   💰 PREÇO ATUALIZADO: R$ ${Number(produto.precoAnterior).toFixed(2)} → R$ ${item.preco.toFixed(2)}`
      );
    }

    // Completa código se estiver vazio.
    if (!produto.codigo && item.codigo) {
      produto.codigo = item.codigo;
    }

    // Junta aliases sem apagar os antigos.
    const aliasesExistentes = Array.isArray(produto.aliases)
      ? produto.aliases
      : [];

    produto.aliases = [
      ...new Set([
        ...aliasesExistentes,
        ...item.aliases
      ])
    ];

    if (!produto.imagem_fonte) {
      produto.imagem_fonte = item.fonte;
    }
  }

  // IMAGEM
  if (!produto.imagem) {
    console.log("   🖼️ Procurando imagem comercial...");

    const imagemRemota = extrairImagemDaPagina(item.fonte);

    if (imagemRemota) {
      const base = path.join(
        IMG_DIR,
        `produto-${produto.id}`
      );

      const imagemLocal = baixarImagem(
        imagemRemota,
        base
      );

      if (imagemLocal) {
        produto.imagem = imagemLocal.replace(/\\/g, "/");
        imagensBaixadas++;

        console.log(`   ✅ IMAGEM SALVA: ${produto.imagem}`);
      } else {
        imagensPendentes++;
        console.log("   ⚠️ Imagem localizada, mas download falhou.");
      }
    } else {
      imagensPendentes++;
      console.log("   ⚠️ Imagem comercial não localizada.");
    }
  } else {
    console.log("   🖼️ Imagem já existente — preservada.");
  }

  console.log("");
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2) + "\n",
  "utf8"
);

console.log("==============================================");
console.log(" CATALYST — LOTE FINALIZADO");
console.log("==============================================");
console.log(`➕ Produtos novos: ${inseridos}`);
console.log(`♻️ Já existentes: ${existentes}`);
console.log(`💰 Preços atualizados: ${atualizados}`);
console.log(`🖼️ Imagens comerciais baixadas: ${imagensBaixadas}`);
console.log(`⚠️ Imagens pendentes: ${imagensPendentes}`);
console.log(`📦 TOTAL NO CATÁLOGO: ${produtos.length}`);
console.log(`🛡️ Backup: ${BACKUP}`);
console.log(`📄 JSON: ${ARQUIVO}`);
console.log("==============================================");
