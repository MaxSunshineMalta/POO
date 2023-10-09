export class Conta {
    constructor(private _numero: string, private _nome: string, private _saldo: number){}

    get numero(): string{
        return this._numero;
    }
    
    get nome(): string{
        return this._nome;
    }

    get saldo(): number{
        return this._saldo;
    }

    sacar(valor: number): void {
        this._saldo = this._saldo - valor;
    }
   
    depositar(valor: number): void {
        this._saldo = this._saldo + valor;
    }

    transferir(conta: Conta, valor: number): void{
        conta.depositar(valor);
        this.sacar(valor);
    }
}
export class Banco{
   private contas: Conta[] = [];

   public consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for(let i: number = 0; i < this.contas.length; i++){
            if(this.contas[i].numero == numero){
                contaProcurada = this.contas[i];
                break;
            }
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

        return indiceProcurado;
    }

    public inserir(conta: Conta): void {
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        
        if(indiceProcurado == -1){
            this.contas.push(conta);
        }
    }

    public alterar(conta: Conta): void {
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado] = conta;
        }
    }

    public excluir(numero: string): void {
        let indiceProcurado = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i+1];
            }
            this.contas.pop();
        }
    }

    public sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            let conta: Conta = this.contas[indiceProcurado];
            conta.sacar(valor);
        }
    }

    public depositar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            let conta: Conta = this.contas[indiceProcurado];
            conta.depositar(valor);
        }
    }

    public tranferir(numeroOrigem: string, numeroDestino: string, valor: number): void{
        let indiceProcuradoOrigem: number = this.consultarPorIndice(numeroOrigem);
        let indiceProcuradoDestino: number = this.consultarPorIndice(numeroDestino);

        if(indiceProcuradoOrigem != -1 && indiceProcuradoDestino != -1){
            let contaOrigem: Conta = this.contas[indiceProcuradoOrigem];
            let contaDestino: Conta = this.contas[indiceProcuradoDestino];

            contaOrigem.transferir(contaDestino, valor);            
        }
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
}

let b: Banco = new Banco();
b.inserir(new Conta("666", "Giovanna", 100));
b.inserir(new Conta("6969", "Max", 10));