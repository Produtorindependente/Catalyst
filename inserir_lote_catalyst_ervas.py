#!/usr/bin/env python3
import json
import re
import shutil
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin

JSON_PATH = Path("data/produtos.json")
IMG_DIR = Path("assets/img/produtos")
BACKUP = JSON_PATH.with_suffix(".backup_lote_ervas.json")

NOVOS = [
    {"nome":"Alho Frito Granulado","descricao":"Alho frito granulado para uso culinário.","preco":7.90,"peso":100,"unidade":"g","categoria":"Temperos Naturais","codigo":"103","imagem_fonte":"https://shopee.com.br/Alho-Frito-Desidratado-Triturado-Granulado-Flocos-100g-i.549752289.12039380041","aliases":["alho frito","alho granulado"]},
    {"nome":"Manjericão","descricao":"Manjericão desidratado para uso culinário.","preco":7.90,"peso":100,"unidade":"g","categoria":"Temperos Naturais","codigo":None,"imagem_fonte":"https://cipria.com.br/wp-content/uploads/2020/05/Manjeric%C3%A3o.jpg","aliases":["manjericao","manjericão desidratado"]},
    {"nome":"Alecrim Desidratado","descricao":"Alecrim desidratado para uso culinário e preparo de infusões.","preco":7.90,"peso":100,"unidade":"g","categoria":"Temperos Naturais","codigo":None,"imagem_fonte":"https://www.lojarelvaverde.com.br/alecrim-100g-p1088","aliases":["alecrim","alecrim seco"]},
    {"nome":"Alho em Pó","descricao":"Alho desidratado em pó para uso culinário.","preco":7.90,"peso":100,"unidade":"g","categoria":"Temperos Naturais","codigo":"102","imagem_fonte":"https://shopee.com.br/Alho-em-P%C3%B3-100g-i.662683030.16407473854","aliases":["alho em po","alho em pó"]},
    {"nome":"Flor de Sal","descricao":"Flor de sal para finalização e preparo de receitas.","preco":7.90,"peso":100,"unidade":"g","categoria":"Temperos Naturais","codigo":"1162","imagem_fonte":"https://www.emporioquatroestrelas.com.br/flor-de-sal-100g-br-spices27282-7/p","aliases":["flor do sal","sal gourmet"]},
    {"nome":"Trigo Sarraceno","descricao":"Trigo sarraceno em grãos.","preco":3.80,"peso":100,"unidade":"g","categoria":"Grãos","codigo":"190","imagem_fonte":"https://www.mercadolivre.com.br/trigo-sarraceno-em-gros-500g-trigo-mourisco/p/MLB29595815","aliases":["trigo mourisco","buckwheat"]},
    {"nome":"Canela em Pau","descricao":"Canela em pau para preparo de chás, bebidas e receitas.","preco":12.00,"peso":100,"unidade":"g","categoria":"Temperos Naturais","codigo":"246","imagem_fonte":"https://www.gruporochasaude.com/cha-de-canela-em-pau-100g/","aliases":["canela","canela em casca"]},
    {"nome":"Ginkgo Biloba","descricao":"Folhas de Ginkgo Biloba para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"232","imagem_fonte":"https://www.atacadoprodutosnaturais.com.br/produto/cha-de-ginkgo-biloba-100g/","aliases":["ginkgo","ginkgo biloba"]},
    {"nome":"Guaco","descricao":"Folhas de guaco desidratadas para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"234","imagem_fonte":"https://www.lojarelvaverde.com.br/folhas-de-guaco-100g-p1344","aliases":["folha de guaco","guaco seco"]},
    {"nome":"Chá Verde","descricao":"Chá verde em folhas para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"221","imagem_fonte":"https://www.lojarelvaverde.com.br/cha-verde-100g-p1086","aliases":["chá verde","cha verde"]},
    {"nome":"Hortelã","descricao":"Folhas de hortelã desidratadas para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"447","imagem_fonte":"https://cdn.entrypoint.directory/assets/39790/produtos/352/hortela-folha-ziplock-relva-verde-100g.jpg","aliases":["hortela","hortelã folha"]},
    {"nome":"Erva Doce","descricao":"Erva-doce em sementes para preparo de infusão e uso culinário.","preco":7.90,"peso":100,"unidade":"g","categoria":"Chás","codigo":"226","imagem_fonte":"https://natureprodutosnaturais.com.br/produtos/erva-doce-100g/","aliases":["erva doce","erva-doce","anis"]},
    {"nome":"Cavalinha","descricao":"Cavalinha desidratada para preparo de infusão.","preco":12.90,"peso":100,"unidade":"g","categoria":"Chás","codigo":"280","imagem_fonte":"https://www.lojanaturaldavila.com.br/cavalinha","aliases":["cavalinha","equisetum arvense"]},
    {"nome":"Hibisco","descricao":"Hibisco desidratado para preparo de infusão.","preco":9.90,"peso":100,"unidade":"g","categoria":"Chás","codigo":"236","imagem_fonte":"https://natureprodutosnaturais.com.br/produtos/hibisco-100g/","aliases":["hibisco","chá de hibisco"]},
    {"nome":"Capim Limão","descricao":"Capim-limão desidratado para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"113","imagem_fonte":"https://cdn.iset.io/assets/39790/produtos/329/capim-limao-ziplock-relva-verde-100g.jpg","aliases":["capim limão","capim-limao","lemongrass"]},
    {"nome":"Camomila Flor","descricao":"Flores de camomila desidratadas para preparo de infusão.","preco":9.60,"peso":100,"unidade":"g","categoria":"Chás","codigo":"214","imagem_fonte":"https://www.lojarelvaverde.com.br/camomila-100g-p735","aliases":["camomila","camomila flor"]},
    {"nome":"Folha de Maracujá","descricao":"Folhas de maracujá desidratadas para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"603","imagem_fonte":"https://www.emporioecia.com.br/produto/folha-maracuja-passiflora-passiflora-edulis-pacote-100g.html","aliases":["folha de maracuja","folhas de maracujá","passiflora"]},
    {"nome":"Melissa","descricao":"Melissa officinalis desidratada para preparo de infusão.","preco":14.90,"peso":100,"unidade":"g","categoria":"Chás","codigo":"240","imagem_fonte":"https://cdn.iset.io/assets/39790/produtos/3497/melissa-ziplock-relva-verde-130g.jpg","aliases":["melissa","melissa officinalis","erva cidreira"]},
    {"nome":"Mulungu","descricao":"Mulungu desidratado para preparo de infusão.","preco":9.90,"peso":100,"unidade":"g","categoria":"Chás","codigo":"243","imagem_fonte":"https://www.gruporochasaude.com/cha-de-mulungu-100g/","aliases":["mulungu","erythrina velutina"]},
    {"nome":"Chá Sene","descricao":"Folhas de sene para preparo de infusão.","preco":9.50,"peso":100,"unidade":"g","categoria":"Chás","codigo":"146","imagem_fonte":"https://img.daquidali.com.br/2026/cha-de-sene-para-que-serve-12.jpg","aliases":["sene","chá de sene","senna alexandrina"]},
]

def norm(v):
    if not isinstance(v, str): return ""
    trans = str.maketrans("áàãâäéèêëíìîïóòõôöúùûüç","aaaaaeeeeiiiiooooouuuuc")
    return re.sub(r"\s+", " ", v.lower().strip().translate(trans))

def safe_name(name):
    return re.sub(r"[^a-z0-9]+", "-", norm(name)).strip("-")

def get(url):
    req = Request(url, headers={"User-Agent":"Mozilla/5.0"})
    return urlopen(req, timeout=25).read()

def image_url(source):
    if source.lower().split("?")[0].endswith((".jpg",".jpeg",".png",".webp",".gif")):
        return source
    html = get(source).decode("utf-8","ignore")
    pats = [
        r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']',
        r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']twitter:image["\']',
        r'"image"\s*:\s*"([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"'
    ]
    for pat in pats:
        m = re.search(pat, html, re.I)
        if m:
            return urljoin(source, m.group(1).replace("\\/","/"))
    raise RuntimeError("imagem comercial não localizada")

def main():
    if not JSON_PATH.exists():
        print("ERRO: rode na raiz do projeto Catalyst, onde existe data/produtos.json")
        sys.exit(1)

    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        print("ERRO: data/produtos.json não é um array JSON.")
        sys.exit(1)

    shutil.copy2(JSON_PATH, BACKUP)
    IMG_DIR.mkdir(parents=True, exist_ok=True)

    existing = set()
    for p in data:
        if isinstance(p, dict):
            existing.add(norm(p.get("nome","")))
            existing.update(norm(a) for a in (p.get("aliases") or []))

    ids = [p.get("id") for p in data if isinstance(p,dict) and isinstance(p.get("id"),int)]
    next_id = max(ids, default=0) + 1
    inserted = skipped = img_ok = 0
    failed = []

    for item in NOVOS:
        if norm(item["nome"]) in existing:
            print("SKIP duplicado:", item["nome"])
            skipped += 1
            continue

        target = IMG_DIR / (safe_name(item["nome"]) + ".jpg")
        try:
            src = image_url(item["imagem_fonte"])
            target.write_bytes(get(src))
            img = str(target).replace("\\","/")
            img_ok += 1
            print("IMG OK:", item["nome"])
        except Exception as e:
            img = "assets/img/placeholder-produto.jpg"
            failed.append((item["nome"], str(e)))
            print("IMG FALHOU:", item["nome"], "-", e)

        p = {
            "id": next_id,
            "nome": item["nome"],
            "descricao": item["descricao"],
            "preco": item["preco"],
            "destaque": False,
            "peso": item["peso"],
            "unidade": item["unidade"],
            "categoria": item["categoria"],
            "imagem": img,
            "aliases": item["aliases"]
        }
        if item["codigo"] is not None:
            p["codigo"] = item["codigo"]

        data.append(p)
        existing.add(norm(item["nome"]))
        next_id += 1
        inserted += 1

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("\n========================================")
    print("CATALYST — LOTE INSERIDO")
    print("========================================")
    print("Inseridos:", inserted)
    print("Duplicados ignorados:", skipped)
    print("Imagens comerciais baixadas:", img_ok)
    print("Falhas de imagem:", len(failed))
    print("Backup:", BACKUP)
    print("JSON:", JSON_PATH)
    if failed:
        print("\nSem imagem comercial:")
        for n,e in failed:
            print("-", n, ":", e)

if __name__ == "__main__":
    main()
