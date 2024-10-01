import type { ITurma } from '../interfaces/ITURMA';
import type { Aluno } from './Aluno';

export class Turma implements ITurma {
  private _codigo: number;
  private _maximo: number;
  private _alunos: Aluno[];
  private _descricao: string;
  private _tipo: 'presencial' | 'ead';
  public maximoAlunos: number;

  constructor(
    codigo: number,
    maximo: number,
    descricao: string,
    tipo: 'presencial' | 'ead'
  ) {
    if (codigo < 1 || codigo > 10) {
      throw new Error('Código da turma deve ser entre 1 e 10.');
    }
    if (maximo < 5 || maximo > 10) {
      throw new Error('Máximo de alunos deve ser entre 5 e 10.');
    }
    this._codigo = codigo;
    this._maximo = maximo;
    this._descricao = descricao;
    this._tipo = tipo;
    this._alunos = [];
    this.maximoAlunos = maximo
  }

  get codigo(): number {
    return this._codigo;
  }

  set codigo(codigo: number) {
    if (codigo < 1 || codigo > 10) {
      throw new Error('Código da turma deve ser entre 1 e 10.');
    }
    this._codigo = codigo;
  }

  get maximo(): number {
    return this._maximo;
  }

  set maximo(maximo: number) {
    if (maximo < 5 || maximo > 10) {
      throw new Error('Máximo de alunos deve ser entre 5 e 10.');
    }
    this._maximo = maximo;
  }

  get alunos(): Aluno[] {
    return this._alunos;
  }

  set alunos(alunos: Aluno[]) {
    this._alunos = alunos;
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(descricao: string) {
    this._descricao = descricao;
  }

  get tipo(): 'presencial' | 'ead' {
    return this._tipo;
  }

  set tipo(tipo: 'presencial' | 'ead') {
    this._tipo = tipo;
  }

  adicionarAluno(aluno: Aluno) {
    if (this._alunos.length >= this._maximo) {
      throw new Error('Turma cheia.');
    }
    if (aluno.tipo !== this._tipo) {
      throw new Error('Tipo de aluno incompatível com a turma.');
    }
    if (this._alunos.some(a => ['A', 'D'].includes(a.classificacao) && ['B', 'C'].includes(aluno.classificacao)) ||
        this._alunos.some(a => ['B', 'C'].includes(a.classificacao) && ['A', 'D'].includes(aluno.classificacao))) {
      throw new Error('Classificação de aluno incompatível com a turma.');
    }
    this._alunos.push(aluno);
  }

  removerAluno(email: string) {
    this._alunos = this._alunos.filter(aluno => aluno.email !== email);
  }
}
