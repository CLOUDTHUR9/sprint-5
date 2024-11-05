import { DatabaseModel } from "./DatabaseModel";

// Recupera o pool de conexões do banco de dados
const database = new DatabaseModel().pool;

export class Livro{
    private idLivro: number = 0;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private qunatTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private satusLivroEmprestado: string;

    constructor(
        titulo: string, 
        autor: string,
        editora: string,
        anoPublicacao: string,
        isbn: string,
        qunatTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        satusLivroEmprestado: string

    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.isbn = isbn;
        this.qunatTotal = qunatTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.satusLivroEmprestado = satusLivroEmprestado;

    }

    public getIdLivro():number{
        return this.idLivro;
    }
    public setIdLivro(idLivro:number): void{
        this.idLivro = idLivro;
    }


    public getTitulo():string{
        return this.titulo;
    }
    public setTitulo(titulo:string): void{
        this.titulo = titulo;
    }


    public getAutor():string{
        return this.autor;
    }
    public setAutor(autor:string): void{
        this.autor = autor;
    }


    public getEditora():string{
        return this.editora;
    }
    public setEditora(editora:string): void{
        this.editora = editora;
    }

    public getAnoPublicacao():string{
        return this.anoPublicacao;
    }
    public setAnoPublicacao(anoPublicacao:string): void{
        this.anoPublicacao = anoPublicacao;
    }


    public getIsbn():string{
        return this.isbn;
    }
    public setIsbn(isbn:string): void{
        this.isbn = isbn;
    }


    public getQunatTotal():number{
        return this.qunatTotal;
    }
    public setQunatTotal(qunatTotal:number): void{
        this.qunatTotal = qunatTotal;
    }


    public getQuantDisponivel():number{
        return this.quantDisponivel;
    }
    public setQuantDisponivel(quantDisponivel:number): void{
        this.quantDisponivel = quantDisponivel;
    }


    public getValorAquisicao():number{
        return this.valorAquisicao;
    }
    public setValorAquisicao(valorAquisicao:number): void{
        this.valorAquisicao = valorAquisicao;
    }


    public getSatusLivroEmprestado():string{
        return this.satusLivroEmprestado;
    }
    public setSatusLivroEmprestado(satusLivroEmprestado:string): void{
        this.satusLivroEmprestado = satusLivroEmprestado;
    }

    
    static async listagemLivro(): Promise<Array<Livro> | null> {
        //CRIANDO LISTA VAZIA PARA ARMAZENAR OS Livros
        let listaDeLivro: Array<Livro> = [];

        try {
            //Query para consulta no banco de dados
            const querySelectLivro = 'SELECT * FROM Livro';

            //executa a query no banco de dados
            const respostaBD = await database.query(querySelectLivro);

            respostaBD.rows.forEach((livro) => {
                let novoLivro = new Livro(
                    livro.titulo,
                    livro.autor,
                    livro.editora,
                    livro.ano_publicacao,
                    livro.isbn,
                    livro.qunat_total,
                    livro.quant_disponivel,
                    livro.valor_aquisicao,
                    livro.satus_livro_emprestado
                )

                // adicionando o ID ao objeto
                novoLivro.setIdLivro(livro.idEmprestimo);
                novoLivro.setTitulo(livro.idAluno);

                // adiconando o Emprestimo a lista
                listaDeLivro.push(novoLivro);
            });

            // retornando a lista de Emprestimo para quem chamou a função
            return listaDeLivro
        } catch (error) {
            console.log('Erro ao acessar o modelo: ${error}');
            return null;
            
        } 
        
    }
    

     /**
     * Realiza o cadastro de um Emprestimo no banco de dados.
     * 
     * Esta função recebe um objeto do tipo Emprestimo e insere seus dados (Nome,CPF e Telefone)
     * na tabela Emprestimo do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Livro} Livro - Objeto contendo os dados do carro que será cadastrado. O objeto Carro
     *                        deve conter os métodos getMarca(), getModelo(), getAno() e getCor()
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna true se o carro foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroLivro(livro: Livro): Promise<boolean> {
        try {
            // query para fazer insert de um Livro no banco de dados
            const queryInsertLivro = `INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, qunat_total, quant_disponivel, valor_aquisicao, satus_livro_emprestado)
                                        VALUES  
                                        '${livro.getTitulo()}'
                                        '${livro.getAutor()}', 
                                        '${livro.getEditora()}', 
                                        '${livro.getAnoPublicacao()}',
                                        '${livro.getIsbn()}',
                                        '${livro.getQunatTotal()}',
                                        '${livro.getQuantDisponivel()}',
                                        '${livro.getValorAquisicao()}',
                                        '${livro.getSatusLivroEmprestado()}',)                                    
                                        RETURNING id_Livro;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertLivro);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log('Livro cadastrado com sucesso! ID do Livro: ${respostaBD.rows[0].id_Livro}');
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Livro. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}