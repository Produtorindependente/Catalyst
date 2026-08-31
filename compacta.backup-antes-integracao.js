
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

    el("produtos").innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:60px 20px;
        text-align:center;
        color:#777;
      ">
        Não foi possível carregar o catálogo.
      </div>
    `;

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
      ? `
        <img
          src="${imagem}"
          alt="${escapeHTML(produto.nome || "Produto")}"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=sem-imagem>Imagem indisponível</div>'"
        >
      `
      : `
        <div class="sem-imagem">
          Imagem em atualização
        </div>
      `;

    const preco = Number(produto.preco);

    const precoFormatado = Number.isFinite(preco)
      ? preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      : "";

    const unidade =
      produto.peso
        ? `${produto.peso}${produto.unidade && !String(produto.peso).includes(produto.unidade) ? " " + produto.unidade : ""}`
        : "";

    card.innerHTML = `
      <div class="card-imagem">
        ${imagemHTML}
      </div>

      <div class="card-info">

        <div class="card-categoria">
          ${escapeHTML(produto.categoria || "")}
        </div>

        <div class="card-nome">
          ${escapeHTML(produto.nome || "Produto")}
        </div>

        <div class="card-preco">
          ${precoFormatado}
        </div>

        <div class="card-unidade">
          ${unidade ? "por " + escapeHTML(unidade) : ""}
        </div>

      </div>
    `;

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
      `${produto.peso}${produto.unidade ? " " + produto.unidade : ""}`;
  }

  el("modalApresentacao").textContent =
    apresentacao
      ? `Apresentação: ${apresentacao}`
      : "";

  const imagem = produto.imagem;

  if (imagem) {

    el("modalImagem").innerHTML = `
      <img
        src="${imagem}"
        alt="${escapeHTML(produto.nome || "Produto")}"
      >
    `;

  } else {

    el("modalImagem").innerHTML = `
      <div class="sem-imagem">
        Imagem em atualização
      </div>
    `;

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
    .replace(/[\u0300-\u036f]/g, "")
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
