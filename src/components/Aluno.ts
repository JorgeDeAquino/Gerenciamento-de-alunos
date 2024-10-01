import type { IAluno } from '../interfaces/IAluno';

export class Aluno implements IAluno {
  private _nome: string;
  private _sobrenome: string;
  private _email: string;
  private _tipo: 'presencial' | 'ead';
  private _turma: number;
  private _nascimento: Date;
  private _notas: number[];
  private _ativo: boolean;
  public _classificacao: 'A' | 'B' | 'C' | 'D';

  constructor(nome: string, sobrenome: string, email: string, tipo: 'presencial' | 'ead', turma: number, nascimento: Date, notas: number[] = [], ativo = true) {
    this._nome = nome;
    this._sobrenome = sobrenome;
    this._email = email;
    this._tipo = tipo;
    this._turma = turma;
    this._nascimento = nascimento;
    this._notas = notas;
    this._ativo = ativo;
    this._classificacao = this.calcularClassificacao();
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get sobrenome(): string {
    return this._sobrenome;
  }

  set sobrenome(sobrenome: string) {
    this._sobrenome = sobrenome;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get tipo(): 'presencial' | 'ead' {
    return this._tipo;
  }

  set tipo(tipo: 'presencial' | 'ead') {
    this._tipo = tipo;
  }

  get turma(): number {
    return this._turma;
  }

  set turma(turma: number) {
    this._turma = turma;
  }

  get nascimento(): Date {
    return this._nascimento;
  }

  set nascimento(nascimento: Date) {
    this._nascimento = nascimento;
  }

  get notas(): number[] {
    return this._notas;
  }

  set notas(notas: number[]) {
    this._notas = notas;
    this._classificacao = this.calcularClassificacao();
  }

  get ativo(): boolean {
    return this._ativo;
  }

  set ativo(ativo: boolean) {
    this._ativo = ativo;
  }

  get classificacao(): 'A' | 'B' | 'C' | 'D' {
    return this._classificacao;
  }

  set classificacao(value: 'A' | 'B' | 'C' | 'D') {
    this._classificacao = value;
  }

  public calcularClassificacao(): 'A' | 'B' | 'C' | 'D' {
    const media = this.media;
    if (media >= 8.5) {
      return 'A';
    }
    if (media >= 7) {
      return 'B';
    }
    if (media >= 5) {
      return 'C';
    }
    return 'D';
  }

  atualizarClassificacao(): void {
    this.classificacao = this.calcularClassificacao();
  }

  get media(): number {
    return this._notas.reduce((a, b) => a + b, 0) / this._notas.length;
  }

  desativar() {
    this._ativo = false;
  }
}
