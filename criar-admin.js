const fs = require("fs");

console.log("\n==========================================");
console.log(" CATALYST — ADMIN | ETAPA 2");
console.log("==========================================\n");

for (const arquivo of ["admin.html", "admin.css", "admin.js"]) {
    if (fs.existsSync(arquivo)) {
        fs.copyFileSync(
            arquivo,
            arquivo + ".backup-etapa2-antes-painel"
        );
        console.log("✅ Backup:", arquivo);
    }
}

/* =========================
   ADMIN.HTML
========================= */

fs.writeFileSync("admin.html", `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cantinho Bom — Administração</title>
<link rel="stylesheet" href="admin.css">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>

<body>

<header>
    <div>
        <h1>CANTINHO BOM</h1>
        <small>Administração do catálogo</small>
    </div>

    <button id="sair">Sair</button>
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

<div id="modal">

    <div class="modal-box">

        <button id="fechar">×</button>

        <h2 id="titulo">Novo produto</h2>

        <form id="form">

            <input type="hidden" id="id">

            <label>
                Nome
                <input id="nome" required>
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
                    <input id="categoria" required>
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
                <input type="checkbox" id="ativo" checked>
                Produto ativo
            </label>

            <label class="check">
                <input type="checkbox" id="destaque">
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
</html>`, "utf8");


/* =========================
   ADMIN.CSS
========================= */

fs.writeFileSync("admin.css", `* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: #f5f5f5;
    font-family: Arial, sans-serif;
    color: #222;
}

header {
    background: #111;
    color: white;
    padding: 18px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header h1 {
    margin: 0;
    font-size: 22px;
    letter-spacing: 2px;
}

header small {
    color: #aaa;
}

header button {
    background: white;
    border: 0;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
}

main {
    max-width: 1400px;
    margin: auto;
    padding: 25px;
}

.resumo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-bottom: 20px;
}

.resumo div {
    background: white;
    padding: 20px;
    border-radius: 12px;
}

.resumo span {
    display: block;
    color: #777;
}

.resumo strong {
    font-size: 30px;
}

.barra {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.barra input {
    flex: 1;
    padding: 13px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.barra button {
    background: #111;
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
}

.tabela {
    background: white;
    border-radius: 12px;
    overflow: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 13px;
    border-bottom: 1px solid #eee;
    text-align: left;
    white-space: nowrap;
}

th {
    color: #666;
    font-size: 13px;
}

.editar {
    background: #eee;
}

.excluir {
    background: #f3dddd;
    color: #922;
}

.status {
    padding: 5px 9px;
    border-radius: 20px;
    font-size: 12px;
}

.ok {
    background: #e4f5e9;
    color: #18743a;
}

.off {
    background: #f5e1e1;
    color: #922;
}

#modal {
    display: none;
    position: fixed;
    inset: 0;
    background: #0008;
    align-items: center;
    justify-content: center;
    padding: 15px;
}

#modal.aberto {
    display: flex;
}

.modal-box {
    background: white;
    width: min(650px, 100%);
    max-height: 95vh;
    overflow: auto;
    border-radius: 14px;
    padding: 25px;
    position: relative;
}

.modal-box > button {
    position: absolute;
    right: 10px;
    top: 8px;
    background: none;
    border: 0;
    font-size: 25px;
    cursor: pointer;
}

label {
    display: block;
    margin: 12px 0;
    font-weight: bold;
}

label input,
label textarea {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 7px;
}

label textarea {
    min-height: 80px;
}

.dupla {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.check {
    display: flex;
    gap: 8px;
    align-items: center;
}

.check input {
    width: auto;
}

.acoes {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.acoes button {
    padding: 10px 16px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
}

.acoes button:last-child {
    background: #111;
    color: white;
}

@media (max-width: 700px) {

    .resumo {
        grid-template-columns: 1fr;
    }

    .dupla {
        grid-template-columns: 1fr;
    }
}`, "utf8");


/* =========================
   ADMIN.JS
========================= */

fs.writeFileSync("admin.js", `const SUPABASE_URL =
    "https://dgmayntwsxietmmaxx.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_93yBqwhbdT45ac0ib2pvpg_g05EJGla";

const db =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

let produtos = [];

const $ = id =>
    document.getElementById(id);


async function iniciar() {

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) {
        location.href = "admin.html";
        return;
    }

    carregar();
}


async function carregar() {

    $("mensagem").textContent =
        "Carregando produtos...";

    const { data, error } =
        await db
            .from("produtos")
            .select("*")
            .order("id");

    if (error) {

        $("mensagem").textContent =
            "Erro: " + error.message;

        console.error(error);

        return;
    }

    produtos = data || [];

    $("total").textContent =
        produtos.length;

    $("ativos").textContent =
        produtos.filter(p => p.ativo).length;

    $("inativos").textContent =
        produtos.filter(p => !p.ativo).length;

    render();

    $("mensagem").textContent =
        produtos.length +
        " produtos carregados.";
}


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

            return \`
                <tr>

                    <td>\${p.id}</td>

                    <td>
                        <b>\${esc(p.nome)}</b>
                    </td>

                    <td>
                        \${esc(p.categoria || "—")}
                    </td>

                    <td>
                        \${preco}
                    </td>

                    <td>
                        <span class="status \${p.ativo ? "ok" : "off"}">
                            \${p.ativo ? "Ativo" : "Inativo"}
                        </span>
                    </td>

                    <td>

                        <button
                            class="editar"
                            onclick="editar(\${p.id})"
                        >
                            Editar
                        </button>

                        <button
                            class="excluir"
                            onclick="excluir(\${p.id})"
                        >
                            Excluir
                        </button>

                    </td>

                </tr>
            \`;

        }).join("")
        ||
        "<tr><td colspan='6'>Nenhum produto encontrado.</td></tr>";
}


function esc(valor) {

    return String(valor)
        .replace(/[&<>"']/g, caractere => {

            const mapa = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return mapa[caractere];

        });
}


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


window.editar = id => {

    const produto =
        produtos.find(
            p => Number(p.id) === Number(id)
        );

    if (produto) {
        abrir(produto);
    }
};


window.excluir = async id => {

    const produto =
        produtos.find(
            p => Number(p.id) === Number(id)
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

    const { error } =
        await db
            .from("produtos")
            .delete()
            .eq("id", id);

    if (error) {

        alert(error.message);

        return;
    }

    carregar();
};


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

        carregar();
    };


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


$("sair").onclick =
    async () => {

        await db.auth.signOut();

        location.href =
            "admin.html";
    };


iniciar();
`, "utf8");


console.log("\n==========================================");
console.log(" ADMIN ETAPA 2 CRIADO");
console.log("==========================================\n");

console.log("✅ admin.html");
console.log("✅ admin.css");
console.log("✅ admin.js");
console.log("✅ Backups criados");
console.log("✅ Compacta NÃO alterada");
console.log("✅ produtos NÃO alterados");

console.log("\nAgora execute:");
console.log("node admin-teste.js");

console.log("\n==========================================\n");
