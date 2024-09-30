class Aluno {
    nome: string;
    sobrenome: string;
    email: string;
    tipo: "presencial" | "ead";
    readonly turma: number;
    nascimento: Date;
    notas: number[];
    status: boolean;
  
    constructor(
      nome: string,
      sobrenome: string,
      email: string,
      tipo: "presencial" | "ead",
      turma: number,
      nascimento: Date,
      notas: number[] = []
    ) {
      if (notas.length > 5) {
        throw new Error("O aluno pode ter no máximo 5 notas.");
      }
  
      if (!this.validarIdade(nascimento)) {
        throw new Error("O aluno deve ter no mínimo 16 anos.");
      }
  
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.email = email;
      this.tipo = tipo;
      this.turma = turma;
      this.nascimento = new Date(Date.UTC(nascimento.getFullYear(), nascimento.getMonth(), nascimento.getDate()));
      this.notas = notas;
      this.status = true; // Padrão é 'ativo'
    }
  
    validarIdade(nascimento: Date): boolean {
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesDif = hoje.getMonth() - nascimento.getMonth();
      const diaDif = hoje.getDate() - nascimento.getDate();
      return idade > 16 || (idade === 16 && (mesDif > 0 || (mesDif === 0 && diaDif >= 0)));
    }
  
    exibirInformacoes() {
      const dataNascimentoFormatada = this.nascimento.toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
  
      console.log(`Nome: ${this.nome} ${this.sobrenome}`);
      console.log(`Email: ${this.email}`);
      console.log(`Tipo: ${this.tipo}`);
      console.log(`Turma: ${this.turma}`);
      console.log(`Nascimento: ${dataNascimentoFormatada}`);
      console.log(`Notas: ${this.notas}`);
      console.log(`Média das notas: ${this.calcularMedia()}`);
      console.log(`Status: ${this.status ? "Ativo" : "Inativo"}`);
    }
  
    calcularMedia(): string {
      if (this.notas.length === 0) return "Nenhuma nota disponível";
      const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
      const media = parseFloat((soma / this.notas.length).toFixed(2)); // Arredonda para 2 casas decimais
      return media >= 6 ? `Média: ${media} - Aprovado` : `Média: ${media} - Reprovado`;
    }
  
    atualizarInformacoes(
      nome: string,
      sobrenome: string,
      email: string,
      tipo: "presencial" | "ead",
      nascimento: Date,
      notas: number[] = this.notas
    ) {
      if (notas.length > 5) {
        throw new Error("O aluno pode ter no máximo 5 notas.");
      }
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.email = email;
      this.tipo = tipo;
      this.nascimento = new Date(Date.UTC(nascimento.getFullYear(), nascimento.getMonth(), nascimento.getDate()));
      this.notas = notas;
    }
  }
  
  class Turma {
    codigo: number;
    maxAlunos: number;
    alunos: Aluno[];
    descricao: string;
    tipo: "presencial" | "ead";
  
    constructor(codigo: number, descricao: string, tipo: "presencial" | "ead") {
      if (codigo < 1 || codigo > 10) {
        throw new Error("O código da turma deve estar entre 1 e 10.");
      }
      this.codigo = codigo;
      this.maxAlunos = 10; // Máximo de 10 alunos por turma
      this.alunos = [];
      this.descricao = descricao;
      this.tipo = tipo;
    }
  
    adicionarAluno(aluno: Aluno): void {
      if (this.alunos.length >= this.maxAlunos) {
        throw new Error("A turma já atingiu o número máximo de alunos.");
      }
  
      if (aluno.turma !== this.codigo) {
        throw new Error("O aluno não pertence a esta turma.");
      }
  
      if (aluno.tipo !== this.tipo) {
        throw new Error(`O aluno de tipo ${aluno.tipo} não pode ser adicionado à turma ${this.tipo}.`);
      }
  
      if (this.alunos.some(a => a.email === aluno.email)) {
        throw new Error("Aluno com este email já está cadastrado.");
      }
  
      this.alunos.push(aluno);
    }
  
    removerAluno(email: string): void {
      this.alunos = this.alunos.filter(aluno => aluno.email !== email);
    }
  
    listarAlunos(): void {
      console.log(`Alunos da turma ${this.codigo}:`);
      this.alunos.forEach(aluno => aluno.exibirInformacoes());
    }
  }
  
  class Escola {
    turmas: Turma[];
  
    constructor() {
      this.turmas = [];
    }
  
    adicionarTurma(turma: Turma): void {
      // Verifica se já existe uma turma com o mesmo código
      if (this.turmas.some(t => t.codigo === turma.codigo)) {
        throw new Error(`Já existe uma turma com o código ${turma.codigo}.`);
      }
  
      this.turmas.push(turma);
    }
  
    totalDeTurmas(): number {
      return this.turmas.length;
    }
  
    listarTodosAlunos(): void {
      console.log("Lista completa de alunos:");
      this.turmas.forEach(turma => {
        turma.alunos.forEach(aluno => aluno.exibirInformacoes());
      });
    }
  
    buscarAluno(email: string): Aluno | undefined {
      for (const turma of this.turmas) {
        const alunoEncontrado = turma.alunos.find(aluno => aluno.email === email);
        if (alunoEncontrado) {
          return alunoEncontrado;
        }
      }
      return undefined; // Aluno não encontrado
    }
  }
  
  // Exemplo de criação de turmas, alunos e escola
  const escola = new Escola();
  
  const turma1 = new Turma(1, "Turma de Matemática", "presencial");
  const turma2 = new Turma(2, "Turma de História", "ead");
  
  const aluno1 = new Aluno("João", "Silva", "joao@example.com", "presencial", 1, new Date("2005-05-15"), [9, 8, 7]);
  const aluno2 = new Aluno("Maria", "Oliveira", "maria@example.com", "presencial", 1, new Date("2006-07-10"), [6, 7, 8]);
  const aluno3 = new Aluno("Carlos", "Pereira", "carlos@example.com", "ead", 2, new Date("2004-12-20"), [8, 9, 9]);
  const aluno4 = new Aluno("Ana", "Souza", "ana@example.com", "ead", 2, new Date("2005-01-25"), [10, 9, 9]);
  
  // Adicionar turmas à escola
  escola.adicionarTurma(turma1);
  escola.adicionarTurma(turma2);
  
  // Adicionar alunos às turmas
  turma1.adicionarAluno(aluno1);
  turma1.adicionarAluno(aluno2);
  
  turma2.adicionarAluno(aluno3);
  turma2.adicionarAluno(aluno4);
  
  // Exibir o número total de turmas na escola
  console.log(`Total de turmas na escola: ${escola.totalDeTurmas()}`);
  
  // Listar todos os alunos da escola
  escola.listarTodosAlunos();
  
  // Buscar um aluno específico
  const alunoEncontrado = escola.buscarAluno("carlos@example.com");
  if (alunoEncontrado) {
    console.log("\nAluno encontrado:");
    alunoEncontrado.exibirInformacoes();
  } else {
    console.log("Aluno não encontrado.");
  }
  
  // Tentar adicionar uma turma duplicada
  try {
    escola.adicionarTurma(new Turma(1, "Turma duplicada", "presencial"));
  } catch (error) {
    console.error(error);
  }
  
  // Atualizar informações de João e suas notas
  aluno1.atualizarInformacoes("João Pedro", "Silva", "joao.pedro@example.com", "presencial", new Date("2005-05-15"), [10, 9, 9, 8]);
  
  console.log("\nApós atualizar informações de João:");
  aluno1.exibirInformacoes();
  