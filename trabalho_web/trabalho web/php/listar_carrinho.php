<?php
header('Content-Type: application/json');

$conn = mysqli_connect("localhost:3308", "PUC", "", "weblojinha");

if (!$conn) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

$query = "SELECT produto.nome, carrinho_item.quantidade, produto.valor 
          FROM carrinho_item 
          INNER JOIN produto ON carrinho_item.id_produto = produto.id_produto";

$result = mysqli_query($conn, $query);

$itensCarrinho = array();

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $itensCarrinho[] = $row;
    }
}

mysqli_close($conn);

echo json_encode($itensCarrinho);
?>
