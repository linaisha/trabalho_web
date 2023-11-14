document.addEventListener('DOMContentLoaded', function() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    const formularioCartao = document.getElementById('formulario-cartao');
    const pixOption = document.getElementById('pix-option');
    const creditoOption = document.getElementById('credito-option');
    const debitoOption = document.getElementById('debito-option');
    const imagemPix = document.getElementById('imagem-pix');
    const valorTotalElement = document.getElementById('valor-total');

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
        let total = 0;
        produtos.forEach(item => {
            total += item.valor * item.quantidade;
        });
        return total.toFixed(2);
    }

    function listarItensCarrinho() {
        fetch('../php/listar_carrinho.php')
            .then(response => response.json())
            .then(data => {
                carrinhoLista.innerHTML = ''; 
                data.forEach(item => {
                    const itemCard = document.createElement('div');
                    itemCard.className = 'item-card';

                    const nome = document.createElement('h3');
                    nome.textContent = item.nome;
                    nome.className = 'item-nome';

                    const quantidade = document.createElement('p');
                    quantidade.textContent = 'Quantidade: ' + item.quantidade;
                    quantidade.className = 'item-quantidade';

                    const valor = document.createElement('p');
                    valor.textContent = 'Preço: ' + item.valor;
                    valor.className = 'item-valor';

                    itemCard.appendChild(nome);
                    itemCard.appendChild(quantidade);
                    itemCard.appendChild(valor);

                    carrinhoLista.appendChild(itemCard);
                });

                valorTotalElement.textContent = 'R$ ' + calcularValorTotal(data) ;
            })
            .catch(error => {
                console.error('Erro ao buscar itens do carrinho: ' + error);
            });
    }

    listarItensCarrinho();

    pixOption.addEventListener('change', mostrarImagemPix);
    creditoOption.addEventListener('change', mostrarImagemPix);
    debitoOption.addEventListener('change', mostrarImagemPix);

    document.getElementById('finalizar-compra-cartao').addEventListener('click', function() {
        const numeroCartao = document.getElementById('numero-cartao').value;
        const dataValidade = document.getElementById('data-validade').value;
        const cvv = document.getElementById('cvv').value;

        if (numeroCartao && dataValidade && cvv) {
            console.log('Dados do cartão enviados:', numeroCartao, dataValidade, cvv);
            alert('Compra Finalizada!');
        } else {
            alert('Preencha todos os campos do cartão.');
        }
    });
});
