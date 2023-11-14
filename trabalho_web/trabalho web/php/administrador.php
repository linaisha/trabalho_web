<?php
$conn = mysqli_connect("localhost:3308", "PUC", "", "weblojinha");

if (!$conn) {
    die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM administrador WHERE login='$username' AND senha='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        header("Location: http://localhost/html/inicial_adm.html");
        exit();
    } else {
        echo "Credenciais incorretas. Tente novamente.";
    }
}

mysqli_close($conn);
?>
