import prompt from "prompt-sync";
import { Conta, Banco } from "./banco";

let input = prompt();
let b: Banco = new Banco();
let opcao: string = '';

do {
console.log('\nBem vindo\nDigite uma opção:');
console.log('1 - Cadastrar 2 - Consultar 3 - Sacar\n' +
'4 - Depositar 5 - Excluir 6 - Transferir\n' +
'7 – Totalizações de Contas\n' + '8 - Totalizações de Saldos\n' + 
'9 - Média do Saldo Acumulado\n' + '10 - Consultar por Índice\n ' + "11 - Alterar\n" +
'0 - Sair\n');
    opcao = input("Opção:");

    switch (opcao) {
        case "1":
            inserir();
            break
        case "2":
            consultar();
            break
        case "3":
            sacar();
            break
        case "4":
            depositar();
            break
        case "5":
            excluir();
            break
        case "6":
            transferir();
            break
        case "7":
            totalizarQtdContas();
            break
        case "8":
            totalizarQtdSaldo();
            break
        case "9":
            calcularMediaSaldo();
            break
        case "10":
            consultarPorIndice();
            break
        case "11":
            alterar();
            break 
}

input("Operação finalizada. Digite <enter>");

} while (opcao != "0");

console.log("Aplicação encerrada");


function inserir(): void {
    console.log("\nCadastrar conta\n");
    
    let numero: string = input('Digite o número da conta:');
    let nome: string = input('Digite o nome do usuário da conta:');
    let saldoEmString = input("Digite o saldo da conta:");
    let saldoNumero = parseFloat(saldoEmString);
    
    let conta: Conta = new Conta(numero, nome, saldoNumero);
    b.inserir(conta);
}


function consultar(): void {
    let numero: string = input('Digite o número da conta que está buscando:');
    let conta: Conta = b.consultar(numero);

    console.log(conta);
}


function sacar(): void{
    let numero: string = input('Digite o número da conta que você quer sacar:');
    let valorEmString: string = input("Digite o valor que será sacado:");
    let valorNumero: number = parseFloat(valorEmString);

    let conta: Conta = b.consultar(numero);

    console.log(`Valor do saldo antes do saque: ${conta.saldo}\n`);
    b.sacar(numero, valorNumero);
    console.log(`Valor do saldo depois do saque: ${conta.saldo}\n`);
}


function depositar(): void{
    let numero: string = input('Digite o número da conta que você quer depositar:');
    let valorEmString: string = input("Digite o valor que será depositado:");
    let valorNumero: number = parseFloat(valorEmString);

    let conta: Conta = b.consultar(numero);

    console.log(`Valor do saldo antes do depósito: ${conta.saldo}\n`);
    b.depositar(numero, valorNumero);
    console.log(`Valor do saldo depois do depósito: ${conta.saldo}\n`);
}


function excluir(): void{
    let numero: string = input('Digite o número da conta que deseja excluir:');
    b.excluir(numero);
}


function transferir(): void{
    let numeroOrigem: string = input('Digite o número da conta de onde será tranferido:');
    let numeroDestino: string = input('Digite o número da conta para qual será transferido:');
    let valorEmString: string = input("Digite o valor que será transferido:");
    let valorNumero: number = parseFloat(valorEmString);

    let contaOrigem: Conta = b.consultar(numeroOrigem);
    let contaDestino: Conta = b.consultar(numeroDestino);

    console.log(`Valor do saldo antes da transferência: ${contaDestino.saldo}\n`);
    b.tranferir(numeroOrigem, numeroDestino, valorNumero);
    console.log(`Valor do saldo depois da transferência: ${contaDestino.saldo}\n`);
}


function totalizarQtdContas(): void{
     console.log(b.calcularQtdContas());
}


function totalizarQtdSaldo(): void{
    console.log(b.calcularDinheiroDoBanco());
}


function calcularMediaSaldo(): void{
    console.log(b.calcularMediaDoDinheiro());
}


function consultarPorIndice(): void{
    let numero: string = input('Digite o número da conta deseja descobrir o índice:');
    console.log(b.consultar(numero));
}


function alterar(): void{
    let numero: string = input('Digite o número da conta deseja alterar:');
    
    let conta: Conta = b.consultar(numero);

    b.alterar(conta);
}

