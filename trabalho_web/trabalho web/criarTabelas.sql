DROP DATABASE IF EXISTS weblojinha;
CREATE DATABASE weblojinha;
USE weblojinha;

CREATE TABLE IF NOT EXISTS weblojinha.administrador(
id_pessoa INTEGER AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
login VARCHAR(50) NOT NULL,
senha VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS weblojinha.produto(
id_produto INTEGER AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
valor DOUBLE NOT NULL,
quantidade INTEGER NOT NULL,
imagem BLOB
);

CREATE TABLE weblojinha.carrinho (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS weblojinha.carrinho_item (
    id_carrinho_item INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (id_carrinho) REFERENCES carrinho(id_carrinho),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);


