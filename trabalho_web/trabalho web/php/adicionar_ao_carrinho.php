<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $idProduto = $data->id_produto;

    $conn = new mysqli("localhost:3308", "PUC", "", "weblojinha");

    if ($conn->connect_error) {
        $response = ["error" => "Conexão falhou: " . $conn->connect_error];
    } else {
        $verificarProduto = "SELECT * FROM produto WHERE id_produto = $idProduto";
        $resultadoProduto = $conn->query($verificarProduto);

        if ($resultadoProduto->num_rows > 0) {
            $inserirCarrinho = "INSERT INTO carrinho_item (id_carrinho, id_produto, quantidade) VALUES (1, $idProduto, 1)";
            
            if ($conn->query($inserirCarrinho) === TRUE) {
                $response = ["message" => "Produto adicionado ao carrinho com sucesso"];
            } else {
                $response = ["error" => "Erro ao adicionar ao carrinho: " . $conn->error];
            }
        } else {
            $response = ["error" => "ID de produto inválido"];
        }
    }

    echo json_encode($response);
}
?>
