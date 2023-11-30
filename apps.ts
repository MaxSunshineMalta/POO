import prompt from "prompt-sync";
import { Conta, Banco, AplicacaoError, ContaInexistenteError, SaldoInsuficienteError, ValorInvalidoError, PoupancaInvalidaError, SaldoInvalidoError, EntradaInvalidaError, Poupanca, ContaImposto } from "./banco";

let input = prompt();
let b: Banco = new Banco();
let opcao: number = 0;

do {
console.log('\nBem vindo\nDigite uma opção:');
console.log("1 - Cadastrar\n" +  "2 - Consultar\n" + "3 - Sacar\n" +
"4 - Depositar\n" + "5 - Excluir\n" +  "6 - Transferir\n" +
"7 - Consultar por Índice\n" + "8 - Alterar\n" + "9 - Salvar em arquivo\n" +
"10 - Carregar de Arquivo\n" + "11 - Render Juros\n" +'0 - Sair\n');
    try{
        opcao = parseFloat(input("Opção:"));

        if( isNaN(opcao) || (opcao > 11 || opcao < 0)){
            throw new EntradaInvalidaError("Valor de Entrada Inválido.")
        }

        switch (opcao) {
            case 1:
                inserir();
                break
            case 2:
                consultar();
                break
            case 3:
                sacar();
                break
            case 4:
                depositar();
                break
            case 5:
                excluir();
                break
            case 6:
                transferir();
                break
            case 7:
                consultarPorIndice();
                break
            case 8:
                alterar();
                break 
            case 9:
                salvarEmArquivo();
                break
            case 10:
                carregarDeArquivo();
                break
            case 11:
                renderJuros();
                break
        }
    }catch(erro: any){
        if(erro instanceof ContaInexistenteError){
            console.log(erro.message);
        }else if(erro instanceof SaldoInsuficienteError){
            console.log(erro.message);
        }else if(erro instanceof ValorInvalidoError){
            console.log(erro.message);
        }else if(erro instanceof PoupancaInvalidaError){
            console.log(erro.message);
        }else if(erro instanceof SaldoInvalidoError){
            console.log(erro.message);
        } else if(erro instanceof AplicacaoError){
            console.log(erro.message);
        }else if (erro instanceof Error) {
            console.log("Erro no sistema. Contate o administrador.");
        }
    }finally{
        input("Operação finalizada. Digite <enter>");
        console.clear();
    }

} while (opcao != 0);

console.log("Aplicação encerrada");


function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = input('Digite o número da conta: ');
    let saldo: number = parseFloat(input('Digite o saldo da conta: '));
    let conta: Conta = new Conta("", 1);

    let opcao: number = parseFloat(input('Você deseja criar uma conta normal, uma conta poupança ou conta imposto? 1, 2 ou 3, respectivamente: '));
    
    if(!verificarSePassaApenasNumeros(numero) || isNaN(saldo) || isNaN(opcao) || (opcao > 3 || opcao <= 0)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    if (opcao == 1) {
        conta = new Conta(numero, saldo);
    } else if (opcao == 2) {
        let taxaDeJuros: number = parseFloat(input('Digite a taxa de juros: '));
        if(isNaN(taxaDeJuros)){
            throw new EntradaInvalidaError("Valor de Entrada Inválido.")
        }
        conta = new Poupanca(numero, saldo, taxaDeJuros);
    } else if (opcao == 3) {
        let taxaDesconto: number = parseFloat(input('Digite a taxa de desconto: '));
        if(isNaN(taxaDesconto)){
            throw new EntradaInvalidaError("Valor de Entrada Inválido.")
        }
        conta = new ContaImposto(numero, saldo, taxaDesconto);
    }

    b.inserir(conta);
}


function consultar(): void {
    let numero: string = input('Digite o número da conta que está buscando:');

    if(!verificarSePassaApenasNumeros(numero)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    let conta: Conta = b.consultar(numero);
    console.log(conta);
}


function sacar(): void{
    let numero: string = input('Digite o número da conta que você quer sacar:');
    let valor: number = parseFloat(input("Digite o valor que será sacado:"));

    if(!verificarSePassaApenasNumeros(numero) || isNaN(valor)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    let conta: Conta = b.consultar(numero);

    console.log(`\nValor do saldo antes do saque: ${conta.saldo}\n`);
    b.sacar(numero, valor);
    console.log(`Valor do saldo depois do saque: ${conta.saldo}\n`);
}


function depositar(): void{
    let numero: string = input('Digite o número da conta que você quer depositar:');
    let valor: number = parseFloat(input("Digite o valor que será depositado:"));

    if(!verificarSePassaApenasNumeros(numero) || isNaN(valor)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    let conta: Conta = b.consultar(numero);

    console.log(`\nValor do saldo antes do depósito: ${conta.saldo}\n`);
    b.depositar(numero, valor);
    console.log(`Valor do saldo depois do depósito: ${conta.saldo}\n`);
}


function excluir(): void{
    let numero: string = input('Digite o número da conta que deseja excluir:');

    if(!verificarSePassaApenasNumeros(numero)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    b.excluir(numero);
}


function transferir(): void{
    let numeroOrigem: string = input('Digite o número da conta de onde será tranferido:');
    let numeroDestino: string = input('Digite o número da conta para qual será transferido:');
    let valor: number = parseFloat(input("Digite o valor que será transferido:"));

    if(!verificarSePassaApenasNumeros(numeroOrigem) || !verificarSePassaApenasNumeros(numeroDestino) ||isNaN(valor)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    let contaDestino: Conta = b.consultar(numeroDestino);

    console.log(`\nValor do saldo antes da transferência: ${contaDestino.saldo}\n`);
    b.transferir(numeroOrigem, numeroDestino, valor);
    console.log(`Valor do saldo depois da transferência: ${contaDestino.saldo}\n`);
}

function consultarPorIndice(): void{
    let numero: string = input('Digite o número da conta deseja descobrir o índice:');

    if(!verificarSePassaApenasNumeros(numero)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    console.log(b.consultar(numero));
}


function alterar(): void{
    let numero: string = input('Digite o número da conta deseja alterar:');

    if(!verificarSePassaApenasNumeros(numero)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }
    
    let conta: Conta = b.consultar(numero);

    b.alterar(conta);
}

function salvarEmArquivo(): void{
    b.salvarEmArquivo();
}

function carregarDeArquivo(): void{
    b.carregarDeArquivo();
}

function renderJuros(){
    console.log("\n Render Juros\n");
    let numero: string = input('Digite o número da conta poupança:');

    if(!verificarSePassaApenasNumeros(numero)){
        throw new EntradaInvalidaError("Valor de Entrada Inválido.")
    }

    b.renderJuros(numero);
}

function verificarSePassaApenasNumeros(valor: string): boolean{
    const regex: RegExp = /^[0-9]+$/;
    return regex.test(valor);
}
