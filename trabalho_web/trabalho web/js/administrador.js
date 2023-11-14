document.addEventListener("DOMContentLoaded", function () {
    const adminLoginForm = document.getElementById("admin-login-form");

    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch("../php/administrador.php", {
            method: "POST",
            body: new URLSearchParams({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => response.text())
        .then(data => {
            if (data.startsWith("Credenciais incorretas")) {
                alert(data);
            } else {
                window.location.href = "inicial_adm.html";
            }
        })
        .catch(error => {
            alert("Erro ao fazer login: " + error);
        });
    });
});
