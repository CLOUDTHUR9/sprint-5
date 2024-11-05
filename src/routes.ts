import { Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { LivroController } from "./controller/LivroController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA LIVROS
*/ 
// Rota para listar os livros
router.get("/lista/livros", LivroController.todos);
router.post("/novo/livro", LivroController.novo);

/* 
* ROTAS PARA ALUNOS
*/ 
// Rota para listar os alunos
router.get("/lista/alunos", AlunoController.todos);
router.post("/novo/aluno", AlunoController.novo);
/* 
* ROTAS PARA EMPRESTIMOS
*/ 
// Rota para listar os empréstimos
router.get("/lista/emprestimos", EmprestimoController.todos);
// exportando as rotas
export { router };