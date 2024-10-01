export interface IAluno {
    nome: string;
    sobrenome: string;
    email: string;
    tipo: 'presencial' | 'ead';
    turma: number;
    nascimento: Date;
    notas: number[];
    ativo: boolean;
    classificacao: 'A' | 'B' | 'C' | 'D';
  }
  