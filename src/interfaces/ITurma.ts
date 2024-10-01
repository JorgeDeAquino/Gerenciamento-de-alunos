import type { Aluno } from "../components/Aluno";

export interface ITurma {
    codigo: number;
    maximoAlunos: number;
    alunos: Aluno[];
    descricao: string;
    tipo: 'presencial' | 'ead';
}
