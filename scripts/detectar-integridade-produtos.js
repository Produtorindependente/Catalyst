const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const SAIDA = "data/relatorio-integridade-produtos.json";

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

function numeroValido(valor) {
  return (
    valor !== undefined &&
    valor !== null &&
    valor !== "" &&
    Number.isFinite(Number(valor))
  );
}

function imagemValida(valor) {
  if (vazio(valor)) return false;

  const texto = String(valor).trim();

  return (
    texto.startsWith("http://") ||
    texto.startsWith("https://") ||
    texto.startsWith("assets/")
  );
}

function urlExterna(valor) {
  if (vazio(valor)) return false;

  const texto = String(valor).trim();

  return (
    texto.startsWith("http://") ||
    texto.startsWith("https://")
  );
}

const relatorio = {
  resumo: {
    registros_analisados: produtos.length,
    sem_nome: 0,
    sem_categoria: 0,
    sem_preco: 0,
    sem_peso: 0,
    sem_unidade: 0,
    sem_codigo: 0,
    sem_imagem: 0,
    imagens_locais: 0,
    imagens_externas: 0,
    precos_invalidos: 0,
    pesos_invalidos: 0
  },

  problemas: {
    sem_nome: [],
    sem_categoria: [],
    sem_preco: [],
    sem_peso: [],
    sem_unidade: [],
    sem_codigo: [],
    sem_imagem: [],
    imagens_locais: [],
    imagens_externas: [],
    precos_invalidos: [],
    pesos_invalidos: []
  }
};

produtos.forEach((produto, indice) => {
  const item = {
    indice,
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    preco: produto.preco,
    peso: produto.peso,
    unidade: produto.unidade,
    codigo: produto.codigo,
    imagem: produto.imagem
  };

  if (vazio(produto.nome)) {
    relatorio.resumo.sem_nome++;
    relatorio.problemas.sem_nome.push(item);
  }

  if (vazio(produto.categoria)) {
    relatorio.resumo.sem_categoria++;
    relatorio.problemas.sem_categoria.push(item);
  }

  if (!numeroValido(produto.preco)) {
    relatorio.resumo.sem_preco++;
    relatorio.problemas.sem_preco.push(item);
  }

  if (vazio(produto.peso)) {
    relatorio.resumo.sem_peso++;
    relatorio.problemas.sem_peso.push(item);
  }

  if (vazio(produto.unidade)) {
    relatorio.resumo.sem_unidade++;
    relatorio.problemas.sem_unidade.push(item);
  }

  if (vazio(produto.codigo)) {
    relatorio.resumo.sem_codigo++;
    relatorio.problemas.sem_codigo.push(item);
  }

  if (!imagemValida(produto.imagem)) {
    relatorio.resumo.sem_imagem++;
    relatorio.problemas.sem_imagem.push(item);
  } else if (String(produto.imagem).trim().startsWith("assets/")) {
    relatorio.resumo.imagens_locais++;
    relatorio.problemas.imagens_locais.push(item);
  } else if (urlExterna(produto.imagem)) {
    relatorio.resumo.imagens_externas++;
    relatorio.problemas.imagens_externas.push(item);
  }

  if (
    produto.preco !== undefined &&
    produto.preco !== null &&
    produto.preco !== "" &&
    !numeroValido(produto.preco)
  ) {
    relatorio.resumo.precos_invalidos++;
    relatorio.problemas.precos_invalidos.push(item);
  }

  if (
    produto.peso !== undefined &&
    produto.peso !== null &&
    produto.peso !== "" &&
    typeof produto.peso === "string" &&
    produto.peso.trim() === ""
  ) {
    relatorio.resumo.pesos_invalidos++;
    relatorio.problemas.pesos_invalidos.push(item);
  }
});

fs.writeFileSync(
  SAIDA,
  JSON.stringify(relatorio, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" CATALYST — INTEGRIDADE DOS PRODUTOS");
console.log("==========================================");
console.log("");
console.log(`📦 Registros analisados: ${produtos.length}`);
console.log("");
console.log(`❔ Sem nome:       ${relatorio.resumo.sem_nome}`);
console.log(`❔ Sem categoria:  ${relatorio.resumo.sem_categoria}`);
console.log(`❔ Sem preço:      ${relatorio.resumo.sem_preco}`);
console.log(`❔ Sem peso:       ${relatorio.resumo.sem_peso}`);
console.log(`❔ Sem unidade:    ${relatorio.resumo.sem_unidade}`);
console.log(`❔ Sem código:     ${relatorio.resumo.sem_codigo}`);
console.log(`❔ Sem imagem:     ${relatorio.resumo.sem_imagem}`);
console.log("");
console.log(`🖼️ Imagens locais:   ${relatorio.resumo.imagens_locais}`);
console.log(`🌐 Imagens externas: ${relatorio.resumo.imagens_externas}`);
console.log("");
console.log(`💰 Preços inválidos: ${relatorio.resumo.precos_invalidos}`);
console.log(`⚖️ Pesos inválidos:  ${relatorio.resumo.pesos_invalidos}`);
console.log("");
console.log(`📄 Relatório: ${SAIDA}`);
console.log("");
console.log("⚠️ Nenhum produto foi alterado.");
console.log("==========================================");
