/* ========================================
   CATALYST
   Sistema principal do catálogo
======================================== */

let produtos = [];
let carrinho = [];

/* ========================================
   SUPABASE
======================================== */

const SUPABASE_URL = "https://dgmayntwsxixetmmhaxx.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_93yBqwhbdT45ac0ib2pvpg_g05EJGla";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

/* ========================================
   CONFIGURAÇÃO
======================================== */

// Número do WhatsApp da loja
// IMPORTANTE:
// depois vamos trocar pelo número real da loja.
const WHATSAPP = "5511984610145";


/* ========================================
   CARREGAR PRODUTOS
======================================== */

async function carregarProdutos() {

    try {

        const { data, error } = await supabaseClient
            .from("produtos")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error("Nenhum produto foi retornado pelo Supabase.");
        }

        produtos = data.map(produto => ({
            ...produto,
            precoAnterior: produto.preco_anterior
        }));

        // Identificador interno único.
        // Produtos que já possuem ID continuam usando o ID original.
        // Produtos sem ID recebem uma chave baseada na posição no catálogo.
        produtos.forEach((produto, indice) => {

            produto._catalogId =
                produto.id ?? `produto-${indice}`;

        });

mostrarCategorias();

mostrarProdutos(produtos);

    } catch (erro) {

        console.error("Erro:", erro);

        const lista = document.querySelector(".produtos");

        if (lista) {
            lista.innerHTML = `
                <p>
                    Não foi possível carregar os produtos.
                </p>
            `;
        }
    }
}


/* ========================================
   MOSTRAR PRODUTOS
======================================== */

function mostrarProdutos(listaProdutos) {

    const container = document.querySelector(".produtos");

    if (!container) return;

    container.innerHTML = "";

    if (listaProdutos.length === 0) {

        container.innerHTML = `
            <p>
                Nenhum produto encontrado.
            </p>
        `;

        return;
    }

    listaProdutos.forEach(produto => {

        const card = document.createElement("article");

        card.className = "produto";

        const ehGranel =
            produto.categoria === "Granel" &&
            produto.venda?.tipo === "peso";

        let precoHTML = "";

        if (ehGranel) {

            const precoBase = Number(
                produto.venda.precoBase ?? produto.preco
            );

            precoHTML = `
                <div class="preco">
                    R$ ${precoBase
                        .toFixed(2)
                        .replace(".", ",")}
                    <small>/ 100g</small>
                </div>
            `;

        } else {

            precoHTML = `
                <div class="preco">
                    R$ ${Number(produto.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                </div>
            `;

            if (
                produto.precoAnterior !== null &&
                produto.precoAnterior !== undefined
            ) {

                precoHTML = `
                    <div class="preco promocao">

                        <span class="preco-anterior">
                            R$ ${Number(produto.precoAnterior)
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>

                        <strong>
                            R$ ${Number(produto.preco)
                                .toFixed(2)
                                .replace(".", ",")}
                        </strong>

                    </div>
                `;
            }
        }

        let detalhesHTML = "";

        const detalhes = [];

        if (produto.marca) {
            detalhes.push(produto.marca);
        }

        if (produto.peso && produto.unidade) {
            detalhes.push(`${produto.peso} ${produto.unidade}`);
        } else if (produto.peso) {
            detalhes.push(produto.peso);
        }

        if (detalhes.length > 0) {

            detalhesHTML = `
                <div class="produto-detalhes">
                    ${detalhes.join(" · ")}
                </div>
            `;

        }

        let quantidadeHTML = "";

        if (ehGranel) {

            const precoBase = Number(
                produto.venda.precoBase ?? produto.preco
            );

            quantidadeHTML = `
                <div class="quantidade-granel">

                    <label for="peso-${produto._catalogId}">
                        Quantidade
                    </label>

                    <div class="campo-peso">

                        <input
                            type="number"
                            id="peso-${produto._catalogId}"
                            min="1"
                            step="1"
                            value="100"
                            inputmode="numeric"
                            oninput="calcularPrecoGranel(this, ${precoBase})"
                        >

                        <span>g</span>

                    </div>

                    <div
                        class="total-granel"
                        data-preco-base="${precoBase}"
                    >
                        Total: R$ ${precoBase
                            .toFixed(2)
                            .replace(".", ",")}
                    </div>

                    <button
                        class="botao"
                        onclick="adicionarAoCarrinho('${produto._catalogId}', Number(document.getElementById('peso-${produto._catalogId}').value))"
                    >
                        Adicionar ao carrinho
                    </button>

                </div>
            `;

        } else {

            quantidadeHTML = `
                <button
                    class="botao"
                    onclick="adicionarAoCarrinho('${produto._catalogId}')"
                >
                    Adicionar ao carrinho
                </button>
            `;

        }

        card.innerHTML = `

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                loading="lazy"
                onerror="this.onerror=null; this.src='assets/img/sem-imagem.svg';"
            >

            <div class="produto-info">

                <span class="categoria-produto">
                    ${produto.categoria}
                </span>

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.descricao}
                </p>

                ${detalhesHTML}

                ${precoHTML}

                ${quantidadeHTML}

            </div>

        `;

        container.appendChild(card);

    });
}


/* ========================================
   CALCULAR PREÇO DO GRANEL
======================================== */

function calcularPrecoGranel(input, precoBase) {

    const peso = Number(input.value);

    const quantidade = input
        .closest(".quantidade-granel");

    if (!quantidade) return;

    const total = quantidade.querySelector(".total-granel");

    if (!total) return;

    if (!Number.isFinite(peso) || peso <= 0) {

        total.textContent = "Digite uma quantidade válida";

        return;
    }

    const preco = (precoBase / 100) * peso;

    total.textContent =
        `Total: R$ ${preco
            .toFixed(2)
            .replace(".", ",")}`;
}


/* ========================================
   CATEGORIAS
======================================== */

function mostrarCategorias() {

    const container =
        document.querySelector("#listaCategorias");

    if (!container) return;

    const categorias = [
        ...new Set(
            produtos.map(produto => produto.categoria)
        )
    ];

    container.innerHTML = "";

    // ========================================
    // BOTÃO TODOS
    // ========================================

    const botaoTodos =
        document.createElement("button");

    botaoTodos.className = "categoria ativo";

    botaoTodos.textContent = "Todos";

    botaoTodos.addEventListener(
        "click",
        () => {

            mostrarProdutos(produtos);

            document
                .querySelectorAll(".categoria")
                .forEach(botao =>
                    botao.classList.remove("ativo")
                );

            botaoTodos.classList.add("ativo");

        }
    );

    container.appendChild(botaoTodos);


   // ========================================
// BOTÃO FAVORITOS
// ========================================

const botaoFavoritos =
    document.createElement("button");

botaoFavoritos.className = "categoria";

botaoFavoritos.textContent = "⭐ Favoritos";

botaoFavoritos.addEventListener(
    "click",
    () => {

        const favoritos =
            produtos.filter(
                produto => produto.destaque === true
            );

        mostrarProdutos(favoritos);

        document
            .querySelectorAll(".categoria")
            .forEach(botao =>
                botao.classList.remove("ativo")
            );

        botaoFavoritos.classList.add("ativo");

    }
);

container.appendChild(botaoFavoritos);


    // ========================================
    // BOTÕES DAS CATEGORIAS
    // ========================================

    categorias.forEach(categoria => {

        const botao =
            document.createElement("button");

        botao.className = "categoria";

        botao.textContent = categoria;

        botao.addEventListener(
            "click",
            () => {

                const filtrados =
                    produtos.filter(
                        produto =>
                            produto.categoria === categoria
                    );

                mostrarProdutos(filtrados);

                document
                    .querySelectorAll(".categoria")
                    .forEach(botao =>
                        botao.classList.remove("ativo")
                    );

                botao.classList.add("ativo");

            }
        );

        container.appendChild(botao);

    });

}


/* ========================================
   ADICIONAR AO CARRINHO
======================================== */


function adicionarAoCarrinho(id, pesoGramas = null) {

    const produto = produtos.find(
        item => String(item._catalogId) === String(id)
    );

    if (!produto) return;

    const ehGranel =
        produto.categoria === "Granel" &&
        produto.venda?.tipo === "peso";

    if (ehGranel) {

        const input = document.querySelector(
            `#peso-${id}`
        );

        const peso =
            pesoGramas !== null
                ? Number(pesoGramas)
                : Number(input?.value);

        if (!Number.isFinite(peso) || peso <= 0) {

            alert(
                "Digite uma quantidade válida em gramas."
            );

            return;
        }

        const precoBase = Number(
            produto.venda.precoBase ?? produto.preco
        );

        const precoCalculado =
            (precoBase / 100) * peso;

        const produtoExistente = carrinho.find(
            item =>
                String(item._catalogId) === String(id) &&
                item.tipoVenda === "peso"
        );

        if (produtoExistente) {

            produtoExistente.peso += peso;

            produtoExistente.preco =
                (precoBase / 100) *
                produtoExistente.peso;

        } else {

            carrinho.push({

                id: produto._catalogId,
                _catalogId: produto._catalogId,

                nome: produto.nome,

                preco: precoCalculado,

                quantidade: 1,

                peso: peso,

                tipoVenda: "peso",

                unidade: "g"

            });

        }

    } else {

        const produtoExistente = carrinho.find(
            item => String(item._catalogId) === String(id)
        );

        if (produtoExistente) {

            produtoExistente.quantidade++;

        } else {

            carrinho.push({

                id: produto._catalogId,
                _catalogId: produto._catalogId,

                nome: produto.nome,

                preco: Number(produto.preco),

                quantidade: 1,

                tipoVenda: "unidade"

            });

        }

    }

    atualizarCarrinho();

    document
        .querySelector("#carrinho")
        .classList.add("aberto");
}


/* ========================================
   ATUALIZAR CARRINHO
======================================== */

function atualizarCarrinho() {

    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const contador =
        document.querySelector("#contador-carrinho");

    if (contador) {
        contador.textContent = quantidadeTotal;
    }

    const contadorFlutuante =
        document.querySelector("#contador-flutuante");

    if (contadorFlutuante) {

        contadorFlutuante.textContent =
            quantidadeTotal;

        contadorFlutuante.style.display =
            quantidadeTotal > 0
                ? "flex"
                : "none";
    }

    const listaCarrinho =
        document.querySelector("#itensCarrinho");

    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";

    carrinho.forEach(item => {

        const elemento =
            document.createElement("div");

        elemento.className =
            "item-carrinho";

        const subtotal =
            Number(item.preco);

        const quantidadeHTML =
            item.tipoVenda === "peso"
                ? `
                    <div class="controle-quantidade">

                        <button
                            type="button"
                            onclick="alterarQuantidadeCarrinho('${item._catalogId}', -1)"
                            aria-label="Diminuir 10 gramas"
                        >
                            −
                        </button>

                        <strong>
                            ${item.peso}g
                        </strong>

                        <button
                            type="button"
                            onclick="alterarQuantidadeCarrinho('${item._catalogId}', 1)"
                            aria-label="Aumentar 10 gramas"
                        >
                            +
                        </button>

                    </div>
                `
                : `
                    <div class="controle-quantidade">

                        <button
                            type="button"
                            onclick="alterarQuantidadeCarrinho('${item._catalogId}', -1)"
                            aria-label="Diminuir quantidade"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantidade}
                        </strong>

                        <button
                            type="button"
                            onclick="alterarQuantidadeCarrinho('${item._catalogId}', 1)"
                            aria-label="Aumentar quantidade"
                        >
                            +
                        </button>

                    </div>
                `;

        elemento.innerHTML = `

            <div>

                <strong>
                    ${item.nome}
                </strong>

                ${quantidadeHTML}

                <p>
                    R$ ${subtotal
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

            </div>

            <button
                onclick="removerDoCarrinho('${item._catalogId}')"
            >
                Remover
            </button>

        `;

        listaCarrinho.appendChild(elemento);

    });

    atualizarTotal();
}


/* ========================================
   REMOVER DO CARRINHO
======================================== */

function removerDoCarrinho(id) {

    carrinho = carrinho.filter(
        item => String(item._catalogId) !== String(id)
    );

    atualizarCarrinho();
}


/* ========================================
   ALTERAR QUANTIDADE DO CARRINHO
======================================== */

function alterarQuantidadeCarrinho(id, direcao) {

    const item =
        carrinho.find(item => String(item._catalogId) === String(id));

    if (!item) return;

    if (item.tipoVenda === "peso") {

        const passo = 10;

        item.peso +=
            direcao * passo;

        if (item.peso <= 0) {

            carrinho =
                carrinho.filter(
                    produto => String(produto._catalogId) !== String(id)
                );

        } else {

            const produto =
                produtos.find(
                    produto => String(produto._catalogId) === String(id)
                );

            if (produto) {

                const precoBase =
                    Number(
                        produto.venda?.precoBase ??
                        produto.preco
                    );

                item.preco =
                    (precoBase / 100) *
                    item.peso;
            }
        }

    } else {

        item.quantidade += direcao;

        if (item.quantidade <= 0) {

            carrinho =
                carrinho.filter(
                    produto => String(produto._catalogId) !== String(id)
                );
        }
    }

    atualizarCarrinho();
}


/* ========================================
   CALCULAR TOTAL
======================================== */

function atualizarTotal() {

    const total = carrinho.reduce(

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

    const elementoTotal =
        document.querySelector("#totalCarrinho");

    if (elementoTotal) {

        elementoTotal.textContent =
            `R$ ${total
                .toFixed(2)
                .replace(".", ",")}`;
    }
}


/* ========================================
   ENVIAR PEDIDO PARA WHATSAPP
======================================== */

function enviarPedidoWhatsApp() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }

    let mensagem =
        "PEDIDO — CANTINHO BOM%0A%0A";

    carrinho.forEach(item => {

        let linha = "";

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

        mensagem +=
            linha + "%0A";
    });

    const total = carrinho.reduce(

        (soma, item) => {

            if (item.tipoVenda === "peso") {

                return soma +
                    Number(item.preco);
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
        `https://wa.me/${WHATSAPP}?text=${mensagem}`;

    window.open(
        url,
        "_blank"
    );
}


/* ========================================
   PESQUISA
======================================== */

function configurarPesquisa() {

    const campo = document.querySelector("#campoBusca");

    if (!campo) return;

    campo.addEventListener(
        "input",
        () => {

            const normalizarTexto = (valor) => {
                return String(valor ?? "")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .trim();
            };

            const termo = normalizarTexto(campo.value);

            if (!termo) {
                mostrarProdutos(produtos);
                return;
            }

            const resultados = produtos.filter(produto => {

                const camposPesquisa = [
                    produto.nome,
                    produto.marca,
                    produto.categoria,
                    produto.peso,
                    produto.quantidade,
                    produto.descricao,
                    produto.sabor,
                    produto.apresentacao
                ];

                return camposPesquisa.some(valor =>
                    normalizarTexto(valor).includes(termo)
                );
            });

            mostrarProdutos(resultados);
        }
    );
}


/* ========================================
   INICIALIZAÇÃO
======================================== */

/* ========================================
   INICIALIZAÇÃO
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarProdutos();

        configurarPesquisa();


        /* BOTÃO FINALIZAR WHATSAPP */

        document
            .querySelector("#finalizarWhatsApp")
            .addEventListener(
                "click",
                enviarPedidoWhatsApp
            );


        /* ABRIR CARRINHO */

        document
            .querySelector("#abrirCarrinho")
            .addEventListener(
                "click",
                () => {

                    document
                        .querySelector("#carrinho")
                        .classList.add("aberto");

                }
            );


        /* FECHAR CARRINHO */

        document
            .querySelector("#fecharCarrinho")
            .addEventListener(
                "click",
                () => {

                    document
                        .querySelector("#carrinho")
                        .classList.remove("aberto");

                }
            );

    }
);
