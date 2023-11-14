document.addEventListener("DOMContentLoaded", function () {
    const produtoForm = document.querySelector("#cadastrar-produtos form");

    produtoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const preco = document.getElementById("preco").value;
        const quantidade = document.getElementById("quantidade").value;
        const imagemInput = document.getElementById("adicionar_imagem"); 
        const imagem = imagemInput.files[0]; 

        if (!nome || !descricao || !preco || !quantidade || !imagem) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("descricao", descricao);
        formData.append("preco", preco);
        formData.append("quantidade", quantidade);
        formData.append("imagem", imagem);

        fetch("../php/processar_produto.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert("Cadastrado com sucesso!");
        })
        .catch(error => {
            alert("Erro ao cadastrar o produto: " + error);
        });
    });
});
