import { DatabaseModel } from "./DatabaseModel";

// Recupera o pool de conexões do banco de dados
const database = new DatabaseModel().pool;

export class Aluno{
    private idAluno: number = 0;
    private ra: string = "";
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;

    constructor(
        nome: string, 
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string

    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;

    }

    public getIdAluno():number{
        return this.idAluno;
    }
    public setIdAluno(idAluno:number): void{
        this.idAluno = idAluno;
    }

    public getRa():string{
        return this.ra;
    }
    public setRa(ra:string): void{
        this.ra = ra;
    }

    public getNome():string{
        return this.nome;
    }
    public setNome(nome:string): void{
        this.nome = nome;
    }


    public getSobrenome():string{
        return this.sobrenome;
    }
    public setSobrenome(sobrenome:string): void{
        this.sobrenome = sobrenome;
    }


    public getDataNascimento():Date{
        return this.dataNascimento;
    }
    public setDataNascimento(dataNascimento:Date): void{
        this.dataNascimento = dataNascimento;
    }

    public getEndereco():string{
        return this.endereco;
    }
    public setEndereco(endereco:string): void{
        this.endereco = endereco;
    }


    public getEmail():string{
        return this.email;
    }
    public setEmail(email:string): void{
        this.email = email;
    }


    public getCelular():string{
        return this.celular;
    }
    public setCelular(celular:string): void{
        this.celular = celular;
    }

    static async listagemAluno(): Promise<Array<Aluno> | null> {
        //CRIANDO LISTA VAZIA PARA ARMAZENAR OS Alunos
        let listaDeAlunos: Array<Aluno> = [];

        try {
            //Query para consulta no banco de dados
            const querySelectAlunos = 'SELECT * FROM aluno';

            //executa a query no banco de dados
            const respostaBD = await database.query(querySelectAlunos);

            respostaBD.rows.forEach((aluno) => {
                let novoAluno = new Aluno(
                    aluno.nome,
                    aluno.sobrenome,
                    aluno.data_nascimento,
                    aluno.endereco,
                    aluno.email,
                    aluno.celular
                )

                // adicionando o ID ao objeto
                novoAluno.setIdAluno(aluno.idAluno);
                novoAluno.setRa(aluno.ra);

                // adiconando o aluno a lista
                listaDeAlunos.push(novoAluno);
            });

            // retornando a lista de aluno para quem chamou a função
            return listaDeAlunos
        } catch (error) {
            console.log('Erro ao acessar o modelo: ${error}');
            return null;
            
        } 
        
    }
    

     /**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo aluno e insere seus dados (Nome,CPF e Telefone)
     * na tabela aluno do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Aluno} Aluno - Objeto contendo os dados do carro que será cadastrado. O objeto Carro
     *                        deve conter os métodos getMarca(), getModelo(), getAno() e getCor()
     *                        que retornam os respectivos valores do carro.
     * @returns {Promise<boolean>} - Retorna true se o carro foi cadastrado com sucesso e false caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna false.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco ,email, celular)
                                        VALUES 
                                        '${aluno.getNome()}', 
                                        '${aluno.getSobrenome()}'
                                        '${aluno.getDataNascimento()}', 
                                        '${aluno.getEndereco()}', 
                                        '${aluno.getEmail()}'
                                        '${aluno.getCelular()}',)                                    
                                        RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log('Aluno cadastrado com sucesso! ID do aluno: ${respostaBD.rows[0].id_aluno}');
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Aluno. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}