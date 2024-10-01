import type { Aluno } from "./Aluno";
import type { Turma } from "./Turma";

export class Escola {
  private alunos: Aluno[] = [];
  private turmas: Turma[] = [];

  cadastrarTurma(turma: Turma) {
    if (this.turmas.some(t => t.codigo === turma.codigo)) {
      throw new Error('Turma com este código já cadastrada.');
    }
    this.turmas.push(turma);
  }

  listarTurmas(): Turma[] {
    return this.turmas;
  }

  contarTurmas(): number {
    return this.turmas.length;
  }

  cadastrarAluno(aluno: Aluno) {
    if (this.alunos.some(a => a.email === aluno.email)) {
      throw new Error('Aluno com este email já cadastrado.');
    }
    if (new Date().getFullYear() - aluno.nascimento.getFullYear() < 16) {
      throw new Error('Aluno deve ter pelo menos 16 anos.');
    }

    let turma = this.turmas.find(t => t.codigo === aluno.turma);
    if (!turma) {
      throw new Error('Turma inexistente.');
    }

    try {
      turma.adicionarAluno(aluno);
    } catch (error) {
      console.warn(`Aluno ${aluno.nome} não pode ser adicionado à turma ${turma.codigo}: ${error.message}`);
      turma = this.encontrarTurmaAdequada(aluno);
      if (turma) {
        turma.adicionarAluno(aluno);
        aluno.turma = turma.codigo;
      } else {
        throw new Error('Não foi possível encontrar uma turma adequada para o aluno.');
      }
    }

    this.alunos.push(aluno);
  }

  encontrarTurmaAdequada(aluno: Aluno): Turma | undefined {
    return this.turmas.find(turma => {
      try {
        turma.adicionarAluno(aluno);
        turma.removerAluno(aluno.email);
        return true;
      } catch {
        return false;
      }
    });
  }

  removerAluno(email: string) {
    this.alunos = this.alunos.filter(aluno => aluno.email !== email);
    this.turmas.forEach(turma => turma.removerAluno(email));
  }

  atualizarAluno(email: string, dadosAtualizados: Partial<Aluno>) {
    const aluno = this.alunos.find(aluno => aluno.email === email);
    if (aluno) {
      Object.assign(aluno, dadosAtualizados);
            aluno['notas'] = aluno['notas'];
    }
  }

  buscarAluno(email: string): Aluno | undefined {
    return this.alunos.find(aluno => aluno.email === email);
  }

  listarAlunos(): Aluno[] {
    return this.alunos;
  }

  calcularMedia(email: string): number | undefined {
    const aluno = this.buscarAluno(email);
    return aluno?.media;
  }

  desativarAluno(email: string) {
    const aluno = this.buscarAluno(email);
    if (aluno) {
      aluno.desativar();
    }
  }

  listarAlunosAtivos(): Aluno[] {
    return this.alunos.filter(aluno => aluno.ativo);
  }

  listarAlunosInativos(): Aluno[] {
    return this.alunos.filter(aluno => !aluno.ativo);
  }

  listarAlunosComMediaEsperada(): Aluno[] {
    return this.alunos.filter(aluno => aluno.media >= 7);
  }

  gerarRelatorioCompleto() {
    const quantidadeAlunos = this.alunos.length;
    const quantidadeTurmas = this.turmas.length;
    const alunosComMediaEsperada = this.listarAlunosComMediaEsperada();
    const alunosAbaixoDaMedia = this.alunos.filter(aluno => aluno.media < 7);

    return {
      quantidadeAlunos,
      quantidadeTurmas,
      alunosComMediaEsperada,
      alunosAbaixoDaMedia,
      alunosComMediaCalculada: this.alunos.map(aluno => ({
        ...aluno,
        media: aluno.media,
      })),
    };
  }
}
