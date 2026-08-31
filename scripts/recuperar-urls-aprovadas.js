const fs = require("fs");

const ARQUIVO = "data/produtos.json";
const produtos = JSON.parse(fs.readFileSync(ARQUIVO, "utf8"));

const imagens = {

  "Wrap sem Glúten":
    "https://images.tcdn.com.br/img/img_prod/1025031/wrap_casa_rigani_240g_sem_gluten_ovos_soja_leite_e_vegano_691_1_e950a5c368ec9a36c5917fcac2a6415a.png",

  "Chips de Batata-Doce com Sal Rosa do Himalaia":
    "https://images.tcdn.com.br/img/img_prod/1061514/chips_de_batata_doce_original_40g_nazinha_10504_1_1ea5792649ecad6be8ee3b2f12f2c3fb.png",

  "Water Timber's Zero Pistache":
    "https://http2.mlstatic.com/D_NQ_NP_2X_719089-MLA99803362037_112025-F.webp",

  "Nuts & Fruits Cranberry":
    "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/ubzekved/pk-banana-com-choco.png",

  "Goiabinha Cremosa Zero":
    "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/yelnegzp/9d740dce-afba-447b-9f00-7381bf853525.png",

  "Choco Wheyfer Chocolate com Avelã":
    "https://acdn-us.mitiendanube.com/stores/005/697/238/products/01-claim_proteina-yk11jp4dw2-76b8f8a4e4e4f80ab817455294026936-1024-1024.webp",

  "Choco Wheyfer Cookies'n Cream":
    "https://acdn-us.mitiendanube.com/stores/005/697/238/products/01-claim_proteina-1-68u52zgtrr-c2865b714263b24b6a17455293640168-1024-1024.webp",

  "Protein Max Chocolate & Nibs":
    "https://storetheme.vtexassets.com/unsafe/800x800/center/middle/https%3A%2F%2Fsantaluzia.vtexassets.com%2Farquivos%2Fids%2F1005943%2F3030490.png%3Fv%3D639066075750130000",

  "Wafer Cappuccino":
    "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/phbufoyu/lp-barra-wafer-cappuccino.png",

  "Wafer Creme de Avelã":
    "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/lojalatamfit/media/uploads/produtos/foto/agpxlhlx/lp-wafer-avela-1.png",

  "Paçoquinha Zero Adição de Açúcares":
    "https://img.irroba.com.br/fit-in/600x600/filters:format(webp):fill(fff):quality(80)/aironcom/catalog/pacoca-individual-quadrada-1000x1000px.jpg",

  "Mel Flores Silvestres":
    "https://images.tcdn.com.br/img/img_prod/584955/mel_de_flores_silvestres_em_sache_35g_211_1_9539578ead450413390f3e056f622845.jpg",

  "Extrato de Própolis Glicólico":
    "https://images.tcdn.com.br/img/img_prod/584955/extrato_de_propolis_verde_em_solucao_glicolica_30ml_299_1_0887eac5ce13c4133457288099fab20e.jpg",

  "Spray de Mel com Própolis, Romã e Gengibre":
    "https://images.tcdn.com.br/img/img_prod/584955/spray_composto_de_mel_com_extrato_de_propolis_extrato_fluido_de_roma_e_gengibre_em_frasco_pet_ambar__429_1_f57e529ebf4b87b3d147139aaebc41d3.jpg",

  "Verdprópolis — Extrato de Própolis Verde":
    "https://www.faunaeflora.com.br/cdn/shop/files/propolis-alecrim-do-campo-15.webp?v=1778179531&width=713",

  "Redprópolis — Extrato de Própolis Vermelho":
    "https://www.faunaeflora.com.br/cdn/shop/files/red-propolis-rabo-de-bugio-15.webp?v=1778181017&width=713",

  "Óleo de Linhaça":
    "https://http2.mlstatic.com/D_NQ_NP_2X_647596-MLB46783522215_072021-F-oleo-de-linhaca-1000-mg-100-capsulas--chamed.webp",

  "Chlorella":
    "https://images.tcdn.com.br/img/img_prod/745295/clorella_500mg_100_capsulas_chamel_1471_1_d5dba0cf7602694eb87997256f2f7d93.jpg",

  "Amora":
    "https://http2.mlstatic.com/D_NQ_NP_2X_700267-MLB113423757163_062026-F-amora-100-capsulas-600mg-chamel.webp",

  "Tâmara com Colágeno":
    "https://http2.mlstatic.com/D_NQ_NP_2X_629389-MLA107404073562_032026-F-barrinhas-de-tamara-com-colageno-verisol-12-un-nature-food.webp",

  "Mulungu":
    "https://images.tcdn.com.br/img/img_prod/971897/mulungu_em_cpsula_500mg_60caps_ninho_verde_1_20260303153558_b71506d145d1.jpg",

  "Crush Bar Morango":
    "https://acdn-us.mitiendanube.com/stores/005/697/238/products/74-65821e865f1865c37017575152457342-1024-1024.webp",

  "Stroopwafel Wafel Holandês":
    "https://http2.mlstatic.com/D_NQ_NP_2X_987597-MLB109355188421_032026-F-moinho-wafers-stroopwafel-biscoito-wafel-holandes-28g.webp",

  "Muma Biscoito de Arroz Chocolate Zero":
    "https://mumasnacks.com.br/cdn/shop/files/Muma_Frente_Arroz_Chocolate_Zero_1.png?v=1780503468&width=1200",

  "Muma Biscoito de Milho Mediterrâneo":
    "https://mumasnacks.com.br/cdn/shop/files/Muma_Frente_Milho_Mediterraneo_sombra_5.png?v=1767952070&width=1200",

  "Muma Biscoito de Milho Ervas Finas e Azeite":
    "https://mumasnacks.com.br/cdn/shop/files/Muma_Frente_Milho_Ervas_Finas_sombra_3.png?v=1767952234&width=1200",

  "Repeat Snack Alga Marinha Original":
    "https://http2.mlstatic.com/D_NQ_NP_2X_919182-MLB104793039106_012026-F-snack-de-alga-marinha-original-5g-repeat.webp",

  "Bananinha sem Adição de Açúcar":
    "https://http2.mlstatic.com/D_NQ_NP_2X_829390-MLB110126899205_042026-F-bananinha-paraibuna-sem-acucar-vegana-460g-zero-natural.webp",

  "Doce de Banana sem Adição de Açúcares":
    "https://http2.mlstatic.com/D_NQ_NP_2X_965500-MLB93211948099_092025-F-doce-banana-zero-adicao-acucar-bananinha-cremosa-21-unidades.webp",

  "Bananinha Coberta com Chocolate":
    "https://www.tachao.com.br/cdn/shop/files/tachaoubatuba_bananinhachocolate_200g_mockup.png?v=1725044431&width=600",

  "Bananinha com Canela":
    "https://www.tachao.com.br/cdn/shop/files/tachaoubatuba_bananinhacanela_200g_mockup.png?v=1725044431&width=600"
};

let novas = 0;
let existentes = 0;
let faltantes = 0;

for (const [nome, url] of Object.entries(imagens)) {

  const produto = produtos.find(p =>
    p.nome === nome || p.nome.startsWith(nome)
  );

  if (!produto) {
    console.log(`⚠️ NÃO ENCONTRADO: ${nome}`);
    faltantes++;
    continue;
  }

  if (produto.imagem) {
    console.log(`⏭️ Já cadastrado: ${produto.nome}`);
    existentes++;
    continue;
  }

  produto.imagem = url;
  console.log(`✅ IMPORTADO: ${produto.nome}`);
  novas++;
}

fs.writeFileSync(
  ARQUIVO,
  JSON.stringify(produtos, null, 2),
  "utf8"
);

console.log("");
console.log("==========================================");
console.log(" RECUPERAÇÃO COMPLETA");
console.log("==========================================");
console.log(`Novas imagens: ${novas}`);
console.log(`Já existentes: ${existentes}`);
console.log(`Não encontrados: ${faltantes}`);
console.log(`Total produtos: ${produtos.length}`);
console.log(`Com imagem: ${produtos.filter(p => p.imagem).length}`);
console.log(`Sem imagem: ${produtos.filter(p => !p.imagem).length}`);
console.log("==========================================");
