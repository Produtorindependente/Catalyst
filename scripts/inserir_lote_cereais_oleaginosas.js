const fs = require("fs");
const path = require("path");

const ARQUIVO = "data/produtos.json";
const BACKUP = "data/produtos.backup_lote_cereais_oleaginosas.json";
const IMG_DIR = "assets/img/produtos";

const novosProdutos = [
  {
    nome: "Feijão Fradinho",
    preco: 1.50,
    codigo: "110"
  },
  {
    nome: "Milho Mostarda e Mel",
    preco: 8.50,
    codigo: "157"
  },
  {
    nome: "Ervilha c/ Wasabi",
    preco: 6.90,
    codigo: "793"
  },
  {
    nome: "Amendoim com Sal e com Pele",
    preco: 3.00,
    codigo: "22"
  },
  {
    nome: "Amendoim Cru c/ Pele",
    preco: 2.90,
    codigo: "1091"
  },
  {
    nome: "Amendoim com Sal",
    preco: 3.10,
    codigo: "23"
  },
  {
    nome: "Amendoim Sem Sal",
    preco: 3.10,
    codigo: "21"
  },
  {
    nome: "Amêndoa Defumada",
    preco: 12.90,
    codigo: "10"
  },
  {
    nome: "Amêndoa Torrada c/ Sal",
    preco: 13.00,
    codigo: "15"
  },
  {
    nome: "Amêndoa Torrada s/ Sal",
    preco: 12.90,
    codigo: "112"
  }
];

// ============================================================
// FUNÇÕES
// ============================================================

function normalizar(txt) {
  return String(txt || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function encontrarChave(obj, possibilidades) {
  for (const chave of possibilidades) {
    if (Object.prototype.hasOwnProperty.call(obj, chave)) {
      return chave;
    }
  }
  return null;
}

function maiorId(produtos) {
  return produtos.reduce((maior, p) => {
    const id = Number(p.id);
    return Number.isFinite(id) && id > maior ? id : maior;
  }, 0);
}

function definirSeExiste(obj, chaves, valor) {
  const chave = encontrarChave(obj, chaves);
  if (chave) obj[chave] = valor;
}

function slug(txt) {
  return normalizar(txt).replace(/\s+/g, "-");
}

// ============================================================
// LEITURA
// ============================================================

if (!fs.existsSync(ARQUIVO)) {
  throw new Error(`❌ Arquivo não encontrado: ${ARQUIVO}`);
}

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

if (!Array.isArray(produtos)) {
  throw new Error("❌ produtos.json não contém um array.");
}

// ============================================================
// BACKUP
// ============================================================

fs.writeFileSync(
  BACKUP,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("");
console.log("==============================================");
console.log(" CATALYST — LOTE CEREAIS / OLEAGINOSAS");
console.log("==============================================");
console.log(`Backup criado: ${BACKUP}`);
console.log("");

// ============================================================
// MODELO
// ============================================================

const modelo = produtos[produtos.length - 1];

if (!modelo) {
  throw new Error("❌ Não existe nenhum produto para usar como modelo.");
}

let proximoId = maiorId(produtos) + 1;

let inseridos = 0;
let duplicados = 0;

// ============================================================
// INSERÇÃO
// ============================================================

for (const item of novosProdutos) {

  const nomeNormalizado = normalizar(item.nome);

  const duplicado = produtos.some(p => {
    const nomeExistente =
      encontrarChave(p, ["nome", "produto", "titulo", "name"]);

    if (!nomeExistente) return false;

    return normalizar(p[nomeExistente]) === nomeNormalizado;
  });

  if (duplicado) {
    console.log(`SKIP duplicado: ${item.nome}`);
    duplicados++;
    continue;
  }

  const novo = JSON.parse(JSON.stringify(modelo));

  // ----------------------------------------------------------
  // ID
  // ----------------------------------------------------------

  novo.id = proximoId++;

  // ----------------------------------------------------------
  // NOME
  // ----------------------------------------------------------

  definirSeExiste(
    novo,
    ["nome", "produto", "titulo", "name"],
    item.nome
  );

  // ----------------------------------------------------------
  // PREÇO
  // ----------------------------------------------------------

  definirSeExiste(
    novo,
    ["preco", "preço", "valor", "price"],
    item.preco
  );

  // ----------------------------------------------------------
  // CÓDIGO / SKU
  // ----------------------------------------------------------

  definirSeExiste(
    novo,
    ["codigo", "código", "sku", "cod", "code"],
    item.codigo
  );

  // ----------------------------------------------------------
  // PESO / APRESENTAÇÃO
  // ----------------------------------------------------------

  definirSeExiste(
    novo,
    ["peso", "peso_g", "gramas", "quantidade", "apresentacao", "apresentação"],
    "100g"
  );

  // ----------------------------------------------------------
  // CATEGORIA
  // ----------------------------------------------------------

  definirSeExiste(
    novo,
    ["categoria", "category"],
    "Grãos e Oleaginosas"
  );

  // ----------------------------------------------------------
  // VALIDADE
  // ----------------------------------------------------------
  // INTENCIONALMENTE NÃO INSERIMOS VALIDADE.
  // O catálogo não utilizará mais essa informação.

  const chaveValidade = encontrarChave(
    novo,
    ["validade", "vencimento", "data_validade", "dataValidade"]
  );

  if (chaveValidade) {
    delete novo[chaveValidade];
  }

  // ----------------------------------------------------------
  // IMAGEM
  // ----------------------------------------------------------
  // Não inventamos imagem.
  // O produto entra no catálogo mesmo que a imagem comercial
  // ainda não tenha sido localizada.

  const chaveImagem = encontrarChave(
    novo,
    ["imagem", "image", "foto", "img"]
  );

  if (chaveImagem) {
    novo[chaveImagem] = "";
  }

  produtos.push(novo);

  console.log(
    `OK: ${item.nome} | R$ ${item.preco.toFixed(2)} | código ${item.codigo} | ID ${novo.id}`
  );

  inseridos++;
}

// ============================================================
// SALVAR
// ============================================================

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

// ============================================================
// RESULTADO
// ============================================================

console.log("");
console.log("==============================================");
console.log(" CATALYST — LOTE CONCLUÍDO");
console.log("==============================================");
console.log(`Inseridos: ${inseridos}`);
console.log(`Duplicados ignorados: ${duplicados}`);
console.log(`Total no catálogo agora: ${produtos.length}`);
console.log(`Backup: ${BACKUP}`);
console.log(`JSON: ${ARQUIVO}`);
console.log("==============================================");
console.log("");

