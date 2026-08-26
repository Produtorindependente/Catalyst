const fs = require("fs");

const ARQUIVO_JSON = "data/produtos.json";
const ARQUIVO_HTML = "compacta.html";
const ARQUIVO_CSS = "compacta.css";
const ARQUIVO_JS = "compacta.js";

if (!fs.existsSync(ARQUIVO_JSON)) {
  console.error("❌ data/produtos.json não encontrado.");
  process.exit(1);
}

// ============================================================
// COMPACTA.HTML
// ============================================================

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Cantinho Bom — Catálogo</title>

  <link rel="stylesheet" href="compacta.css">
</head>

<body>

  <header class="topo">

    <div class="topo-inner">

      <div class="marca">
        <div class="logo-texto">CANTINHO BOM</div>
        <div class="subtitulo">Produtos Naturais</div>
      </div>

      <div class="acoes-topo">
        <button id="btnLista" class="modo ativo" title="Visualização compacta">
          ▦
        </button>

        <a href="index.html" class="modo" title="Voltar para versão original">
          ▣
        </a>
      </div>

    </div>

    <div class="busca-area">

      <div class="busca">

        <span class="icone-busca">⌕</span>

        <input
          id="campoBusca"
          type="search"
          placeholder="Buscar produto..."
          autocomplete="off"
        >

        <button id="limparBusca" class="limpar" aria-label="Limpar busca">
          ×
        </button>

      </div>

    </div>

  </header>


  <main>

    <section class="navegacao">

      <div class="linha-categorias">

        <button
          class="categoria-btn ativo"
          data-categoria="Todos"
        >
          Todos
        </button>

        <div id="categorias"></div>

      </div>

    </section>


    <section class="barra-resultados">

      <div>
        <strong id="contador">0</strong>
        <span> produtos</span>
      </div>

      <select id="ordenacao">
        <option value="padrao">Mais relevantes</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
        <option value="menor">Menor preço</option>
        <option value="maior">Maior preço</option>
      </select>

    </section>


    <section id="produtos" class="grade-produtos"></section>


    <div id="semResultados" class="sem-resultados">
      <div class="sem-icone">⌕</div>
      <h2>Nenhum produto encontrado</h2>
      <p>Tente outro nome ou escolha outra categoria.</p>
    </div>

  </main>


  <div id="modal" class="modal">

    <div class="modal-fundo" id="fecharModal"></div>

    <div class="modal-conteudo">

      <button id="fecharModalBtn" class="modal-fechar">
        ×
      </button>

      <div id="modalImagem" class="modal-imagem"></div>

      <div class="modal-info">

        <div id="modalCategoria" class="modal-categoria"></div>

        <h2 id="modalNome"></h2>

        <p id="modalDescricao"></p>

        <div class="modal-preco" id="modalPreco"></div>

        <div id="modalApresentacao" class="modal-apresentacao"></div>

      </div>

    </div>

  </div>


  <script src="compacta.js"></script>

</body>
</html>
`;

fs.writeFileSync(ARQUIVO_HTML, html, "utf8");


// ============================================================
// COMPACTA.CSS
// ============================================================

const css = `
* {
  box-sizing: border-box;
}

:root {
  --fundo: #f7f6f2;
  --cartao: #ffffff;
  --texto: #222222;
  --texto-suave: #777777;
  --borda: #e7e5df;
  --raio: 14px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--fundo);
  color: var(--texto);
  font-family: Arial, Helvetica, sans-serif;
}

button,
input,
select {
  font: inherit;
}


/* ============================================================
   TOPO
============================================================ */

.topo {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--borda);
}

.topo-inner {
  max-width: 1500px;
  margin: auto;
  padding: 13px 22px 9px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-texto {
  font-weight: 900;
  letter-spacing: .08em;
  font-size: 19px;
}

.subtitulo {
  margin-top: 2px;
  color: var(--texto-suave);
  font-size: 11px;
}

.acoes-topo {
  display: flex;
  gap: 7px;
}

.modo {
  width: 38px;
  height: 34px;

  display: grid;
  place-items: center;

  border: 1px solid var(--borda);
  border-radius: 9px;

  background: white;
  color: #555;

  text-decoration: none;
  cursor: pointer;
  font-size: 18px;
}

.modo.ativo {
  background: #222;
  color: white;
  border-color: #222;
}


/* ============================================================
   BUSCA
============================================================ */

.busca-area {
  max-width: 1500px;
  margin: auto;
  padding: 0 22px 12px;
}

.busca {
  position: relative;
}

.busca input {
  width: 100%;
  height: 43px;

  border: 1px solid var(--borda);
  border-radius: 10px;

  padding: 0 45px;

  outline: none;
  background: #fafafa;

  font-size: 14px;
}

.busca input:focus {
  background: white;
  border-color: #bcbab2;
}

.icone-busca {
  position: absolute;
  left: 16px;
  top: 10px;
  color: #777;
  font-size: 20px;
  z-index: 2;
}

.limpar {
  position: absolute;
  right: 10px;
  top: 6px;

  width: 30px;
  height: 30px;

  border: 0;
  background: transparent;

  font-size: 23px;
  color: #999;

  cursor: pointer;
}


/* ============================================================
   CATEGORIAS
============================================================ */

.navegacao {
  background: white;
  border-bottom: 1px solid var(--borda);
}

.linha-categorias {
  max-width: 1500px;
  margin: auto;

  padding: 10px 22px;

  display: flex;
  gap: 7px;

  overflow-x: auto;

  scrollbar-width: none;
}

.linha-categorias::-webkit-scrollbar {
  display: none;
}

.categoria-btn {
  flex: 0 0 auto;

  border: 1px solid var(--borda);
  background: white;

  padding: 7px 12px;

  border-radius: 999px;

  color: #555;

  font-size: 12px;

  cursor: pointer;
}

.categoria-btn:hover {
  background: #f5f4ef;
}

.categoria-btn.ativo {
  background: #222;
  color: white;
  border-color: #222;
}


/* ============================================================
   RESULTADOS
============================================================ */

.barra-resultados {
  max-width: 1500px;
  margin: auto;

  padding: 15px 22px 9px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #777;

  font-size: 12px;
}

.barra-resultados strong {
  color: #222;
  font-size: 13px;
}

.barra-resultados select {
  border: 1px solid var(--borda);
  border-radius: 8px;

  padding: 7px 10px;

  background: white;

  font-size: 12px;

  outline: none;
}


/* ============================================================
   GRADE
============================================================ */

.grade-produtos {
  max-width: 1500px;
  margin: auto;

  padding: 6px 22px 35px;

  display: grid;

  grid-template-columns:
    repeat(6, minmax(0, 1fr));

  gap: 10px;
}


/* ============================================================
   CARD
============================================================ */

.card-produto {
  background: var(--cartao);

  border: 1px solid var(--borda);
  border-radius: var(--raio);

  overflow: hidden;

  cursor: pointer;

  transition:
    transform .15s ease,
    box-shadow .15s ease,
    border-color .15s ease;
}

.card-produto:hover {
  transform: translateY(-2px);
  border-color: #d5d2c9;
  box-shadow: 0 6px 18px rgba(0,0,0,.07);
}

.card-imagem {
  width: 100%;
  aspect-ratio: 1 / 1;

  background: #f1f0ec;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.card-imagem img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  mix-blend-mode: multiply;
}

.sem-imagem {
  color: #aaa;
  font-size: 11px;
  text-align: center;
  padding: 15px;
}

.card-info {
  padding: 9px 10px 11px;
}

.card-categoria {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: .06em;

  color: #999;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin-bottom: 4px;
}

.card-nome {
  font-size: 13px;
  line-height: 1.2;

  font-weight: 700;

  min-height: 31px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.card-preco {
  margin-top: 7px;

  font-size: 16px;
  font-weight: 900;
}

.card-unidade {
  margin-top: 2px;

  font-size: 9px;
  color: #999;
}


/* ============================================================
   SEM RESULTADOS
============================================================ */

.sem-resultados {
  display: none;

  text-align: center;

  padding: 80px 20px;

  color: #777;
}

.sem-resultados.mostrar {
  display: block;
}

.sem-icone {
  font-size: 40px;
  margin-bottom: 10px;
}

.sem-resultados h2 {
  margin: 0 0 7px;
  color: #333;
  font-size: 20px;
}

.sem-resultados p {
  margin: 0;
  font-size: 13px;
}


/* ============================================================
   MODAL
============================================================ */

.modal {
  position: fixed;
  inset: 0;

  z-index: 999;

  display: none;
}

.modal.aberto {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-fundo {
  position: absolute;
  inset: 0;

  background: rgba(0,0,0,.55);
}

.modal-conteudo {
  position: relative;

  width: min(850px, calc(100% - 30px));

  max-height: calc(100vh - 30px);

  overflow: auto;

  background: white;

  border-radius: 18px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  z-index: 2;

  box-shadow: 0 20px 60px rgba(0,0,0,.25);
}

.modal-fechar {
  position: absolute;

  top: 10px;
  right: 10px;

  width: 36px;
  height: 36px;

  border: 0;
  border-radius: 50%;

  background: rgba(0,0,0,.07);

  font-size: 23px;

  cursor: pointer;

  z-index: 3;
}

.modal-imagem {
  min-height: 390px;

  background: #f4f3ef;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.modal-imagem img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal-info {
  padding: 45px 35px;
}

.modal-categoria {
  color: #999;

  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .08em;

  margin-bottom: 8px;
}

.modal-info h2 {
  margin: 0 0 15px;

  font-size: 28px;
  line-height: 1.1;
}

.modal-info p {
  color: #666;
  line-height: 1.55;
  font-size: 14px;
}

.modal-preco {
  margin-top: 25px;

  font-size: 27px;
  font-weight: 900;
}

.modal-apresentacao {
  margin-top: 5px;

  color: #999;
  font-size: 12px;
}


/* ============================================================
   RESPONSIVO
============================================================ */

@media (max-width: 1250px) {

  .grade-produtos {
    grid-template-columns:
      repeat(5, minmax(0, 1fr));
  }

}

@media (max-width: 950px) {

  .grade-produtos {
    grid-template-columns:
      repeat(4, minmax(0, 1fr));

    gap: 9px;
  }

}

@media (max-width: 700px) {

  .topo-inner {
    padding-left: 13px;
    padding-right: 13px;
  }

  .busca-area {
    padding-left: 13px;
    padding-right: 13px;
  }

  .linha-categorias {
    padding-left: 13px;
    padding-right: 13px;
  }

  .barra-resultados {
    padding-left: 13px;
    padding-right: 13px;
  }

  .grade-produtos {
    padding-left: 13px;
    padding-right: 13px;

    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    gap: 8px;
  }

  .card-info {
    padding: 7px 8px 9px;
  }

  .card-nome {
    font-size: 11px;
    min-height: 27px;
  }

  .card-preco {
    font-size: 14px;
  }

  .modal-conteudo {
    grid-template-columns: 1fr;

    width: calc(100% - 20px);
  }

  .modal-imagem {
    min-height: 280px;
  }

  .modal-info {
    padding: 25px;
  }

}

@media (max-width: 430px) {

  .grade-produtos {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}
`;

fs.writeFileSync(ARQUIVO_CSS, css, "utf8");


// ============================================================
// COMPACTA.JS
// ============================================================

const js = `
const estado = {
  produtos: [],
  filtrados: [],
  categoria: "Todos",
  busca: "",
  ordenacao: "padrao"
};

const el = id => document.getElementById(id);

async function carregarProdutos() {

  try {

    const resposta = await fetch("data/produtos.json", {
      cache: "no-store"
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar produtos.json");
    }

    const dados = await resposta.json();

    estado.produtos = Array.isArray(dados) ? dados : [];

    montarCategorias();
    aplicarFiltros();

  } catch (erro) {

    console.error(erro);

    el("produtos").innerHTML = \`
      <div style="
        grid-column:1/-1;
        padding:60px 20px;
        text-align:center;
        color:#777;
      ">
        Não foi possível carregar o catálogo.
      </div>
    \`;

  }
}


function montarCategorias() {

  const categorias = [
    ...new Set(
      estado.produtos
        .map(p => p.categoria)
        .filter(Boolean)
    )
  ].sort((a, b) =>
    String(a).localeCompare(String(b), "pt-BR")
  );

  const container = el("categorias");

  container.innerHTML = "";

  categorias.forEach(categoria => {

    const botao = document.createElement("button");

    botao.className = "categoria-btn";

    botao.dataset.categoria = categoria;

    botao.textContent = categoria;

    botao.addEventListener("click", () => {

      estado.categoria = categoria;

      document
        .querySelectorAll(".categoria-btn")
        .forEach(b => b.classList.remove("ativo"));

      botao.classList.add("ativo");

      aplicarFiltros();

    });

    container.appendChild(botao);

  });

}


function aplicarFiltros() {

  let lista = [...estado.produtos];

  const busca = normalizar(estado.busca);

  if (estado.categoria !== "Todos") {

    lista = lista.filter(p =>
      String(p.categoria || "") === estado.categoria
    );

  }

  if (busca) {

    lista = lista.filter(p => {

      const texto = [
        p.nome,
        p.categoria,
        p.marca,
        p.codigo,
        ...(Array.isArray(p.aliases) ? p.aliases : [])
      ]
        .join(" ");

      return normalizar(texto).includes(busca);

    });

  }

  switch (estado.ordenacao) {

    case "az":
      lista.sort((a, b) =>
        String(a.nome || "").localeCompare(
          String(b.nome || ""),
          "pt-BR"
        )
      );
      break;

    case "za":
      lista.sort((a, b) =>
        String(b.nome || "").localeCompare(
          String(a.nome || ""),
          "pt-BR"
        )
      );
      break;

    case "menor":
      lista.sort((a, b) =>
        Number(a.preco || 0) - Number(b.preco || 0)
      );
      break;

    case "maior":
      lista.sort((a, b) =>
        Number(b.preco || 0) - Number(a.preco || 0)
      );
      break;

  }

  estado.filtrados = lista;

  renderizar();

}


function renderizar() {

  const container = el("produtos");

  container.innerHTML = "";

  el("contador").textContent =
    estado.filtrados.length;

  if (!estado.filtrados.length) {

    el("semResultados").classList.add("mostrar");

    return;

  }

  el("semResultados").classList.remove("mostrar");

  const fragmento = document.createDocumentFragment();

  estado.filtrados.forEach(produto => {

    const card = document.createElement("article");

    card.className = "card-produto";

    card.addEventListener(
      "click",
      () => abrirModal(produto)
    );

    const imagem = produto.imagem;

    const imagemHTML = imagem
      ? \`
        <img
          src="\${imagem}"
          alt="\${escapeHTML(produto.nome || "Produto")}"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div class="sem-imagem">Imagem indisponível</div>'"
        >
      \`
      : \`
        <div class="sem-imagem">
          Imagem em atualização
        </div>
      \`;

    const preco = Number(produto.preco);

    const precoFormatado = Number.isFinite(preco)
      ? preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      : "";

    const unidade =
      produto.peso
        ? \`\${produto.peso}\${produto.unidade && !String(produto.peso).includes(produto.unidade) ? " " + produto.unidade : ""}\`
        : "";

    card.innerHTML = \`
      <div class="card-imagem">
        \${imagemHTML}
      </div>

      <div class="card-info">

        <div class="card-categoria">
          \${escapeHTML(produto.categoria || "")}
        </div>

        <div class="card-nome">
          \${escapeHTML(produto.nome || "Produto")}
        </div>

        <div class="card-preco">
          \${precoFormatado}
        </div>

        <div class="card-unidade">
          \${unidade ? "por " + escapeHTML(unidade) : ""}
        </div>

      </div>
    \`;

    fragmento.appendChild(card);

  });

  container.appendChild(fragmento);

}


function abrirModal(produto) {

  el("modalNome").textContent =
    produto.nome || "Produto";

  el("modalCategoria").textContent =
    produto.categoria || "";

  el("modalDescricao").textContent =
    produto.descricao || "";

  const preco = Number(produto.preco);

  el("modalPreco").textContent =
    Number.isFinite(preco)
      ? preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      : "";

  let apresentacao = "";

  if (produto.peso) {
    apresentacao =
      \`\${produto.peso}\${produto.unidade ? " " + produto.unidade : ""}\`;
  }

  el("modalApresentacao").textContent =
    apresentacao
      ? \`Apresentação: \${apresentacao}\`
      : "";

  const imagem = produto.imagem;

  if (imagem) {

    el("modalImagem").innerHTML = \`
      <img
        src="\${imagem}"
        alt="\${escapeHTML(produto.nome || "Produto")}"
      >
    \`;

  } else {

    el("modalImagem").innerHTML = \`
      <div class="sem-imagem">
        Imagem em atualização
      </div>
    \`;

  }

  el("modal").classList.add("aberto");

  document.body.style.overflow = "hidden";

}


function fecharModal() {

  el("modal").classList.remove("aberto");

  document.body.style.overflow = "";

}


function normalizar(valor) {

  return String(valor || "")
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase();

}


function escapeHTML(valor) {

  return String(valor || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ============================================================
// EVENTOS
// ============================================================

el("campoBusca").addEventListener("input", evento => {

  estado.busca = evento.target.value;

  aplicarFiltros();

});


el("limparBusca").addEventListener("click", () => {

  el("campoBusca").value = "";

  estado.busca = "";

  aplicarFiltros();

  el("campoBusca").focus();

});


el("ordenacao").addEventListener("change", evento => {

  estado.ordenacao = evento.target.value;

  aplicarFiltros();

});


document
  .querySelector('.categoria-btn[data-categoria="Todos"]')
  .addEventListener("click", () => {

    estado.categoria = "Todos";

    document
      .querySelectorAll(".categoria-btn")
      .forEach(b => b.classList.remove("ativo"));

    document
      .querySelector('.categoria-btn[data-categoria="Todos"]')
      .classList.add("ativo");

    aplicarFiltros();

  });


el("fecharModal").addEventListener(
  "click",
  fecharModal
);

el("fecharModalBtn").addEventListener(
  "click",
  fecharModal
);


document.addEventListener("keydown", evento => {

  if (evento.key === "Escape") {
    fecharModal();
  }

});


carregarProdutos();
`;

fs.writeFileSync(ARQUIVO_JS, js, "utf8");


// ============================================================
// RESULTADO
// ============================================================

console.log("");
console.log("==============================================");
console.log(" CATALYST — VERSÃO COMPACTA CRIADA");
console.log("==============================================");
console.log("");
console.log("✅ compacta.html");
console.log("✅ compacta.css");
console.log("✅ compacta.js");
console.log("");
console.log("🔒 Arquivos originais NÃO foram alterados:");
console.log("   index.html");
console.log("   style.css");
console.log("   script.js");
console.log("   data/produtos.json");
console.log("");
console.log("🌐 Para testar localmente:");
console.log("   python3 -m http.server 8000");
console.log("");
console.log("Depois abra:");
console.log("   http://localhost:8000/compacta.html");
console.log("");
console.log("==============================================");
