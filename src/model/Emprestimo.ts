import { DatabaseModel } from "./DatabaseModel";

// Recupera o pool de conexões do banco de dados
const database = new DatabaseModel().pool;

export class Emprestimo{
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;

    constructor(
        idAluno: number, 
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string,

    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;

    }

    public getIdEmprestimo():number{
        return this.idEmprestimo;
    }
    public setIdEmprestimo(idEmprestimo:number): void{
        this.idEmprestimo = idEmprestimo;
    }
    public getIdAluno():number{
        return this.idAluno;
    }
    public setIdAluno(idAluno:number): void{
        this.idAluno = idAluno;
    }


    public getIdLivro():number{
        return this.idLivro;
    }
    public setIdLivro(idLivro:number): void{
        this.idLivro = idLivro;
    }


    public getDataEmprestimo():Date{
        return this.dataEmprestimo;
    }
    public setDataEmprestimo(dataEmprestimo:Date): void{
        this.dataEmprestimo = dataEmprestimo;
    }

    public getDataDevolucao():Date{
        return this.dataDevolucao;
    }
    public setDataDevolucao(dataDevolucao:Date): void{
        this.dataDevolucao = dataDevolucao;
    }


    public getStatusEmprestimo():string{
        return this.statusEmprestimo;
    }
    public setStatusEmprestimo(statusEmprestimo:string): void{
        this.statusEmprestimo = statusEmprestimo;
    }



        static async listagemEmprestimo(): Promise<Array<Emprestimo> | null> {
        //CRIANDO LISTA VAZIA PARA ARMAZENAR OS EmprestimoS
        let listaDeEmprestimo: Array<Emprestimo> = [];

        try {
            //Query para consulta no banco de dados
            const querySelectEmprestimo = 'SELECT * FROM aluno';

            //executa a query no banco de dados
            const respostaBD = await database.query(querySelectEmprestimo);

            respostaBD.rows.forEach((emprestimo) => {
                let novoEmprestimo = new Emprestimo(
                    emprestimo.id_aluno,
                    emprestimo.id_livro,
                    emprestimo.data_emprestimo,
                    emprestimo.data_devolucao,
                    emprestimo.status_emprestimo
                )

                // adicionando o ID ao objeto
                novoEmprestimo.setIdEmprestimo(emprestimo.idEmprestimo);
                novoEmprestimo.setIdAluno(emprestimo.idAluno);

                // adiconando o Emprestimo a lista
                listaDeEmprestimo.push(novoEmprestimo);
            });

            // retornando a lista de Emprestimo para quem chamou a função
            return listaDeEmprestimo
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
     * @param {Emprestimo} Emprestimo - Objeto contendo os dados do carro que será cadastrado. O objeto Carro
     *                        deve conter os métodos getMarca(), getModelo(), getAno() e getCor()
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna true se o carro foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertEmprestimo = `INSERT INTO Aluno (id_aluno, id_livro, id_emprestimo, data_devolucao, status_emprestimo)
                                        VALUES 
                                        '${emprestimo.getIdAluno()}', 
                                        '${emprestimo.getIdLivro()}'
                                        '${emprestimo.getIdEmprestimo()}', 
                                        '${emprestimo.getDataDevolucao()}', 
                                        '${emprestimo.getStatusEmprestimo()}',)                                    
                                        RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertEmprestimo);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log('Emprestimo cadastrado com sucesso! ID do Emprestimo: ${respostaBD.rows[0].id_Emprestimo}');
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Emprestimo. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
    
}