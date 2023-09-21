class Conta {
    numero: string;
    nome: string;
    saldo: number;

    constructor(numero: string, nome: string,  saldo: number){
        this.numero = numero;
        this.nome = nome;
        this.saldo = saldo;
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }
   
    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }
    
    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(conta: Conta, valor: number): void{
        conta.depositar(valor);
        this.sacar(valor);
    }
}

class Banco4{
    contas: Conta[] = [];

    consultar(numero: string): Conta {
        let contaProcurada!: Conta = null;

        for(let i: number = 0; i < this.contas.length; i++){
            if(this.contas[i].numero == numero){
                contaProcurada = this.contas[i];
                break;
            }
        }

        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    inserir(conta: Conta): void {
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        
        if(indiceProcurado == -1){
            this.contas.push(conta);
        }
    }

    alterar(conta: Conta): void {
        let indiceProcurado: number = this.consultarPorIndice(conta.numero);
        
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado] = conta;
        }
    }

    excluir(numero: string): void {
        let indiceProcurado = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i+1];
            }
            this.contas.pop();
        }
    }

    sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            let conta: Conta = this.contas[indiceProcurado];
            conta.sacar(valor);
        }
    }

    tranferir(numeroOrigem: string, numeroDestino: string, valor: number): void{
        let indiceProcuradoOrigem: number = this.consultarPorIndice(numeroOrigem);
        let indiceProcuradoDestino: number = this.consultarPorIndice(numeroDestino);

        if(indiceProcuradoOrigem != -1 && indiceProcuradoDestino != -1){
            let contaOrigem: Conta = this.contas[indiceProcuradoOrigem];
            let contaDestino: Conta = this.contas[indiceProcuradoDestino];

            contaOrigem.transferir(contaDestino, valor);            
        }
    }

    calcularQtdContas(): number{
        let contador: number = 0;

        for(let i: number = 0; i < this.contas.length; i++){
            contador++;
        }

        return contador;
    }

    calcularDinheiroDoBanco(): number{
        let DinheiroDoBanco: number = 0;

        for(let i: number = 0; i< this.contas.length; i++){
            DinheiroDoBanco += this.contas[i].saldo;
        }

        return DinheiroDoBanco;
    }

    calcularMediaDoDinheiro(): number{
        let qtdContas: number = b.calcularQtdContas();
        let dinheiro:number = b.calcularDinheiroDoBanco();
        let media: number = dinheiro / qtdContas;

        return media;
    }
}

let b: Banco4 = new Banco4();
b.inserir(new Conta("11111-2", "ely", 100));
console.log(b.consultar("11111-2"));

let contaAlterada:  Conta | null= b.consultar("11111-2");
contaAlterada.nome = "ely da silva miranda";
b.alterar(contaAlterada)
console.log(b.consultar("11111-2"));
b.inserir(new Conta("2222-2", "ely", 100));
b.inserir(new Conta("11111-2", "eli", 100));

console.log(b);
console.log(b.calcularQtdContas());
console.log(b.calcularDinheiroDoBanco());
console.log(b.calcularMediaDoDinheiro());

