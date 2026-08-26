const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-normalizacao-medidas.json";

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

function interpretarPeso(valor) {
  if (vazio(valor)) {
    return null;
  }

  const texto = String(valor)
    .trim()
    .toLowerCase()
    .replace(",", ".");

  const match = texto.match(
    /^(\d+(?:\.\d+)?)\s*(kg|g|mg|l|ml)$/
  );

  if (match) {
    return {
      quantidade: Number(match[1]),
      medida: match[2]
    };
  }

  if (/^\d+(?:\.\d+)?$/.test(texto)) {
    return {
      quantidade: Number(texto),
      medida: null
    };
  }

  return {
    quantidade: null,
    medida: null,
    original: texto
  };
}

function interpretarUnidade(valor) {
  if (vazio(valor)) {
    return null;
  }

  const texto = String(valor)
    .trim()
    .toLowerCase();

  const match = texto.match(
    /^(\d+)?\s*(unidade|unidades|embalagem|embalagens|sachê|sachês|frasco|frascos|pote|potes|cápsula|cápsulas|un|uds?)$/
  );

  if (match) {
    return {
      quantidade: match[1]
        ? Number(match[1])
        : 1,
      tipo: match[2]
    };
  }

  const medida = texto.match(
    /^(\d+(?:[.,]\d+)?)\s*(g|kg|mg|ml|l)$/
  );

  if (medida) {
    return {
      quantidade: Number(
        medida[1].replace(",", ".")
      ),
      tipo: medida[2]
    };
  }

  return {
    quantidade: null,
    tipo: null,
    original: texto
  };
}

const relatorio = {
  resumo: {
    registros_analisados: produtos.length,
    pesos_interpretados: 0,
    pesos_numericos_sem_medida: 0,
    unidades_comerciais: 0,
    unidades_medida: 0,
    formatos_nao_reconhecidos: 0
  },

  produtos: []
};

produtos.forEach((produto, indice) => {
  const peso = interpretarPeso(produto.peso);
  const unidade = interpretarUnidade(produto.unidade);

  if (peso) {
    if (peso.medida) {
      relatorio.resumo.pesos_interpretados++;
    } else if (
      peso.quantidade !== null &&
      !peso.original
    ) {
      relatorio.resumo.pesos_numericos_sem_medida++;
    } else if (peso.original) {
      relatorio.resumo.formatos_nao_reconhecidos++;
    }
  }

  if (unidade) {
    if (
      unidade.tipo &&
      ["g", "kg", "mg", "ml", "l"].includes(
        unidade.tipo
      )
    ) {
      relatorio.resumo.unidades_medida++;
    } else if (unidade.tipo) {
      relatorio.resumo.unidades_comerciais++;
    } else if (unidade.original) {
      relatorio.resumo.formatos_nao_reconhecidos++;
    }
  }

  relatorio.produtos.push({
    indice,
    id: produto.id,
    nome: produto.nome,
    peso_original: produto.peso,
    unidade_original: produto.unidade,
    peso_interpretado: peso,
    unidade_interpretada: unidade
  });
});

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — NORMALIZAÇÃO DE MEDIDAS");
console.log("==========================================");
console.log("");
console.log(
  `📦 Registros analisados: ${produtos.length}`
);
console.log(
  `⚖️ Pesos interpretados: ${relatorio.resumo.pesos_interpretados}`
);
console.log(
  `🔢 Pesos numéricos sem medida: ${relatorio.resumo.pesos_numericos_sem_medida}`
);
console.log(
  `📦 Unidades comerciais: ${relatorio.resumo.unidades_comerciais}`
);
console.log(
  `⚖️ Unidades com medida: ${relatorio.resumo.unidades_medida}`
);
console.log(
  `❔ Formatos não reconhecidos: ${relatorio.resumo.formatos_nao_reconhecidos}`
);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
