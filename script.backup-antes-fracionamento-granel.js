/* ========================================
   CATALYST
   Sistema principal do catálogo
======================================== */

let produtos = [];
let carrinho = [];

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

        const resposta = await fetch("data/produtos.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os produtos.");
        }

       produtos = await resposta.json();

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
        let precoHTML = `
    <div class="preco">
        R$ ${Number(produto.preco)
            .toFixed(2)
            .replace(".", ",")}
    </div>
`;

if (produto.precoAnterior !== null && produto.precoAnterior !== undefined) {

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

                <button
                    class="botao"
                    onclick="adicionarAoCarrinho(${produto.id})"
                >
                    Adicionar ao carrinho
                </button>

            </div>

        `;

        container.appendChild(card);

    });
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

    // Botão TODOS

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


    // Botões das categorias

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

function adicionarAoCarrinho(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;


    const produtoExistente = carrinho.find(
        item => item.id === id
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: Number(produto.preco),

            quantidade: 1

        });

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

        contador.textContent =
            quantidadeTotal;

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


        elemento.innerHTML = `

            <div>

                <strong>
                    ${item.nome}
                </strong>

                <p>
                    ${item.quantidade}x
                    R$ ${item.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

            </div>

            <button
                onclick="removerDoCarrinho(${item.id})"
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
        item => item.id !== id
    );

    atualizarCarrinho();

}


/* ========================================
   CALCULAR TOTAL
======================================== */

function atualizarTotal() {

    const total = carrinho.reduce(

        (soma, item) =>
            soma + item.preco * item.quantidade,

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
        "Olá! Gostaria de fazer um pedido:%0A%0A";


    carrinho.forEach(item => {

        mensagem +=
            `• ${item.nome} — ` +
            `${item.quantidade}x — ` +
            `R$ ${(item.preco * item.quantidade)
                .toFixed(2)
                .replace(".", ",")}` +
            "%0A";

    });


    const total = carrinho.reduce(

        (soma, item) =>
            soma + item.preco * item.quantidade,

        0

    );


    mensagem +=
        `%0A*Total: R$ ${total
            .toFixed(2)
            .replace(".", ",")}*`;


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

            const termo = campo.value
                .toLowerCase()
                .trim();

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
                    String(valor || "")
                        .toLowerCase()
                        .includes(termo)
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