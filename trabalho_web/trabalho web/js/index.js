window.onload = async function () {
    var listaDeProdutos = document.getElementById("lista-de-produtos");

    var response = await fetch("../php/listar-app.php", {
        method: "GET"
    });

    if (response.ok) {
        var produtos = await response.json();

        produtos.forEach(function (produto) {
            var produtoDiv = document.createElement("div");
            produtoDiv.classList.add("produto");

            var imagem = document.createElement("img");
            imagem.src = produto.imagem;

            var nome = document.createElement("p");
            nome.textContent = produto.nome;

            var valor = document.createElement("p");
            valor.textContent = "PREÇO: " + produto.valor;

            var botaoAdicionar = document.createElement("button");
            botaoAdicionar.textContent = "Adicionar ao Carrinho";
            botaoAdicionar.addEventListener("click", function () {
                adicionarAoCarrinho(produto);
            });

            produtoDiv.appendChild(imagem);
            produtoDiv.appendChild(nome);
            produtoDiv.appendChild(valor);
            produtoDiv.appendChild(botaoAdicionar);

            listaDeProdutos.appendChild(produtoDiv);
        });
    } else {
        console.error("Erro ao carregar produtos.");
    }
}