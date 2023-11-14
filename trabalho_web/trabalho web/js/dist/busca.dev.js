"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var inputBusca = document.getElementById("input-busca");
  var listaProdutos = document.getElementById("lista-produtos");
  inputBusca.addEventListener("input", function () {
    buscarProdutos();
  });

  function buscarProdutos() {
    var termoBusca = inputBusca.value;
    fetch("../php/busca.php?termo=".concat(termoBusca)).then(function (response) {
      return response.json();
    }).then(function (produtos) {
      atualizarListaProdutos(produtos);
    })["catch"](function (error) {
      return console.error(error);
    });
  }

  function atualizarListaProdutos(produtos) {
    listaProdutos.innerHTML = "";
    produtos.forEach(function (produto) {
      var card = criarProdutoCard(produto);
      listaProdutos.appendChild(card);
    });
  }

  function criarProdutoCard(produto) {
    var card = document.createElement("div");
    card.classList.add("produto-card", "card-interior");
    var nome = document.createElement("h3");
    nome.textContent = produto.nome;
    nome.className = "card-nome-produto";
    var imagem = document.createElement("img");
    imagem.src = "../img/".concat(produto.imagem);
    imagem.className = "card-imagem-produto2";
    imagem.alt = "Imagem do Produto";
    var imagemCard = document.createElement("div");
    imagemCard.className = "card-imagem-produto";
    imagemCard.appendChild(imagem);
    var preco = document.createElement("p");
    preco.textContent = "Preço: R$ " + produto.valor;
    preco.className = "card-valor-produto";
    var descricao = document.createElement("p");
    descricao.textContent = produto.descricao;
    descricao.className = "card-descricao-produto";
    var botaoAdicionar = document.createElement("button");
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
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.message === "Carrinho criado com sucesso" || data.message === "Carrinho já existe") {
        adicionarProdutoAoCarrinho(idProduto);
      } else {
        console.error("Erro ao criar o carrinho: " + data.error);
      }
    })["catch"](function (error) {
      console.error("Erro ao criar o carrinho: " + error);
    });
  }

  function adicionarProdutoAoCarrinho(idProduto) {
    fetch("../php/adicionar_ao_carrinho.php", {
      method: "POST",
      body: JSON.stringify({
        id_produto: idProduto
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {})["catch"](function (error) {
      console.error("Erro ao adicionar ao carrinho: " + error);
    });
  }

  buscarProdutos();
});