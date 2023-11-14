"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var carrinhoLista = document.getElementById('carrinho-lista');
  var formularioCartao = document.getElementById('formulario-cartao');
  var pixOption = document.getElementById('pix-option');
  var creditoOption = document.getElementById('credito-option');
  var debitoOption = document.getElementById('debito-option');
  var imagemPix = document.getElementById('imagem-pix');
  var valorTotalElement = document.getElementById('valor-total');

  function mostrarImagemPix() {
    if (pixOption.checked) {
      formularioCartao.style.display = 'none';
      imagemPix.style.display = 'block';
    } else if (creditoOption.checked || debitoOption.checked) {
      formularioCartao.style.display = 'block';
      imagemPix.style.display = 'none';
    }
  }

  function calcularValorTotal(produtos) {
    var total = 0;
    produtos.forEach(function (item) {
      total += item.valor * item.quantidade;
    });
    return total.toFixed(2);
  }

  function listarItensCarrinho() {
    fetch('../php/listar_carrinho.php').then(function (response) {
      return response.json();
    }).then(function (data) {
      carrinhoLista.innerHTML = '';
      data.forEach(function (item) {
        var itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        var nome = document.createElement('h3');
        nome.textContent = item.nome;
        nome.className = 'item-nome';
        var quantidade = document.createElement('p');
        quantidade.textContent = 'Quantidade: ' + item.quantidade;
        quantidade.className = 'item-quantidade';
        var valor = document.createElement('p');
        valor.textContent = 'Preço: ' + item.valor;
        valor.className = 'item-valor';
        itemCard.appendChild(nome);
        itemCard.appendChild(quantidade);
        itemCard.appendChild(valor);
        carrinhoLista.appendChild(itemCard);
      });
      valorTotalElement.textContent = 'R$ ' + calcularValorTotal(data);
    })["catch"](function (error) {
      console.error('Erro ao buscar itens do carrinho: ' + error);
    });
  }

  listarItensCarrinho();
  pixOption.addEventListener('change', mostrarImagemPix);
  creditoOption.addEventListener('change', mostrarImagemPix);
  debitoOption.addEventListener('change', mostrarImagemPix);
  document.getElementById('finalizar-compra-cartao').addEventListener('click', function () {
    var numeroCartao = document.getElementById('numero-cartao').value;
    var dataValidade = document.getElementById('data-validade').value;
    var cvv = document.getElementById('cvv').value;

    if (numeroCartao && dataValidade && cvv) {
      console.log('Dados do cartão enviados:', numeroCartao, dataValidade, cvv);
      alert('Compra Finalizada!');
    } else {
      alert('Preencha todos os campos do cartão.');
    }
  });
});