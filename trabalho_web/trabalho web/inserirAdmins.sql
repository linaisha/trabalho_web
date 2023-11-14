CREATE USER 'PUC'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON weblojinha.* TO 'PUC'@'localhost';
FLUSH PRIVILEGES;
ALTER TABLE weblojinha.produto ADD descricao VARCHAR(255);

INSERT INTO administrador (nome, login, senha)
VALUES ('Alexandre', 'alexandre02', '1234');

INSERT INTO administrador (nome, login, senha)
VALUES ('Maycon', 'maycon', '1234');

INSERT INTO administrador (nome, login, senha)
VALUES ('Elisa', 'elisa', '1234');
