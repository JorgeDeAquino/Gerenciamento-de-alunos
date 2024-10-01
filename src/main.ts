import { Aluno } from './components/Aluno';
import { Turma } from './components/Turma';
import { Escola } from './components/Escola';

const escola = new Escola();
const turma1 = new Turma(1, 10, 'Turma de Matemática', 'presencial');
const turma2 = new Turma(2, 5, 'Turma de História', 'ead');
const turma3 = new Turma(3, 8, 'Turma de Ciências', 'presencial');
escola.cadastrarTurma(turma1);
escola.cadastrarTurma(turma2);
escola.cadastrarTurma(turma3);

const alunos = [
  new Aluno('João', 'Silva', 'joao.silva@example.com', 'presencial', 1, new Date('2005-05-15'), [9, 9, 9]),
  new Aluno('Maria', 'Oliveira', 'maria.oliveira@example.com', 'ead', 2, new Date('2004-03-22'), [7, 7, 7]),
  new Aluno('Carlos', 'Pereira', 'carlos.pereira@example.com', 'presencial', 1, new Date('2005-07-10'), [4, 4, 4]),
  new Aluno('Ana', 'Souza', 'ana.souza@example.com', 'presencial', 3, new Date('2005-01-20'), [8, 8, 8]),
  new Aluno('Pedro', 'Lima', 'pedro.lima@example.com', 'ead', 2, new Date('2004-12-12'), [6, 6, 6]),
  new Aluno('Lucas', 'Mendes', 'lucas.mendes@example.com', 'presencial', 1, new Date('2005-03-30'), [5, 5, 5]),
  new Aluno('Julia', 'Ferreira', 'julia.ferreira@example.com', 'presencial', 3, new Date('2005-09-15'), [8.5, 8.5, 8.5]),
  new Aluno('Mariana', 'Costa', 'mariana.costa@example.com', 'ead', 2, new Date('2004-07-07'), [7.5, 7.5, 7.5]),
  new Aluno('Rafael', 'Almeida', 'rafael.almeida@example.com', 'presencial', 3, new Date('2005-11-25'), [9, 9, 9]),
  new Aluno('Beatriz', 'Santos', 'beatriz.santos@example.com', 'presencial', 1, new Date('2005-04-18'), [6, 6, 6])
];

alunos.forEach(aluno => {
  try {
    escola.cadastrarAluno(aluno);
  } catch (error) {
    console.error(`Erro ao cadastrar aluno ${aluno.nome}: ${error.message}`);
  }
});

// Listar alunos e turmas
console.log('Lista de Alunos:', escola.listarAlunos());
console.log('Lista de Turmas:', escola.listarTurmas());

// Atualizar aluno
escola.atualizarAluno('joao.silva@example.com', { sobrenome: 'Santos', notas: [8, 9, 10] });
console.log('Aluno Atualizado:', escola.buscarAluno('joao.silva@example.com'));

// Remover aluno
escola.removerAluno('maria.oliveira@example.com');
console.log('Lista de Alunos após remoção:', escola.listarAlunos());

// Desativar aluno
escola.desativarAluno('joao.silva@example.com');
console.log('Lista de Alunos Ativos:', escola.listarAlunosAtivos());
console.log('Lista de Alunos Inativos:', escola.listarAlunosInativos());

// Gerar relatório completo
console.log('Relatório Completo:', escola.gerarRelatorioCompleto());
