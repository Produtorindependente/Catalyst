const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-apresentacoes-ambiguas.json";

const produtos = JSON.parse(
  fs.readFileSync(ARQUIVO, "utf8")
);

function vazio(valor) {
  return (
    valor === undefined ||
    valor === null ||
    String(valor).trim() === ""
  );
}

function analisar(valor) {
  if (vazio(valor)) {
    return {
      status: "VAZIO"
    };
  }

  const original = String(valor).trim();
  const texto = original.toLowerCase();

  if (/^\d+(?:[.,]\d+)?$/.test(texto)) {
    return {
      status: "NUMERO_SEM_MEDIDA",
      original
    };
  }

  if (/^\d+(?:[.,]\d+)?\s*(kg|g|mg|l|ml)$/.test(texto)) {
    return {
      status: "MEDIDA_RECONHECIDA",
      original
    };
  }

  if (
    /^\d+(?:[.,]\d+)?\s*(unidade|unidades|embalagem|embalagens|sache|saches|sachê|sachês|frasco|frascos|pote|potes|cápsula|cápsulas|un|uds?)$/i.test(
      texto
    )
  ) {
    return {
      status: "APRESENTACAO_COMERCIAL",
      original
    };
  }

  if (
    /^(aprox\.?\s*)?\d+\s*(unidades?|uds?|un)$/i.test(texto)
  ) {
    return {
      status: "QUANTIDADE_UNIDADES",
      original
    };
  }

  return {
    status: "NAO_RECONHECIDO",
    original
  };
}

const ambiguos = [];

produtos.forEach((produto, indice) => {
  const peso = analisar(produto.peso);
  const unidade = analisar(produto.unidade);

  const problemaPeso =
    peso.status === "NUMERO_SEM_MEDIDA" ||
    peso.status === "NAO_RECONHECIDO";

  const problemaUnidade =
    unidade.status === "NUMERO_SEM_MEDIDA" ||
    unidade.status === "NAO_RECONHECIDO";

  if (problemaPeso || problemaUnidade) {
    ambiguos.push({
      indice,
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,

      peso_original: produto.peso,
      peso_status: peso.status,

      unidade_original: produto.unidade,
      unidade_status: unidade.status,

      codigo: produto.codigo
    });
  }
});

const relatorio = {
  resumo: {
    registros_ambigos: ambiguos.length
  },
  produtos: ambiguos
};

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — APRESENTAÇÕES AMBÍGUAS");
console.log("==========================================");
console.log("");
console.log(
  `📦 Registros analisados: ${produtos.length}`
);
console.log(
  `⚠️ Registros que precisam de revisão: ${ambiguos.length}`
);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
