const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const BACKUP = "data/produtos.backup_pre_reorganizacao.json";
const INVENTARIO = "data/inventario-pre-reorganizacao.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

// ============================================================
// BACKUP
// ============================================================

fs.copyFileSync(ARQUIVO, BACKUP);

// ============================================================
// ANÁLISE
// ============================================================

const categorias = {};
const ids = new Map();
const semId = [];
const semNome = [];
const semCategoria = [];
const semPreco = [];
const semImagem = [];
const duplicadosId = [];

produtos.forEach((produto, indice) => {

  const categoria =
    produto.categoria ||
    "(SEM CATEGORIA)";

  categorias[categoria] =
    (categorias[categoria] || 0) + 1;

  const id = Number(produto.id);

  if (
    produto.id === undefined ||
    produto.id === null ||
    produto.id === "" ||
    !Number.isFinite(id)
  ) {
    semId.push({
      indice,
      nome: produto.nome || null,
      categoria,
      produto
    });
  } else {

    if (ids.has(id)) {

      duplicadosId.push({
        id,
        primeiroIndice: ids.get(id),
        segundoIndice: indice,
        nome: produto.nome || null
      });

    } else {

      ids.set(id, indice);

    }
  }

  if (!produto.nome || !String(produto.nome).trim()) {
    semNome.push({
      indice,
      produto
    });
  }

  if (!produto.categoria || !String(produto.categoria).trim()) {
    semCategoria.push({
      indice,
      nome: produto.nome || null
    });
  }

  if (
    produto.preco === undefined ||
    produto.preco === null ||
    produto.preco === ""
  ) {
    semPreco.push({
      indice,
      id: produto.id ?? null,
      nome: produto.nome || null
    });
  }

  if (!produto.imagem || !String(produto.imagem).trim()) {
    semImagem.push({
      indice,
      id: produto.id ?? null,
      nome: produto.nome || null,
      categoria
    });
  }

});

// ============================================================
// INVENTÁRIO COMPLETO
// ============================================================

const inventario = {
  dataAuditoria: new Date().toISOString(),

  totalRegistros: produtos.length,

  idsNumericosValidos: ids.size,

  idsSemValorValido: semId.length,

  idsDuplicados: duplicadosId.length,

  nomesAusentes: semNome.length,

  categoriasAusentes: semCategoria.length,

  precosAusentes: semPreco.length,

  imagensAusentes: semImagem.length,

  categorias,

  produtosSemId: semId,

  produtosSemNome: semNome,

  produtosSemCategoria: semCategoria,

  produtosSemPreco: semPreco,

  produtosSemImagem: semImagem,

  idsDuplicadosDetalhes: duplicadosId

};

fs.writeFileSync(
  INVENTARIO,
  JSON.stringify(inventario, null, 2) + "\n",
  "utf8"
);

// ============================================================
// RELATÓRIO
// ============================================================

console.log("");
console.log("==========================================");
console.log(" CATALYST — AUDITORIA PRÉ-REORGANIZAÇÃO");
console.log("==========================================");

console.log("");
console.log("📦 TOTAL DE REGISTROS:", produtos.length);
console.log("🔢 IDS NUMÉRICOS VÁLIDOS:", ids.size);
console.log("⚠️ REGISTROS SEM ID VÁLIDO:", semId.length);
console.log("⚠️ IDS DUPLICADOS:", duplicadosId.length);
console.log("⚠️ SEM NOME:", semNome.length);
console.log("⚠️ SEM CATEGORIA:", semCategoria.length);
console.log("⚠️ SEM PREÇO:", semPreco.length);
console.log("⚠️ SEM IMAGEM:", semImagem.length);

console.log("");
console.log("📁 BACKUP:");
console.log(BACKUP);

console.log("");
console.log("📋 INVENTÁRIO:");
console.log(INVENTARIO);

console.log("");
console.log("==========================================");
console.log(" AUDITORIA CONCLUÍDA");
console.log(" NENHUM PRODUTO FOI ALTERADO");
console.log("==========================================");
