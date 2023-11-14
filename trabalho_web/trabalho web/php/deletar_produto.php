<?php
$con = mysqli_connect("localhost:3308", "PUC", "", "weblojinha");

if (!$con) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents('php://input'));
$id_produto = $data->id_produto;

$query = "DELETE FROM produto WHERE id_produto = $id_produto";

if (mysqli_query($con, $query)) {
    echo "success";
} else {
    echo "Erro ao deletar o produto: " . mysqli_error($con);
}

mysqli_close($con);
?>
