class Conta1 {
    numero: String;
    saldo: number;

    constructor(numero: string, saldo: number){
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): boolean {
        if(this.saldo - valor >= 0){
            this.saldo = this.saldo - valor;
            return true;
        }else{
            return false;
        }
    }
   
    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }
    
    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(conta: Conta1, valor: number): boolean{
        if(this.sacar(valor) == true){
            conta.depositar(valor);
            return true;
        }else{
            return false;
        }
    }
}


let conta1: Conta1 = new Conta1("1111", 100);
let conta2: Conta1 = new Conta1("2222", 100);

console.log(conta1.sacar(110));
console.log(conta1.consultarSaldo());
console.log(conta1.transferir(conta2, 110));
console.log(conta1.consultarSaldo());
console.log(conta1.sacar(20));
console.log(conta1.consultarSaldo());
console.log(conta1.transferir(conta2, 20));
console.log(conta1.consultarSaldo());
console.log(conta2.consultarSaldo());


