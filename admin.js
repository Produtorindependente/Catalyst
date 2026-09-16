const SUPABASE_URL =
    "https://dgmayntwsxixetmmhaxx.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_93yBqwhbdT45ac0ib2pvpg_g05EJGla";


const db =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: false
            }
        }
    );


let produtos = [];


const $ = id =>
    document.getElementById(id);


/* ========================================
   INICIALIZAÇÃO
======================================== */

async function iniciar() {

    mostrarLogin();

    try {

        const {
            data,
            error
        } = await db.auth.getSession();


        if (error) {

            console.error(
                "Erro ao verificar sessão:",
                error
            );

            return;
        }


        if (data.session) {

            mostrarPainel();

            await carregar();
        }


    } catch (erro) {

        console.error(
            "Erro ao iniciar Admin:",
            erro
        );
    }
}


/* ========================================
   TELAS
======================================== */

function mostrarLogin() {

    const login =
        $("loginTela");

    const painel =
        $("painelTela");


    if (login) {

        login.style.display =
            "flex";
    }


    if (painel) {

        painel.style.display =
            "none";
    }
}


function mostrarPainel() {

    const login =
        $("loginTela");

    const painel =
        $("painelTela");


    if (login) {

        login.style.display =
            "none";
    }


    if (painel) {

        painel.style.display =
            "block";
    }
}


/* ========================================
   CARREGAR PRODUTOS
======================================== */

async function carregar() {

    const mensagem =
        $("mensagem");


    if (mensagem) {

        mensagem.textContent =
            "Carregando produtos...";
    }


    const {
        data,
        error
    } =
        await db
            .from("produtos")
            .select("*")
            .order("id");


    if (error) {

        if (mensagem) {

            mensagem.textContent =
                "Erro: " +
                error.message;
        }


        console.error(error);

        return;
    }


    produtos =
        data || [];


    $("total").textContent =
        produtos.length;


    $("ativos").textContent =
        produtos.filter(
            p => p.ativo !== false
        ).length;


    $("inativos").textContent =
        produtos.filter(
            p => p.ativo === false
        ).length;


    render();


    if (mensagem) {

        mensagem.textContent =
            produtos.length +
            " produtos carregados.";
    }
}


/* ========================================
   RENDERIZAR PRODUTOS
======================================== */

function render() {

    const busca =
        $("busca");


    const listaElement =
        $("lista");


    if (!busca || !listaElement) {

        return;
    }


    const termo =
        busca.value
            .toLowerCase()
            .trim();


    const lista =
        produtos.filter(p => {

            const texto = [

                p.nome,
                p.categoria,
                p.marca,
                p.codigo

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            return texto.includes(termo);
        });


    listaElement.innerHTML =

        lista.map(p => {

            const preco =
                Number(
                    p.preco || 0
                ).toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                );


            return `

                <tr>

                    <td>
                        ${p.id}
                    </td>


                    <td>
                        <b>
                            ${esc(p.nome)}
                        </b>
                    </td>


                    <td>
                        ${esc(
                            p.categoria || "—"
                        )}
                    </td>


                    <td>
                        ${preco}
                    </td>


                    <td>

                        <span
                            class="status ${
                                p.ativo !== false
                                    ? "ok"
                                    : "off"
                            }"
                        >

                            ${
                                p.ativo !== false
                                    ? "Ativo"
                                    : "Inativo"
                            }

                        </span>

                    </td>


                    <td>

                        <button
                            class="editar"
                            onclick="editar(${p.id})"
                        >
                            Editar
                        </button>


                        <button
                            class="excluir"
                            onclick="excluir(${p.id})"
                        >
                            Excluir
                        </button>

                    </td>

                </tr>

            `;

        }).join("")


        ||

        `
            <tr>
                <td colspan="6">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
}


/* ========================================
   ESCAPAR TEXTO
======================================== */

function esc(valor) {

    return String(valor)
        .replace(
            /[&<>"']/g,
            caractere => {

                const mapa = {

                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"
                };


                return mapa[
                    caractere
                ];
            }
        );
}


/* ========================================
   ABRIR PRODUTO
======================================== */

function abrir(produto) {

    $("id").value =
        produto?.id || "";


    $("nome").value =
        produto?.nome || "";


    $("descricao").value =
        produto?.descricao || "";


    $("preco").value =
        produto?.preco ?? "";


    $("preco_anterior").value =
        produto?.preco_anterior ?? "";


    $("marca").value =
        produto?.marca || "";


    $("categoria").value =
        produto?.categoria || "";


    $("peso").value =
        produto?.peso || "";


    $("unidade").value =
        produto?.unidade || "";


    $("codigo").value =
        produto?.codigo || "";


    $("imagem").value =
        produto?.imagem || "";


    $("ativo").checked =
        produto
            ? produto.ativo !== false
            : true;


    $("destaque").checked =
        produto?.destaque === true;


    $("titulo").textContent =
        produto
            ? "Editar produto"
            : "Novo produto";


    $("modal")
        .classList
        .add("aberto");
}


/* ========================================
   EDITAR
======================================== */

window.editar = id => {

    const produto =
        produtos.find(
            p =>
                Number(p.id) ===
                Number(id)
        );


    if (produto) {

        abrir(produto);
    }
};


/* ========================================
   EXCLUIR
======================================== */

window.excluir = async id => {

    const produto =
        produtos.find(
            p =>
                Number(p.id) ===
                Number(id)
        );


    if (!produto) {

        return;
    }


    if (
        !confirm(
            "Excluir " +
            produto.nome +
            "?"
        )
    ) {

        return;
    }


    const {
        error
    } =
        await db
            .from("produtos")
            .delete()
            .eq("id", id);


    if (error) {

        alert(
            error.message
        );

        return;
    }


    await carregar();
};


/* ========================================
   SALVAR PRODUTO
======================================== */

/* ========================================
   SALVAR PRODUTO
======================================== */

$("form").onsubmit =
    async evento => {

        evento.preventDefault();


        const id =
            $("id").value;


        /* ====================================
           NORMALIZAÇÃO DA CATEGORIA
        ==================================== */

        const normalizarCategoria =
            valor => {

                return String(valor ?? "")
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    )
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim()
                    .toLowerCase();

            };


        const categoriaDigitada =
            $("categoria")
                .value
                .trim();


        const categoriaNormalizada =
            normalizarCategoria(
                categoriaDigitada
            );


        /* ====================================
           ENCONTRAR CATEGORIA EXISTENTE
        ==================================== */

        const categoriasExistentes =
            [
                ...new Set(
                    produtos
                        .map(
                            produto =>
                                produto.categoria
                        )
                        .filter(Boolean)
                )
            ];


        const tornarSingular =
            categoria => {

                let resultado =
                    String(categoria);


                const partes =
                    resultado.split(" ");


                if (
                    partes.length === 0
                ) {

                    return resultado;

                }


                const ultima =
                    partes[
                        partes.length - 1
                    ];


                /*
                 * Plurais irregulares
                 */

                const irregulares = {

                    paes: "pao",

                    maes: "mao",

                    cafés: "cafe"

                };


                const ultimaNormalizada =
                    normalizarCategoria(
                        ultima
                    );


                if (
                    ultimaNormalizada ===
                    "paes"
                ) {

                    partes[
                        partes.length - 1
                    ] = "pao";

                    return partes.join(" ");

                }


                /*
                 * Plural terminado em "s"
                 */

                if (
                    ultimaNormalizada.endsWith("s") &&
                    ultimaNormalizada.length > 3
                ) {

                    partes[
                        partes.length - 1
                    ] =
                        ultimaNormalizada.slice(
                            0,
                            -1
                        );

                }


                return partes.join(" ");

            };


        const categoriaExistente =
            categoriasExistentes.find(
                categoria => {

                    const categoriaAtual =
                        normalizarCategoria(
                            categoria
                        );


                    const categoriaSingular =
                        tornarSingular(
                            categoria
                        );


                    const digitadaSingular =
                        tornarSingular(
                            categoriaDigitada
                        );


                    return (

                        categoriaAtual ===
                        categoriaNormalizada

                        ||

                        categoriaSingular ===
                        categoriaNormalizada

                        ||

                        categoriaSingular ===
                        digitadaSingular

                    );

                }
            );


        /*
         * Se encontrou uma categoria existente,
         * mantém exatamente a escrita oficial
         * que já existe no banco.
         *
         * Se não encontrou, cria uma nova.
         */

        const categoriaFinal =
            categoriaExistente
                ? categoriaExistente
                : categoriaDigitada;


        /* ====================================
           DADOS DO PRODUTO
        ==================================== */

        const dados = {

            nome:
                $("nome")
                    .value
                    .trim(),


            descricao:
                $("descricao")
                    .value
                    .trim(),


            preco:
                Number(
                    $("preco")
                        .value
                ),


            preco_anterior:

                $("preco_anterior")
                    .value

                    ?

                    Number(
                        $("preco_anterior")
                            .value
                    )

                    :

                    null,


            marca:
                $("marca")
                    .value
                    .trim()
                    || null,


            categoria:
                categoriaFinal,


            peso:
                $("peso")
                    .value
                    .trim()
                    || null,


            unidade:
                $("unidade")
                    .value
                    .trim()
                    || null,


            codigo:
                $("codigo")
                    .value
                    .trim()
                    || null,


            imagem:
                $("imagem")
                    .value
                    .trim()
                    || null,


            ativo:
                $("ativo").checked,


            destaque:
                $("destaque").checked

        };


        let resultado;


        if (id) {

            resultado =
                await db
                    .from("produtos")
                    .update(dados)
                    .eq("id", id);

        } else {

            resultado =
                await db
                    .from("produtos")
                    .insert(dados);

        }


        if (resultado.error) {

            alert(
                resultado.error.message
            );

            return;
        }


        fechar();


        await carregar();

    };

/* ========================================
   MODAL
======================================== */

function fechar() {

    $("modal")
        .classList
        .remove("aberto");
}


$("fechar").onclick =
    fechar;


$("cancelar").onclick =
    fechar;


$("novo").onclick =
    () => abrir();


$("busca").oninput =
    render;


/* ========================================
   SAIR
======================================== */

$("sair").onclick =
    async () => {

        await db.auth.signOut();


        produtos = [];


        $("lista").innerHTML =
            "";


        $("total").textContent =
            "0";


        $("ativos").textContent =
            "0";


        $("inativos").textContent =
            "0";


        mostrarLogin();


        $("loginMensagem").textContent =
            "Sessão encerrada.";
    };


/* ========================================
   LOGIN
======================================== */

$("loginForm").onsubmit =
    async evento => {

        evento.preventDefault();


        const email =
            $("loginEmail")
                .value
                .trim();


        const senha =
            $("loginSenha")
                .value;


        $("loginMensagem").textContent =
            "Entrando...";


        const {
            error
        } =
            await db.auth
                .signInWithPassword({

                    email,
                    password: senha

                });


        if (error) {

            console.error(error);


            $("loginMensagem")
                .textContent =
                    "Erro: " +
                    error.message;


            return;
        }


        $("loginMensagem")
            .textContent =
                "Login realizado!";


        mostrarPainel();


        await carregar();
    };


/* ========================================
   INICIAR
======================================== */

iniciar();
