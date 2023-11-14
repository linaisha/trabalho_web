document.addEventListener("DOMContentLoaded", function () {
    const inputBusca = document.getElementById("input-busca");
    const listaProdutos = document.getElementById("lista-produtos");

    inputBusca.addEventListener("input", function () {
        buscarProdutos();
    });

    function buscarProdutos() {
        const termoBusca = inputBusca.value;

        fetch(`../php/busca.php?termo=${termoBusca}`)
            .then(response => response.json())
            .then(produtos => {
                atualizarListaProdutos(produtos);
            })
            .catch(error => console.error(error));
    }

    function atualizarListaProdutos(produtos) {
        listaProdutos.innerHTML = "";

        produtos.forEach(produto => {
            const card = criarProdutoCard(produto);
            listaProdutos.appendChild(card);
        });
    }

    function criarProdutoCard(produto) {
        const card = document.createElement("div");
        card.classList.add("produto-card", "card-interior");

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        nome.className = "card-nome-produto";

        const imagem = document.createElement("img");
        imagem.src = `../img/${produto.imagem}`;
        imagem.className = "card-imagem-produto2";
        imagem.alt = "Imagem do Produto";

        const imagemCard = document.createElement("div");
        imagemCard.className = "card-imagem-produto";
        imagemCard.appendChild(imagem);

        const preco = document.createElement("p");
        preco.textContent = "Preço: R$ " + produto.valor;
        preco.className = "card-valor-produto";

        const descricao = document.createElement("p");
        descricao.textContent = produto.descricao;
        descricao.className = "card-descricao-produto";

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        botaoAdicionar.className = "adicionar-ao-carrinho";
        botaoAdicionar.setAttribute("data-id-produto", produto.id);

        botaoAdicionar.addEventListener("click", function () {
        adicionarAoCarrinho(produto.id_produto);
        });

        card.appendChild(nome);
        card.appendChild(imagemCard);
        card.appendChild(preco);
        card.appendChild(descricao);
        card.appendChild(botaoAdicionar);

        return card;
    }

    function adicionarAoCarrinho(idProduto) {
        fetch("../php/criar_carrinho.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Carrinho criado com sucesso" || data.message === "Carrinho já existe") {
                adicionarProdutoAoCarrinho(idProduto);
            } else {
                console.error("Erro ao criar o carrinho: " + data.error);
            }
        })
        .catch(error => {
            console.error("Erro ao criar o carrinho: " + error);
        });
    }
    
    function adicionarProdutoAoCarrinho(idProduto) {
        fetch("../php/adicionar_ao_carrinho.php", {
            method: "POST",
            body: JSON.stringify({ id_produto: idProduto }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error("Erro ao adicionar ao carrinho: " + error);
        });
    }
    

    buscarProdutos();
});
