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
   TELAS
======================================== */

function mostrarLogin() {

    $("loginTela").style.display = "flex";
    $("painelTela").style.display = "none";

}


function mostrarPainel() {

    $("loginTela").style.display = "none";
    $("painelTela").style.display = "block";

}


/* ========================================
   INICIALIZAÇÃO
======================================== */

async function iniciar() {

    // Começa sempre mostrando o login.
    // Assim o painel nunca fica aparecendo
    // enquanto a sessão está sendo verificada.

    mostrarLogin();

    try {

        const resultado =
            await db.auth.getSession();

        if (resultado.error) {

            console.error(
                "Erro ao verificar sessão:",
                resultado.error
            );

            $("loginMensagem").textContent =
                "Não foi possível verificar a sessão.";

            return;
        }

        const session =
            resultado.data?.session;

        if (!session) {
            return;
        }

        mostrarPainel();

        await carregar();

    } catch (erro) {

        console.error(
            "Erro ao iniciar Admin:",
            erro
        );

        mostrarLogin();

        $("loginMensagem").textContent =
            "Erro ao iniciar o administrador.";

    }

}


/* ========================================
   PRODUTOS
======================================== */

async function carregar() {

    $("mensagem").textContent =
        "Carregando produtos...";

    try {

        const resultado =
            await db
                .from("produtos")
                .select("*")
                .order("id");

        const data =
            resultado.data;

        const error =
            resultado.error;

        if (error) {

            $("mensagem").textContent =
                "Erro: " + error.message;

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

        $("mensagem").textContent =
            produtos.length +
            " produtos carregados.";

    } catch (erro) {

        console.error(
            "Erro ao carregar produtos:",
            erro
        );

        $("mensagem").textContent =
            "Erro ao carregar produtos.";

    }

}


/* ========================================
   RENDER
======================================== */

function render() {

    const termo =
        $("busca").value
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


    $("lista").innerHTML =

        lista.map(p => {

            const preco =
                Number(p.preco || 0)
                    .toLocaleString(
                        "pt-BR",
                        {
                            style: "currency",
                            currency: "BRL"
                        }
                    );


            return `
                <tr>

                    <td>${p.id}</td>

                    <td>
                        <b>${esc(p.nome)}</b>
                    </td>

                    <td>
                        ${esc(p.categoria || "—")}
                    </td>

                    <td>
                        ${preco}
                    </td>

                    <td>

                        <span
                            class="status ${p.ativo !== false ? "ok" : "off"}"
                        >
                            ${p.ativo !== false
                                ? "Ativo"
                                : "Inativo"}
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

        "<tr><td colspan='6'>Nenhum produto encontrado.</td></tr>";

}


/* ========================================
   ESCAPE HTML
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

                return mapa[caractere];

            }
        );

}


/* ========================================
   FORMULÁRIO PRODUTO
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


    if (
        !produto ||
        !confirm(
            "Excluir " +
            produto.nome +
            "?"
        )
    ) {

        return;

    }


    const resultado =
        await db
            .from("produtos")
            .delete()
            .eq("id", id);


    if (resultado.error) {

        alert(
            resultado.error.message
        );

        return;

    }


    await carregar();

};


/* ========================================
   SALVAR PRODUTO
======================================== */

$("form").onsubmit =
    async evento => {

        evento.preventDefault();


        const id =
            $("id").value;


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
                    $("preco").value
                ),

            preco_anterior:
                $("preco_anterior").value
                    ? Number(
                        $("preco_anterior").value
                    )
                    : null,

            marca:
                $("marca")
                    .value
                    .trim()
                    || null,

            categoria:
                $("categoria")
                    .value
                    .trim(),

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


        const resultado = id

            ? await db
                .from("produtos")
                .update(dados)
                .eq("id", id)

            : await db
                .from("produtos")
                .insert(dados);


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
   LOGOUT
======================================== */

$("sair").onclick =
    async () => {

        await db.auth.signOut();

        produtos = [];

        $("lista").innerHTML = "";

        $("total").textContent = "0";
        $("ativos").textContent = "0";
        $("inativos").textContent = "0";

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


        const resultado =
            await db.auth.signInWithPassword({

                email,
                password: senha

            });


        if (resultado.error) {

            console.error(
                resultado.error
            );

            $("loginMensagem").textContent =
                "Erro: " +
                resultado.error.message;

            return;

        }


        $("loginMensagem").textContent =
            "Login realizado!";


        mostrarPainel();

        await carregar();

    };


/* ========================================
   INICIAR
======================================== */

iniciar();
