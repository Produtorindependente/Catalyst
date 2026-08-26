
const estado = {
  produtos: [],
  filtrados: [],
  categoria: "Todos",
  busca: "",
  ordenacao: "padrao"
};

let carrinhoCompacto = [];

const WHATSAPP_COMPACTO = "5511984610145";

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

    estado.produtos.forEach((produto, indice) => {
      produto._catalogId =
        produto.id ?? `produto-${indice}`;
    });

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

  const ehGranel =
    produto.categoria === "Granel" &&
    produto.venda?.tipo === "peso";

  const precoBase = Number(
    produto.venda?.precoBase ?? produto.preco
  );

  if (ehGranel) {

    el("modalAcao").innerHTML = `
      <div class="modal-quantidade-granel">

        <label for="modalPeso">
          Quantidade
        </label>

        <div class="modal-campo-peso">
          <input
            id="modalPeso"
            type="number"
            min="1"
            step="1"
            value="100"
            inputmode="numeric"
          >
          <span>g</span>
        </div>

        <div id="modalTotalGranel" class="modal-total-granel">
          Total: R$ ${precoBase.toFixed(2).replace(".", ",")}
        </div>

      </div>

      <button
        type="button"
        class="modal-botao-carrinho"
        id="modalAdicionarCarrinho"
      >
        Adicionar ao carrinho
      </button>
    `;

    const pesoInput = el("modalPeso");

    pesoInput.addEventListener("input", () => {

      const peso = Number(pesoInput.value);

      if (!Number.isFinite(peso) || peso <= 0) {

        el("modalTotalGranel").textContent =
          "Digite uma quantidade válida";

        return;
      }

      const total =
        (precoBase / 100) * peso;

      el("modalTotalGranel").textContent =
        `Total: R$ ${total.toFixed(2).replace(".", ",")}`;

    });

    el("modalAdicionarCarrinho").addEventListener(
      "click",
      () => {
        adicionarAoCarrinhoCompacto(
          produto,
          Number(pesoInput.value)
        );
      }
    );

  } else {

    el("modalAcao").innerHTML = `
      <button
        type="button"
        class="modal-botao-carrinho"
        id="modalAdicionarCarrinho"
      >
        Adicionar ao carrinho
      </button>
    `;

    el("modalAdicionarCarrinho").addEventListener(
      "click",
      () => {
        adicionarAoCarrinhoCompacto(produto);
      }
    );

  }

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
// CARRINHO — VERSÃO COMPACTA
// ============================================================

function adicionarAoCarrinhoCompacto(produto, pesoGramas = null) {

  const ehGranel =
    produto.categoria === "Granel" &&
    produto.venda?.tipo === "peso";

  if (ehGranel) {

    const peso = Number(pesoGramas);

    if (!Number.isFinite(peso) || peso <= 0) {
      alert("Digite uma quantidade válida em gramas.");
      return;
    }

    const precoBase = Number(
      produto.venda?.precoBase ?? produto.preco
    );

    const precoCalculado =
      (precoBase / 100) * peso;

    const existente = carrinhoCompacto.find(
      item =>
        String(item._catalogId) ===
        String(produto._catalogId)
    );

    if (existente) {

      existente.peso += peso;

      existente.preco =
        (precoBase / 100) * existente.peso;

    } else {

      carrinhoCompacto.push({
        _catalogId: produto._catalogId,
        nome: produto.nome,
        preco: precoCalculado,
        quantidade: 1,
        peso,
        tipoVenda: "peso"
      });

    }

  } else {

    const existente = carrinhoCompacto.find(
      item =>
        String(item._catalogId) ===
        String(produto._catalogId)
    );

    if (existente) {

      existente.quantidade++;

    } else {

      carrinhoCompacto.push({
        _catalogId: produto._catalogId,
        nome: produto.nome,
        preco: Number(produto.preco),
        quantidade: 1,
        tipoVenda: "unidade"
      });

    }

  }

  atualizarCarrinhoCompacto();

  fecharModal();

  el("carrinhoCompacto").classList.add("aberto");
}


function atualizarCarrinhoCompacto() {

  const quantidadeTotal =
    carrinhoCompacto.reduce(
      (total, item) =>
        total + item.quantidade,
      0
    );

  el("contadorCarrinhoCompacto").textContent =
    quantidadeTotal;

  el("contadorItensCompacto").textContent =
    quantidadeTotal;

  const lista =
    el("itensCarrinhoCompacto");

  lista.innerHTML = "";

  if (!carrinhoCompacto.length) {

    lista.innerHTML = `
      <div class="carrinho-vazio-compacto">
        Seu carrinho está vazio.
      </div>
    `;

    atualizarTotalCarrinhoCompacto();
    return;
  }

  carrinhoCompacto.forEach(item => {

    const elemento =
      document.createElement("div");

    elemento.className =
      "item-carrinho-compacto";

    const quantidade =
      item.tipoVenda === "peso"
        ? `${item.peso}g`
        : `${item.quantidade}`;

    elemento.innerHTML = `

      <strong>
        ${escapeHTML(item.nome)}
      </strong>

      <div class="controle-carrinho-compacto">

        <button
          type="button"
          onclick="alterarQuantidadeCarrinhoCompacto('${item._catalogId}', -1)"
        >
          −
        </button>

        <strong>
          ${quantidade}
        </strong>

        <button
          type="button"
          onclick="alterarQuantidadeCarrinhoCompacto('${item._catalogId}', 1)"
        >
          +
        </button>

      </div>

      <p>
        R$ ${Number(item.preco)
          .toFixed(2)
          .replace(".", ",")}
      </p>

      <button
        type="button"
        class="remover-carrinho-compacto"
        onclick="removerDoCarrinhoCompacto('${item._catalogId}')"
      >
        Remover
      </button>

    `;

    lista.appendChild(elemento);

  });

  atualizarTotalCarrinhoCompacto();
}


function removerDoCarrinhoCompacto(id) {

  carrinhoCompacto =
    carrinhoCompacto.filter(
      item =>
        String(item._catalogId) !==
        String(id)
    );

  atualizarCarrinhoCompacto();
}


function alterarQuantidadeCarrinhoCompacto(id, direcao) {

  const item =
    carrinhoCompacto.find(
      item =>
        String(item._catalogId) ===
        String(id)
    );

  if (!item) return;

  if (item.tipoVenda === "peso") {

    item.peso += direcao * 10;

    if (item.peso <= 0) {

      removerDoCarrinhoCompacto(id);
      return;

    }

    const produto =
      estado.produtos.find(
        produto =>
          String(produto._catalogId) ===
          String(id)
      );

    if (produto) {

      const precoBase = Number(
        produto.venda?.precoBase ?? produto.preco
      );

      item.preco =
        (precoBase / 100) * item.peso;

    }

  } else {

    item.quantidade += direcao;

    if (item.quantidade <= 0) {

      removerDoCarrinhoCompacto(id);
      return;

    }

  }

  atualizarCarrinhoCompacto();
}


function atualizarTotalCarrinhoCompacto() {

  const total =
    carrinhoCompacto.reduce(
      (soma, item) => {

        if (item.tipoVenda === "peso") {
          return soma + Number(item.preco);
        }

        return soma +
          Number(item.preco) *
          Number(item.quantidade);

      },
      0
    );

  el("totalCarrinhoCompacto").textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;
}


function enviarPedidoWhatsAppCompacto() {

  if (!carrinhoCompacto.length) {

    alert("Seu carrinho está vazio.");
    return;

  }

  let mensagem =
    "PEDIDO — CANTINHO BOM%0A%0A";

  carrinhoCompacto.forEach(item => {

    let linha;

    if (item.tipoVenda === "peso") {

      linha =
        `• ${item.nome} — ` +
        `${item.peso}g — ` +
        `R$ ${Number(item.preco)
          .toFixed(2)
          .replace(".", ",")}`;

    } else {

      const subtotal =
        Number(item.preco) *
        Number(item.quantidade);

      linha =
        `• ${item.nome} — ` +
        `${item.quantidade} un. — ` +
        `R$ ${subtotal
          .toFixed(2)
          .replace(".", ",")}`;

    }

    mensagem += linha + "%0A";

  });

  const total =
    carrinhoCompacto.reduce(
      (soma, item) => {

        if (item.tipoVenda === "peso") {
          return soma + Number(item.preco);
        }

        return soma +
          Number(item.preco) *
          Number(item.quantidade);

      },
      0
    );

  mensagem +=
    `%0ATOTAL: R$ ${total
      .toFixed(2)
      .replace(".", ",")}`;

  const url =
    `https://wa.me/${WHATSAPP_COMPACTO}?text=${mensagem}`;

  window.open(url, "_blank");
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


el("btnFavoritos").addEventListener("click", () => {

  estado.categoria = "Favoritos";

  document
    .querySelectorAll(".categoria-btn")
    .forEach(b => b.classList.remove("ativo"));

  el("btnFavoritos").classList.add("ativo");

  estado.filtrados = estado.produtos.filter(
    produto => produto.favorito === true
  );

  renderizar();

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


el("abrirCarrinhoCompacto").addEventListener(
  "click",
  () => {
    el("carrinhoCompacto").classList.add("aberto");
    atualizarCarrinhoCompacto();
  }
);

el("fecharCarrinhoCompacto").addEventListener(
  "click",
  () => {
    el("carrinhoCompacto").classList.remove("aberto");
  }
);

el("finalizarWhatsAppCompacto").addEventListener(
  "click",
  enviarPedidoWhatsAppCompacto
);

atualizarCarrinhoCompacto();

carregarProdutos();
