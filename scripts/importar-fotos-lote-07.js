const fs = require("fs");
const path = require("path");

const ARQUIVO = "data/produtos.json";
const PASTA_IMAGENS = "assets/img";

const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const novosProdutos = [
  {
    nome: "Boldo do Chile — Embalagem 100 g",
    aliases: ["Boldo do Chile", "Boldo-do-Chile", "Peumus boldus", "Boldo 100 g"],
    descricao: "Boldo do Chile em folhas, apresentado em embalagem de 100 g.",
    preco: 13.5,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Chás",
    codigo: "232",
    imagemFonte: "https://loja.emporiorufino.com.br/boldo-do-chile-100g-a-granel"
  },
  {
    nome: "Urtiga Folha — Embalagem 100 g",
    aliases: ["Urtiga", "Urtiga Folha", "Urtiga Folhas", "Urtica dioica", "Urtiga 100 g"],
    descricao: "Urtiga em folhas desidratadas, apresentada em embalagem de 100 g.",
    preco: 14,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Chás",
    codigo: "",
    imagemFonte: "https://www.magazineluiza.com.br/cha-de-urtiga-urtica-dioica-importado-e-organico-100g-medicina-natural/p/cfcjdde894/me/chha/",
    pendencia: "Preço da nova apresentação não está legível na foto; R$ 14,00 herdado provisoriamente do cadastro atual."
  },
  {
    nome: "Albumina — Clara de Ovo",
    aliases: ["Albumina", "Clara de Ovo em Pó", "Albumina Clara de Ovo", "Albumina 100 g"],
    descricao: "Albumina em pó obtida da clara de ovo desidratada.",
    preco: 18.9,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Suplementos",
    codigo: "127",
    imagemFonte: "https://www.malaguetaprodutosnaturais.com.br/albumina-clara-de-ovo-em-po-100g"
  },
  {
    nome: "Quinua em Flocos",
    aliases: ["Quinoa em Flocos", "Quinua Flocos", "Quinoa Flocos", "Quinua 100 g"],
    descricao: "Quinua em flocos, apresentada em embalagem de 100 g.",
    preco: 5.69,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Grãos e Cereais",
    codigo: "279",
    imagemFonte: "https://www.banca12.com.br/a-granel/farinhas-flocos-e-farelos/quinoa-em-flocos-100g"
  },
  {
    nome: "Ovo-Albumina em Pó",
    aliases: ["Ovo Albumina", "Ovo-Albumina", "Albumina em Pó", "Clara de Ovo em Pó"],
    descricao: "Ovo-albumina em pó, apresentada em embalagem de 100 g.",
    preco: 19.99,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Suplementos",
    codigo: "479",
    imagemFonte: "https://www.dongrano.com.br/albumina-clara-de-ovo-em-po-granel"
  },
  {
    nome: "Gérmen de Trigo",
    aliases: ["Germen de Trigo", "Gérmen de Trigo 100 g", "Germen de Trigo 100 g"],
    descricao: "Gérmen de trigo apresentado em embalagem de 100 g.",
    preco: 2.1,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Grãos e Cereais",
    codigo: "356",
    imagemFonte: "https://www.bancadoramon.com.br/germen-de-trigo"
  },
  {
    nome: "Feno Grego — Grãos",
    aliases: ["Feno Grego", "Feno-Grego", "Trigonella foenum-graecum", "Feno Grego em Grãos"],
    descricao: "Feno-grego em grãos, apresentado em embalagem de 100 g.",
    preco: 9.5,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Grãos e Sementes",
    codigo: "605",
    imagemFonte: "https://www.malaguetaprodutosnaturais.com.br/feno-grego-em-graos-100g"
  },
  {
    nome: "Glutamina",
    aliases: ["Glutamina em Pó", "L-Glutamina", "Glutamina 100 g"],
    descricao: "Glutamina em pó apresentada em embalagem de 100 g.",
    preco: 14.9,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Suplementos",
    codigo: "407",
    imagemFonte: "https://www.estacaodosgraos.com.br/glutamina-granel-preco-100g-onde-comprar-zonacerealista-encontrar-achar-valor-preco-informacao-nutricional.html"
  },
  {
    nome: "Farinha de Semente de Abóbora — Sem Casca",
    aliases: ["Farinha de Semente de Abóbora", "Semente de Abóbora sem Casca em Pó", "Farinha de Abóbora"],
    descricao: "Farinha de semente de abóbora sem casca, apresentada em embalagem de 100 g.",
    preco: 12,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Farinhas e Pós",
    codigo: "802",
    imagemFonte: "https://www.cadiquimgranel.com.br/8-farinhas/farinha-de-semente-de-abobora-100g"
  },
  {
    nome: "Semente de Abóbora em Pó",
    aliases: ["Semente de Abóbora em Pó", "Farinha de Semente de Abóbora", "Abóbora em Pó"],
    descricao: "Semente de abóbora em pó apresentada em embalagem de 100 g.",
    preco: 8.1,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Farinhas e Pós",
    codigo: "801",
    imagemFonte: "https://www.emporiodaterra.com/semente-de-abobora-em-po-kg"
  },
  {
    nome: "Farinha de Batata-Doce",
    aliases: ["Farinha de Batata Doce", "Batata Doce em Pó", "Farinha de Batata-Doce 100 g"],
    descricao: "Farinha de batata-doce apresentada em embalagem de 100 g.",
    preco: 2.9,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Farinhas",
    codigo: "333",
    imagemFonte: "https://www.ervadoceerva.com.br/a-granel/farinha-de-batata-doce-100g-a-granel",
    imagemFallback: "https://acdn-us.mitiendanube.com/stores/004/851/893/products/farinha-batata-doce-2-279fd0d87e6587ad2c17562307915876-1024-1024.webp"
  },
  {
    nome: "Farinha de Arroz Integral",
    aliases: ["Farinha Integral de Arroz", "Farinha de Arroz Integral 100 g", "Arroz Integral em Farinha"],
    descricao: "Farinha de arroz integral apresentada em embalagem de 100 g.",
    preco: 4.4,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Farinhas",
    codigo: "768",
    imagemFonte: "https://www.estacaodosgraos.com.br/farinha-de-arroz-integral.html",
    imagemFallback: "https://down-br.img.susercontent.com/file/sg-11134201-7rdwo-m006npzm3fnb73"
  },
  {
    nome: "Fécula de Mandioca",
    aliases: ["Fécula de Mandioca", "Polvilho Doce", "Amido de Mandioca"],
    descricao: "Fécula de mandioca apresentada em embalagem de 100 g.",
    preco: 2.9,
    marca: "",
    peso: "100 g",
    unidade: "1 embalagem",
    categoria: "Farinhas",
    codigo: "184",
    imagemFonte: "https://www.emporiostarita.com.br/produtos/fecula-de-mandioca/"
  }
];

function slug(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function descobrirImagem(url, fallback) {
  if (fallback) return fallback;

  try {
    const resposta = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 Catalyst Catalog Bot"
      }
    });

    if (!resposta.ok) {
      console.log(`⚠️ Não foi possível acessar fonte da imagem: ${url}`);
      return "";
    }

    const html = await resposta.text();

    const encontrados = [
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i),
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i),
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i),
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)
    ];

    for (const resultado of encontrados) {
      if (resultado && resultado[1]) {
        return new URL(resultado[1], url).href;
      }
    }

    console.log(`⚠️ Fonte encontrada, mas imagem direta não identificada: ${url}`);
    return "";
  } catch (erro) {
    console.log(`⚠️ Erro ao buscar imagem: ${url}`);
    return "";
  }
}

(async () => {
  const idsExistentes = produtos
    .map(p => p.id)
    .filter(id => Number.isInteger(id));

  let proximoId = Math.max(...idsExistentes, 0) + 1;

  let adicionados = 0;
  let ignorados = 0;

  for (const item of novosProdutos) {
    const codigoJaExiste = item.codigo &&
      produtos.some(p => String(p.codigo || "") === String(item.codigo));

    const nomeExatoExiste = produtos.some(
      p => String(p.nome || "").toLowerCase() === item.nome.toLowerCase()
    );

    if (codigoJaExiste || nomeExatoExiste) {
      console.log(`⏭️ Já existe, não duplicado automaticamente: ${item.nome}`);
      ignorados++;
      continue;
    }

    const imagem = await descobrirImagem(
      item.imagemFonte,
      item.imagemFallback
    );

    const novo = {
      id: proximoId++,
      nome: item.nome,
      descricao: item.descricao,
      preco: item.preco,
      precoAnterior: null,
      destaque: false,
      marca: item.marca,
      peso: item.peso,
      unidade: item.unidade,
      categoria: item.categoria,
      codigo: item.codigo,
      imagem,
      aliases: item.aliases
    };

    produtos.push(novo);

    console.log(`✅ Produto adicionado: ${item.nome}`);
    console.log(`   ID: ${novo.id} | Código: ${novo.codigo || "—"} | R$ ${novo.preco.toFixed(2)}`);

    if (item.pendencia) {
      console.log(`   ⚠️ PENDÊNCIA: ${item.pendencia}`);
    }

    if (!imagem) {
      console.log(`   ⚠️ IMAGEM: não foi encontrada automaticamente.`);
    }

    adicionados++;
  }

  fs.writeFileSync(
    ARQUIVO,
    JSON.stringify(produtos, null, 2) + "\n",
    "utf8"
  );

  console.log("\n==========================================");
  console.log("   LOTE 07 — APRESENTAÇÕES + PRODUTOS");
  console.log("==========================================");
  console.log(`Processados: ${novosProdutos.length}`);
  console.log(`Novos adicionados: ${adicionados}`);
  console.log(`Já existentes/ignorados: ${ignorados}`);
  console.log(`TOTAL NO CATÁLOGO: ${produtos.length}`);
  console.log("==========================================");
})();
