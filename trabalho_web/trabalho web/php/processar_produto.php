<?php
$mensagem = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $con = mysqli_connect("localhost:3308", "PUC", "", "weblojinha");

    if ($con) {
        $nome = $_POST['nome'];
        $descricao = $_POST['descricao'];
        $preco = $_POST['preco'];
        $quantidade = $_POST['quantidade'];

        $imagem_dir = "../img/";
        $imagem_nome = $_FILES["imagem"]["name"];
        $imagem_temp = $_FILES["imagem"]["tmp_name"];

        $nome_arquivo = $_POST['nome_arquivo'];
        $extensao_permitida = "png";
        $extensao = strtolower(pathinfo($imagem_nome, PATHINFO_EXTENSION));
        if ($extensao != $extensao_permitida) {
            $mensagem = "Apenas arquivos no formato PNG são permitidos.";
        } else {
            if ($_FILES["imagem"]["error"] > 0) {
                $mensagem = "Erro no upload da imagem: " . $_FILES["imagem"]["error"];
            } else {
                if (!empty($nome_arquivo)) {
                    $imagem_nome = $nome_arquivo . "." . $extensao;
                }

                if (move_uploaded_file($imagem_temp, $imagem_dir . $imagem_nome)) {
                    $query = "INSERT INTO produto (nome, descricao, valor, quantidade, imagem) VALUES ('$nome', '$descricao', $preco, $quantidade, '$imagem_nome')";
                    $result = mysqli_query($con, $query);

                    if ($result) {
                        $mensagem = "Produto cadastrado com sucesso!";
                    } else {
                        $mensagem = "Erro ao cadastrar o produto: " . mysqli_error($con);
                    }
                } else {
                    $mensagem = "Erro no upload da imagem.";
                }
            }
        }

        mysqli_close($con);
    } else {
        $mensagem = "Erro na conexão com o banco de dados.";
    }
}

echo $mensagem;
?>
