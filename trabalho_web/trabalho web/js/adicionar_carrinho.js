document.addEventListener("DOMContentLoaded", function () {
    const adicionarAoCarrinhoButtons = document.querySelectorAll(".adicionar-ao-carrinho");

    adicionarAoCarrinhoButtons.forEach(button => {
        button.addEventListener("click", function () {
            const idProduto = button.getAttribute("data-id-produto");
            const nomeProduto = button.getAttribute("data-nome-produto");
            const precoProduto = button.getAttribute("data-preco-produto");

            adicionarAoCarrinho(idProduto, nomeProduto, precoProduto);
        });
    });

    function adicionarAoCarrinho(idProduto, nome, preco) {
        fetch("adicionar_ao_carrinho.php", {
            method: "POST",
            body: JSON.stringify({ id_produto: idProduto }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            // Adicione o produto ao carrinho
            adicionarProdutoNoCarrinho(nome, preco);
        })
        .catch(error => {
            console.error("Erro ao adicionar ao carrinho: " + error);
        });
    }
});

