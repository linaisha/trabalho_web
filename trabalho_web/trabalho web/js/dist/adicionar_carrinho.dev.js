"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var adicionarAoCarrinhoButtons = document.querySelectorAll(".adicionar-ao-carrinho");
  adicionarAoCarrinhoButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var idProduto = button.getAttribute("data-id-produto");
      var nomeProduto = button.getAttribute("data-nome-produto");
      var precoProduto = button.getAttribute("data-preco-produto");
      adicionarAoCarrinho(idProduto, nomeProduto, precoProduto);
    });
  });

  function adicionarAoCarrinho(idProduto, nome, preco) {
    fetch("adicionar_ao_carrinho.php", {
      method: "POST",
      body: JSON.stringify({
        id_produto: idProduto
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      // Adicione o produto ao carrinho
      adicionarProdutoNoCarrinho(nome, preco);
    })["catch"](function (error) {
      console.error("Erro ao adicionar ao carrinho: " + error);
    });
  }
});