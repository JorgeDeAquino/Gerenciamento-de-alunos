# Aplicação para gerenciar alunos e turmas
- Você mesmo irá gerar os dados para realizar o projeto e apresentar os dados necessários para rodar o projeto
- O projeto deverá ser executado no console do navegador

Aluno
- Cadastrar aluno contendo:
	- nome, *string*
	- sobrenome, *string*
	- email, *string*
	- tipo, *string* (sendo presencial ou ead)
	- turma, *number* (sendo um readonly de código de turma válido)
	- nascimento, sendo a data de nascimento do aluno
	- notas, sendo um array de números, de no máximo 5 posições
	- ativo, *boolean* // padrão true
	- classificação: A, B, C ou D.


Turma:
- Cadastrar turma contendo
	- código, *number* entre 1 e 10 (no máximo 10 turmas)
	- máximo, *number* máximo de alunos de 5 a 10
	- alunos, *Alunos[]*
	- descrição, *string*
	- tipo, *string* (sendo presencial ou ead)


Escola: 
- Desativar aluno
- Retornar a lista apenas com alunos ativos
- Retornar a lista apenas com alunos inativos
- Retornar os alunos que estão com a média esperada
- Relatório completo com os seguintes retornos:
	- Quantidade de alunos
	- Quantidade de turmas
	- Alunos que estão com a média esperada
	- Alunos que estão abaixo da média esperada
	- Retornar alunos com a média calculada