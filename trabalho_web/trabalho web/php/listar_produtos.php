<?php
$con = mysqli_connect("localhost:3308", "PUC", "", "weblojinha");

if (!$con) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

$query = "SELECT id_produto, nome, descricao, valor, quantidade, imagem FROM produto";

$result = mysqli_query($con, $query);

$produtos = array();

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $produtos[] = $row;
    }
}

mysqli_close($con);

echo json_encode($produtos);
?>
