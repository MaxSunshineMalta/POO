import { error } from 'console';
import * as fs from 'fs';

export class AplicacaoError extends Error {
    constructor(message: string){
        super(message);
    }
}

export class ContaInexistenteError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

export class SaldoInvalidoError extends AplicacaoError {
    constructor(message: string){
        super(message);
    }
}

export class SaldoInsuficienteError extends Error {
        constructor(message: string){
            super(message);
        }
}

export class ValorInvalidoError extends Error {
    constructor(message: string){
        super(message);
    }
}

export class PoupancaInvalidaError extends AplicacaoError{
    constructor(message: string){
        super(message);
    }
}

export class EntradaInvalidaError extends AplicacaoError{
    constructor(message: string){
        super(message);
    }
}

export class Conta {
    private _numero: string;
    private _saldo: number;
    constructor(numero: string, saldo: number){
        this._numero = numero;
        this._saldo = 0;
        this.depositar(saldo);
    }

    get numero(): string{
        return this._numero;
    }
    
    get saldo(): number{
        return this._saldo;
    }

    private validarValor(valor: number): number{
        if(valor <= 0){
            throw new ValorInvalidoError('Valor negativo ou igual a 0.');
        }

        return valor;
    }

    sacar(valor: number): void {
        valor = this.validarValor(valor);

        if(this._saldo < valor){
            throw new SaldoInsuficienteError('Saldo insuficente.');
        }
            
        this._saldo = this._saldo - valor;
        
        
    }
   
    depositar(valor: number): void {
        valor = this.validarValor(valor);

        this._saldo = this._saldo + valor;
        
    }

    transferir(conta: Conta, valor: number): void{
        conta.depositar(valor);
        this.sacar(valor);
    }
}
export class Banco{
   private contas: Conta[] = [];
   private CAMINHO_ARQUIVO: string = "C:/Users/Kadu/POO/ativ_avaliativa/contas.txt";

   public consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for(let i: number = 0; i < this.contas.length; i++){
            if(this.contas[i].numero == numero){
                contaProcurada = this.contas[i];
                break;
            }
        }

        if(!contaProcurada){
            throw new ContaInexistenteError("A conta procurada não existe.")
        }

        return contaProcurada;
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        if(indiceProcurado == -1){
            throw new ContaInexistenteError("A conta procurada não existe, logo é impossível retornar seu índice.")
        }

        return indiceProcurado;
    }

    public inserir(conta: Conta): void {
        try{
            let contaProcurada: Conta = this.consultar(conta.numero);
            console.log("Já existe uma conta com esse número.")
        } catch(erro: any){
            this.contas.push(conta);
            console.log("Conta adicionada.")
        }
    }

    public alterar(conta: Conta): void {
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        
        this.contas[indiceProcurado] = conta;
        console.log("Conta Alterada.")
    }

    public excluir(numero: string): void {
        let indiceProcurado = this.consultarPorIndice(numero);

        for (let i = indiceProcurado; i < this.contas.length; i++) {
            this.contas[i] = this.contas[i+1];
        }
        this.contas.pop();
        console.log("Conta Excluída.")
    }

    public sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        let conta: Conta = this.contas[indiceProcurado];
        conta.sacar(valor);
        
    }

    public depositar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        let conta: Conta = this.contas[indiceProcurado];
        conta.depositar(valor);
    }

    public transferir(numeroOrigem: string, numeroDestino: string, valor: number): void{
        let indiceProcuradoOrigem: number = this.consultarPorIndice(numeroOrigem);
        let indiceProcuradoDestino: number = this.consultarPorIndice(numeroDestino);

        let contaOrigem: Conta = this.contas[indiceProcuradoOrigem];
        let contaDestino: Conta = this.contas[indiceProcuradoDestino];

        contaOrigem.transferir(contaDestino, valor);            
    }

    public calcularQtdContas(): number{
        let contador: number = 0;

        for(let i: number = 0; i < this.contas.length; i++){
            contador++;
        }

        return contador;
    }

    public calcularDinheiroDoBanco(): number{
        let DinheiroDoBanco: number = 0;

        for(let i: number = 0; i< this.contas.length; i++){
            DinheiroDoBanco += this.contas[i].saldo;
        }

        return DinheiroDoBanco;
    }

    public calcularMediaDoDinheiro(): number{
        let qtdContas: number = this.calcularQtdContas();
        let dinheiro:number = this.calcularDinheiroDoBanco();
        let media: number = dinheiro / qtdContas;

        return media;
    }

    public consultarSaldo(numero: string): number{
        let indiceProcurado: number = this.consultarPorIndice(numero);

        if(indiceProcurado != -1){
            return this.contas[indiceProcurado].saldo;
        }

        return -1;
    }

    renderJuros(numero: string) {
		let conta: Conta = this.consultar(numero);
        if(!(conta instanceof Poupanca)){
            throw new PoupancaInvalidaError("A conta não é do tipo poupança.")
        }
		
        conta.renderJuros();
        console.log("Juros rendidos.")
	}

    public carregarDeArquivo() {
		const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
		const linhas: string[] = arquivo.split('\r\n');
		console.log("Iniciando leitura de arquivo");

		for (let i: number = 0; i < linhas.length; i++) {
			let linhaConta: string[] = linhas[i].split(";");
			let conta!: Conta;
			let tipo: string  = linhaConta[2];
			if (tipo == 'C') {
				conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
			} else if (tipo == 'CP') {
				conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
			} else if (tipo == 'CI') {
				conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
			}

			this.inserir(conta);
			console.log(`Conta ${conta.numero} carregada`);
		}

		console.log("fim do arquivo")

	}

	public salvarEmArquivo() {
		console.log("Iniciando a gravação de contas em arquivo.")
		let stringContas: string = "";
		let linha: string = "";

		for (let conta of this.contas) {
			if (conta instanceof Poupanca) {
				linha = `${conta.numero};${conta.saldo};CP;${conta.taxaDeJuros}\r\n`;
			} else if ((conta instanceof ContaImposto)) {
				linha = `${conta.numero};${conta.saldo};CI;${conta.taxaDesconto}\r\n`;
			} else {
				linha = `${conta.numero};${conta.saldo};C\r\n`;
			}

			stringContas += linha;
		}
		stringContas = stringContas.slice(0,stringContas.length-2);

		fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas,'utf-8');
		console.log("Contas salvas em arquivo.")
	}
}

export class Poupanca extends Conta {
	private _taxaDeJuros: number;

	constructor(numero: string, saldo: number, taxaDeJuros: number) {
		super(numero, saldo);
		this._taxaDeJuros = taxaDeJuros;
	}

	renderJuros(): void {
		let juros: number = this.saldo * this._taxaDeJuros / 100;
		this.depositar(juros);
	}

	get taxaDeJuros(): number {
		return this._taxaDeJuros;
	}
}

export class ContaImposto extends Conta {
	private _taxaDesconto: number;

	constructor(numero: string, saldo: number, taxaDesconto: number) {
		super(numero, saldo);
		this._taxaDesconto = taxaDesconto
	}

	sacar(valor: number): void {
		let valorDesconto = this.saldo * this._taxaDesconto / 100;
		super.sacar(valor + valorDesconto);
	}

	get taxaDesconto(): number {
		return this._taxaDesconto;
	}
}

//let b: Banco = new Banco();

//Testes questão 3
/*let conta1: Conta = new Conta("111", 250);
let conta2: Conta = new Conta("222", 100);*/
/*conta1.sacar(300);
conta2.sacar(150);*/

//Testes questão 4
//conta2.transferir(conta1, 150);

//Testes questão 5
/*b.inserir(conta1);
b.inserir(conta2);*/
/*b.transferir("222", "111", 150);
b.transferir("111", "222", 400);*/

//Testes questão 6
/*b.transferir("222", "111", 80);
b.transferir("111", "222", 200);
console.log(b.consultar("222").saldo);
console.log(b.consultar("111").saldo);*/
/*b.consultar("111").sacar(-2);
b.consultar("222").depositar(-4);*/




