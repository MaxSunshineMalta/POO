class Pessoa {
    constructor(private _nome: string, private _sobrenome: string) { }

    get nome(): string {
        return this._nome;
    }

    get sobrenome(): string {
        return this._sobrenome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    set sobrenome(sobrenome: string) {
        this._sobrenome = sobrenome;
    }

    get nomeCompleto(): string {
        return this.nome + " " + this.sobrenome;
    }
}

class Funcionario extends Pessoa {
    constructor(private _matricula: string, private _salario: number, nome: string, sobrenome: string) {
        super(nome, sobrenome);
    }

    get matricula(): string {
        return this._matricula;
    }

    get salario(): number {
        return this._salario;
    }

    set matricula(matricula: string) {
        this._matricula = matricula;
    }

    set salario(salario: number) {
        this._salario = salario >= 0 ? salario : 0;
    }

    calcularSalarioPrimeiraParcela(): number {
        return this.salario * 0.6;
    }

    calcularSalarioSegundaParcela(): number {
        return this.salario * 0.4;
    }
}

class Professor extends Funcionario {
    constructor(private _titulacao: string, matricula: string, salario: number, nome: string, sobrenome: string) {
        super(matricula, salario, nome, sobrenome);
    }

    get titulacao(): string {
        return this._titulacao;
    }

    set titulacao(titulacao: string) {
        this._titulacao = titulacao;
    }

    calcularSalarioPrimeiraParcela(): number {
        return this.salario;
    }

    calcularSalarioSegundaParcela(): number {
        return 0;
    }
}

class FolhaDePagamento {
    constructor(private _pessoas: Pessoa[]) {
    }

    get pessoas(): Pessoa[] {
        return this._pessoas;
    }

    set pessoas(pessoas: Pessoa[]) {
        this._pessoas = pessoas;
    }

    calcularPagamentos(): number {
        let totalSalario: number = 0;

        /*for (let i: number = 0; i < this.pessoas.length; i++) {
            if (this.pessoas[i] instanceof Funcionario || this.pessoas[i] instanceof Professor) {
                totalSalario += this.pessoas[i].salario;
            }
        }*/

        for (const pessoa of pessoas) {
            if (pessoa instanceof Funcionario || pessoa instanceof Professor) {
                totalSalario += pessoa.salario;
            }
        }

        return totalSalario;
    }
}

const pessoas: Pessoa[] = [
    new Funcionario('12345', 3000, 'João', 'Silva'),
    new Professor('Doutor','98765', 5000, 'Maria', 'Santos'),
    new Funcionario('12344', 12000, 'Alice', 'Ferreira')
];

const folhaDePagamento = new FolhaDePagamento(pessoas);
const totalSalario = folhaDePagamento.calcularPagamentos();
console.log('Total de Salários a Pagar: ' + totalSalario);
