import { parse } from "path";
import prompt from "prompt-sync"
let input = prompt();

/*Resposta: Os 3 tipos mais comuns de tratamentos de erro são as exceções, 
a exibição de uma mensagem de erro e a desconsideração da operação.*/

//Exemplo de exceção

class divisaoPorZeroError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DivisaoPorZeroError";
    }
}

function divideNumeroExcecao(dividendo: number ,divisor: number): number {
    if (divisor == 0) {
        throw new divisaoPorZeroError("Erro: Divisão por zero não é permitida.");
    }
    return dividendo / divisor;
}

try {
    let dividendoString: string | null = input("Digite um número:");
    let divisorString: string | null = input("Digite um número:");
    
    if (dividendoString != null && divisorString != null){
        let dividendo: number = parseFloat(dividendoString);
        let divisor: number = parseFloat(divisorString);
        let resultado: number = divideNumeroExcecao(dividendo, divisor);
        console.log("Resultado:", resultado);
    } else {
        console.log("Entrada inválida.");
    }

} catch (error) {
    if(error instanceof divisaoPorZeroError){
        console.log(error.message);
    }else{
        console.log("Erro desconhecido1")
    }
}

//Exemplo de Exibição de mensagem de erro

function divideNumero(dividendo: number, divisor: number): number | string {
    if (divisor == 0) {
        return "Erro: Divisão por zero não é permitida.";
    }
    return dividendo / divisor;
}

let dividendoString: string | null = input("Digite um número:");
let divisorString: string | null = input("Digite um número:");
    
if (dividendoString != null && divisorString != null){
    let dividendo: number = parseFloat(dividendoString);    
    let divisor: number = parseFloat(divisorString);
    let resultado: number | string= divideNumero(dividendo, divisor);

    if (typeof resultado === "number") {
        console.log("Resultado:", resultado);
    } else {
        console.log(resultado);
    }
} else {
    console.log("Entrada inválida.");
}  

//exemplo de desconsideração de operação
function divideNumeroDesconsiderandoError(dividendo:number, divisor: number): number{
   if(divisor != 0){
        return dividendo / divisor;
   }

   return -1;
}

let resultado: number = divideNumeroDesconsiderandoError(2, 0);
console.log(`Resultado: ${resultado}`);


/*2 - As limitações associadas ás exceções são o alto custo de desempenho, o uso exacerbado(pode tornar o código
complexo de entender) e a possibilidade de ocorrência de eventos inesperados, dado que exije uma gerência adequada
das mais diversas possibilidades. As principais limitações da exibição de uma mensagem de erro são que apesar de
coerente para os desenvolvedores, muitas vezes elas não são claras para os clientes, além de que elas geralmente
fornecem informações limitadas sobre a causa subjacente do problema e que ainda não abrangem interfaces gráficas,
dificultando o diagnóstico e a correção. Por fim, as limitações da descosideração de operação podem levar á falta de
consciência de alguns problemas existentes, dificultando a identificação e posterior solução do problema.*/

//3 - Implementado e testado no código banco.ts

/*4 - Implementdo e testado. O que ocorreu é porque ele tenata sacar um valor que é superior ao saldo da conta, fazendo
com que a exceção ocorra, impedindo o resto do funcionamento do código.*/

/*5 - Sim, uma vez que o método transferir da classe econta é chamado pelo transferir da classe banco que é chamado pelo 
do script app, logo se houver um erro capturado nela, propagará para todos. Eu avalio a confiabilidade dessa aplicação como
muito boa, uma vez que resulta na não necessidade de implementar a exceção em mais de uma classe e sim apenas no método transferir
da classe Conta.*/

//6 - Feito

//7 - Feito

// 8 - Feito

//9 - Feito

//10 - Feito

//11 - Feito

//12 - Feito

//13 - Feito

//14 - Feito

//15 - Feito









