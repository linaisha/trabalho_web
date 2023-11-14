<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost:3308", "PUC", "", "weblojinha");

if ($conn->connect_error) {
    $response = ["error" => "Conexão falhou: " . $conn->connect_error];
} else {
    $consultarCarrinho = "SELECT produto.nome, carrinho_item.quantidade, produto.valor 
                          FROM carrinho_item 
                          INNER JOIN produto ON carrinho_item.id_produto = produto.id_produto";

    $resultadoCarrinho = $conn->query($consultarCarrinho);

    if ($resultadoCarrinho->num_rows > 0) {
        $carrinhoItens = [];
        while ($row = $resultadoCarrinho->fetch_assoc()) {
            $carrinhoItens[] = $row;
        }
        $response = ["carrinhoItens" => $carrinhoItens];
    } else {
        $response = ["message" => "Carrinho vazio"];
    }
}

echo json_encode($response);
?>
