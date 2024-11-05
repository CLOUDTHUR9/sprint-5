CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR(7) UNIQUE NOT NULL,
    nome VARCHAR(80) NOT NULL,
    sobrenome VARCHAR(80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR(200),
    email VARCHAR(80),
    celular VARCHAR(20) NOT NULL
);

SELECT * FROM Aluno

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    editora VARCHAR(150) NOT NULL,
    ano_publicacao VARCHAR(5),
    isbn VARCHAR(20),
    quant_total INT NOT NULL,
    quant_disponivel INT NOT NULL,
    valor_aquisicao DECIMAL(10, 2),
    status_livro_emprestado VARCHAR(20)
);

SELECT * FROM Livro

CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR(200)
);


INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
VALUES
('João', 'Silva', '2000-02-12', 'Rua das Flores, 123', 'joao.silva@email.com', '111111111'),
('Maria', 'Oliveira', '1999-12-09', 'Av. Brasil, 456', 'maria.oliveira@email.com', '222222222'),
('Carlos', 'Santos', '1940-03-02', 'Rua dos Pinheiros, 789', 'carlos.santos@email.com', '333333333');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
VALUES
('JavaScript: The Good Parts', 'Douglas Crockford', 'OReilly Media', '2008', '9780596517748', 5, 3, 120.00, 'Disponível'),
('Clean Code', 'Prentice Hall', 'Robert C. Martin', '2008', '9780132350884', 7, 2, 150.00, 'Emprestado'),
('The Pragmatic Programmer', 'Andrew Hunt', 'Validan Parts', '1999', '9780201616224', 10, 5, 200.00, 'Disponível');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
VALUES
(1, 1, '2024-10-01', '2024-10-15', 'Devolvido'),
(2, 2, '2024-10-05', '2024-10-01', 'Em andamento'),
(3, 3, '2024-10-10', '2024-10-20', 'Devolvido'),
(1, 3, '2024-10-12', '2024-12-03', 'Em andamento');