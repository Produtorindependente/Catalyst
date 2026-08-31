const fs = require("fs");

const htmlFile = "admin.html";
const jsFile = "admin.js";

console.log("");
console.log("==========================================");
console.log(" CATALYST — CORREÇÃO DEFINITIVA DO ADMIN");
console.log(" LOGIN + PAINEL");
console.log("==========================================");
console.log("");

/* BACKUPS */
for (const arquivo of [htmlFile, jsFile]) {
    fs.copyFileSync(
        arquivo,
        arquivo + ".backup-login-definitivo"
    );

    console.log("✅ Backup:", arquivo);
}

/* ========================================
   ADMIN.HTML
======================================== */

const html = `<!DOCTYPE html>
<html lang="pt-BR">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cantinho Bom — Administração</title>

<link rel="stylesheet" href="admin.css">

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>

<body>

<!-- =========================
     LOGIN
========================= -->

<section id="loginTela" class="login-tela">

    <div class="login-box">

        <h1>CANTINHO BOM</h1>

        <p>Administração do catálogo</p>

        <form id="loginForm">

            <label>
                E-mail
                <input
                    id="loginEmail"
                    type="email"
                    autocomplete="username"
                    required
                >
            </label>

            <label>
                Senha
                <input
                    id="loginSenha"
                    type="password"
                    autocomplete="current-password"
                    required
                >
            </label>

            <button type="submit">
                Entrar
            </button>

            <p id="loginMensagem"></p>

        </form>

    </div>

</section>


<!-- =========================
     PAINEL
========================= -->

<section id="painelTela" class="painel-tela">

<header>

    <div>
        <h1>CANTINHO BOM</h1>
        <small>Administração do catálogo</small>
    </div>

    <button id="sair">
        Sair
    </button>

</header>

<main>

    <section class="resumo">

        <div>
            <span>Total</span>
            <strong id="total">0</strong>
        </div>

        <div>
            <span>Ativos</span>
            <strong id="ativos">0</strong>
        </div>

        <div>
            <span>Inativos</span>
            <strong id="inativos">0</strong>
        </div>

    </section>


    <section class="barra">

        <input
            id="busca"
            type="search"
            placeholder="Buscar produto..."
        >

        <button id="novo">
            + Novo produto
        </button>

    </section>


    <p id="mensagem"></p>


    <section class="tabela">

        <table>

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>

            </thead>

            <tbody id="lista"></tbody>

        </table>

    </section>

</main>


<!-- MODAL -->

<div id="modal">

    <div class="modal-box">

        <button id="fechar">
            ×
        </button>

        <h2 id="titulo">
            Novo produto
        </h2>

        <form id="form">

            <input
                type="hidden"
                id="id"
            >

            <label>
                Nome
                <input
                    id="nome"
                    required
                >
            </label>

            <label>
                Descrição
                <textarea id="descricao"></textarea>
            </label>

            <div class="dupla">

                <label>
                    Preço
                    <input
                        id="preco"
                        type="number"
                        step="0.01"
                        required
                    >
                </label>

                <label>
                    Preço anterior
                    <input
                        id="preco_anterior"
                        type="number"
                        step="0.01"
                    >
                </label>

            </div>

            <div class="dupla">

                <label>
                    Marca
                    <input id="marca">
                </label>

                <label>
                    Categoria
                    <input
                        id="categoria"
                        required
                    >
                </label>

            </div>

            <div class="dupla">

                <label>
                    Peso
                    <input id="peso">
                </label>

                <label>
                    Unidade
                    <input id="unidade">
                </label>

            </div>

            <label>
                Código
                <input id="codigo">
            </label>

            <label>
                Imagem
                <input id="imagem">
            </label>

            <label class="check">

                <input
                    type="checkbox"
                    id="ativo"
                    checked
                >

                Produto ativo

            </label>

            <label class="check">

                <input
                    type="checkbox"
                    id="destaque"
                >

                Produto em destaque

            </label>

            <div class="acoes">

                <button
                    type="button"
                    id="cancelar"
                >
                    Cancelar
                </button>

                <button type="submit">
                    Salvar produto
                </button>

            </div>

        </form>

    </div>

</div>


<script src="admin.js"></script>

</body>
</html>`;

fs.writeFileSync(htmlFile, html);


/* ========================================
   ADMIN.JS
======================================== */

let js = fs.readFileSync(jsFile, "utf8");

/* Remove o lock experimental */
js = js.replace(
`const db =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY,
        {
            auth: {
                lock: async (_name, _timeout, fn) => {
                    return await fn();
                }
            }
        }
    );`,
`const db =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );`
);


/* Substitui iniciar() */
const inicio = js.indexOf("async function iniciar()");
const fimInicio = js.indexOf("\n\nasync function carregar()", inicio);

if (inicio === -1 || fimInicio === -1) {
    console.log("❌ Não foi possível localizar iniciar().");
    process.exit(1);
}

const novoInicio = `async function iniciar() {

    mostrarLogin();

    try {

        const {
            data,
            error
        } = await db.auth.getSession();

        if (error) {
            console.error("Erro ao verificar sessão:", error);
            return;
        }

        if (data.session) {
            mostrarPainel();
            await carregar();
        }

    } catch (erro) {

        console.error("Erro ao iniciar Admin:", erro);

    }
}

function mostrarLogin() {

    $("loginTela").style.display = "flex";
    $("painelTela").style.display = "none";

}

function mostrarPainel() {

    $("loginTela").style.display = "none";
    $("painelTela").style.display = "block";

}
`;

js =
    js.slice(0, inicio) +
    novoInicio +
    js.slice(fimInicio);


/* ========================================
   LOGIN
======================================== */

const marcador = "\n\niniciar();";

if (!js.includes(marcador)) {
    console.log("❌ Não encontrei o final do admin.js.");
    process.exit(1);
}

const loginCodigo = `

/* ========================================
   LOGIN
======================================== */

$("loginForm").onsubmit = async (evento) => {

    evento.preventDefault();

    const email =
        $("loginEmail").value.trim();

    const senha =
        $("loginSenha").value;

    $("loginMensagem").textContent =
        "Entrando...";

    const {
        error
    } = await db.auth.signInWithPassword({
        email,
        password: senha
    });

    if (error) {

        console.error(error);

        $("loginMensagem").textContent =
            "Erro: " + error.message;

        return;
    }

    $("loginMensagem").textContent =
        "Login realizado!";

    mostrarPainel();

    await carregar();
};


`;

js = js.replace(
    marcador,
    loginCodigo + marcador
);


/* LOGOUT */
js = js.replace(
`await db.auth.signOut();

        location.href =
            "admin.html";`,
`await db.auth.signOut();

        mostrarLogin();

        $("loginMensagem").textContent =
            "Sessão encerrada.";`
);


fs.writeFileSync(jsFile, js);

console.log("");
console.log("==========================================");
console.log(" ADMIN CORRIGIDO");
console.log("==========================================");
console.log("");
console.log("✅ Tela de login criada");
console.log("✅ Painel separado do login");
console.log("✅ Sessão Supabase preservada");
console.log("✅ Login com e-mail e senha");
console.log("✅ Logout corrigido");
console.log("✅ Lock experimental removido");
console.log("✅ Produtos NÃO alterados");
console.log("✅ Catálogo compacto NÃO alterado");
console.log("✅ Banco NÃO alterado");
console.log("");
console.log("Agora teste LOCALMENTE.");
console.log("==========================================");
