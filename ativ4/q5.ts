class Conta {
    numero: String;
    saldo: number;

    constructor(numero: string, saldo: number){
        this.numero = numero;
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


let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;

c1 = c2;
c3 = c1;

c1.sacar(10);
c1.transferir(c2,50);

console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());

//a) Ambos exibem o mesmo resultado que é 90, pois apontam para o mesmo endereço de memória
//b) Ele é perdido, uma vez que nenhuma variável apontava mais para ele.