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

                const partes =
                    String(categoria)
                        .split(" ");


                if (
                    partes.length === 0
                ) {

                    return "";

                }


                const ultima =
                    partes[
                        partes.length - 1
                    ];


                const ultimaNormalizada =
                    normalizarCategoria(
                        ultima
                    );


                /*
                 * Pão / Pães
                 */

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
           PREPARAR IMAGEM
        ==================================== */

        const campoImagem =
            $("imagem");


        const campoArquivo =
            $("imagemArquivo");


        let imagemFinal =
            campoImagem
                .value
                .trim()
                || null;


        let novoArquivoPath =
            null;


        const arquivo =
            campoArquivo?.files?.[0];


        /* ====================================
           UPLOAD DE NOVA IMAGEM
        ==================================== */

        if (arquivo) {

            /*
             * Verifica se realmente é uma imagem.
             */

            if (
                !arquivo.type.startsWith("image/")
            ) {

                alert(
                    "Escolha um arquivo de imagem válido."
                );

                return;

            }


            /*
             * Limite de 5 MB.
             */

            const limite =
                5 * 1024 * 1024;


            if (
                arquivo.size > limite
            ) {

                alert(
                    "A imagem deve ter no máximo 5 MB."
                );

                return;

            }


            /* ====================================
               CRIAR NOME SEGURO
            ==================================== */

            const extensao =
                arquivo.name
                    .split(".")
                    .pop()
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]/g,
                        ""
                    )
                    || "jpg";


            const nomeBase =
                arquivo.name
                    .replace(
                        /\.[^/.]+$/,
                        ""
                    )
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    )
                    .replace(
                        /[^a-zA-Z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /^-+|-+$/g,
                        ""
                    )
                    .toLowerCase()
                    || "produto";


            novoArquivoPath =
                `${nomeBase}-${Date.now()}.${extensao}`;


            /* ====================================
               ENVIAR PARA SUPABASE STORAGE
            ==================================== */

            const upload =
                await db.storage
                    .from("produtos")
                    .upload(
                        novoArquivoPath,
                        arquivo,
                        {
                            cacheControl: "3600",
                            upsert: false,
                            contentType:
                                arquivo.type
                        }
                    );


            if (upload.error) {

                alert(
                    "Erro ao enviar imagem: " +
                    upload.error.message
                );

                return;

            }


            /* ====================================
               PEGAR URL PÚBLICA
            ==================================== */

            const imagemPublica =
                db.storage
                    .from("produtos")
                    .getPublicUrl(
                        novoArquivoPath
                    );


            imagemFinal =
                imagemPublica
                    .data
                    .publicUrl;

        }


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
                imagemFinal,


            ativo:
                $("ativo").checked,


            destaque:
                $("destaque").checked

        };


        /* ====================================
           SALVAR NO BANCO
        ==================================== */

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


        /* ====================================
           ERRO AO SALVAR PRODUTO
        ==================================== */

        if (resultado.error) {

            /*
             * Se o upload foi feito mas o produto
             * não conseguiu ser salvo, remove
             * o arquivo novo para não deixar
             * arquivo abandonado no Storage.
             */

            if (novoArquivoPath) {

                await db.storage
                    .from("produtos")
                    .remove([
                        novoArquivoPath
                    ]);

            }


            alert(
                resultado.error.message
            );

            return;

        }


        /* ====================================
           REMOVER IMAGEM ANTIGA DO STORAGE
           SOMENTE QUANDO HOUVER SUBSTITUIÇÃO
        ==================================== */

        if (
            id &&
            novoArquivoPath
        ) {

            const produtoAnterior =
                produtos.find(
                    produto =>
                        Number(produto.id) ===
                        Number(id)
                );


            const imagemAnterior =
                produtoAnterior?.imagem;


            /*
             * Só remove a imagem antiga se ela
             * pertence ao nosso próprio bucket.
             *
             * URLs externas nunca são removidas.
             */

            if (
                imagemAnterior &&
                imagemAnterior.includes(
                    "/storage/v1/object/public/produtos/"
                )
            ) {

                try {

                    const parte =
                        imagemAnterior.split(
                            "/storage/v1/object/public/produtos/"
                        )[1];


                    if (parte) {

                        await db.storage
                            .from("produtos")
                            .remove([
                                decodeURIComponent(
                                    parte
                                )
                            ]);

                    }

                } catch (erro) {

                    console.warn(
                        "Não foi possível remover a imagem antiga:",
                        erro
                    );

                }

            }

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
