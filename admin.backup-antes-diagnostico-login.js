const SUPABASE_URL =
    "https://dgmayntwsxietmmaxx.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_93yBqwhbdT45ac0ib2pvpg_g05EJGla";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


const formLogin =
    document.getElementById("formLogin");

const email =
    document.getElementById("email");

const senha =
    document.getElementById("senha");

const mensagem =
    document.getElementById("mensagem");

const btnLogin =
    document.getElementById("btnLogin");


formLogin.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();

        const emailValor =
            email.value.trim();

        const senhaValor =
            senha.value;

        mensagem.textContent =
            "Entrando...";

        btnLogin.disabled =
            true;

        const {
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({

                    email: emailValor,

                    password: senhaValor

                });


        if (error) {

            console.error(error);

            mensagem.textContent =
                "E-mail ou senha incorretos.";

            btnLogin.disabled =
                false;

            return;
        }


        mensagem.textContent =
            "Login realizado!";


        /*
         * Por enquanto vamos apenas
         * confirmar que a autenticação
         * funciona.
         *
         * O painel de produtos será
         * construído na próxima etapa.
         */

        setTimeout(() => {

            alert(
                "Login realizado com sucesso!"
            );

        }, 100);

        btnLogin.disabled =
            false;

    }
);
