<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $conn = new mysqli("localhost:3308", "PUC", "", "weblojinha");

    if ($conn->connect_error) {
        $response = ["error" => "Conexão falhou: " . $conn->connect_error];
    } else {
        // Verifique se o carrinho já existe
        $verificarCarrinho = "SELECT * FROM carrinho";
        $resultadoCarrinho = $conn->query($verificarCarrinho);

        if ($resultadoCarrinho->num_rows > 0) {
            $response = ["message" => "Carrinho já existe"];
        } else {
            // Se o carrinho não existe, crie um novo carrinho
            $criarCarrinho = "INSERT INTO carrinho (id_carrinho) VALUES (1)";
            if ($conn->query($criarCarrinho) === TRUE) {
                $response = ["message" => "Carrinho criado com sucesso"];
            } else {
                $response = ["error" => "Erro ao criar o carrinho: " . $conn->error];
            }
        }
    }

    echo json_encode($response);
}
?>
