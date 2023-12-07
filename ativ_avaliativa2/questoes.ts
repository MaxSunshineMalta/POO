/*1 - Resposta: Não, uma vez que classes abstratas não tem funcionalidade por si só, elas apenas existem com o intuito
de servirem de base para outras classes. Assim, não podendo ser instanciadas. */

import test from "node:test";

/*2 - O  que está faltando para que a compilação ocorra sem problemas é a implementação do método  imprimaAlgo, uma vez que
apesar de criado na classe classeAbstrata, na classe classeCocreta ele não é implementado, assim dando erro.*/

/*3 - Aparece um erro de compilação devido ao fato que a classe não abstrata não implementou todos os membros abastratos da classe
que herda.*/

// 4 -
abstract class FiguraGeometrica{
    abstract calcularPerimetro(): number;
    abstract calcularArea(): number;
}

class Quadrado extends FiguraGeometrica{
    private _tamanhoLado: number;

    constructor(tamanhoLado: number){
        super();
        this._tamanhoLado = tamanhoLado;
    }

    get tamanhoLado(): number{
        return this._tamanhoLado;
    }

    calcularArea(): number {
        return this.tamanhoLado * this.tamanhoLado;
    }

    calcularPerimetro(): number {
        return this.tamanhoLado * 4;
    }
}

class Triangulo extends FiguraGeometrica{
    private _tamanhoLado: number;

    constructor(tamanhoLado: number){
        super();
        this._tamanhoLado = tamanhoLado;
    }

    get tamanhoLado(): number{
        return this._tamanhoLado;
    }

    calcularArea(): number {
        return Math.sqrt(3) * this.tamanhoLado * this.tamanhoLado / 4;
    }

    calcularPerimetro(): number {
        return this.tamanhoLado * 3;
    }
}

class Circulo extends FiguraGeometrica{
    private _raio: number;

    constructor(raio: number){
        super();
        this._raio = raio;
    }

    get raio(): number{
        return this._raio;
    }

    calcularArea(): number {
        return 3.14 * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * 3.14 * this.raio;
    }
}

class Retangulo extends FiguraGeometrica{
    private _altura: number;
    private _largura: number;

    constructor(altura: number, largura: number){
        super();
        this._altura = altura;
        this._largura = largura;
    }

    get altura(): number{
        return this._altura;
    }

    get largura(): number{
        return this._largura;
    }

    calcularArea(): number {
        return this.altura * this.largura;
    }

    calcularPerimetro(): number {
        return 2 * this.largura + 2 * this.altura;
    }
}

/*5 - Isso é possível uma vez que ele não está instanciando diretamente uma figura geométrica, mas sim permitindo a criação de uma
lista de de subclasses concretas que herdam de FiguraGeometrica, como as classes Quadrado, Circulo e Triangulo.*/

//6 - 
abstract class Funcionario1 {
    private _salario: number;

    constructor(salario: number) {
        this._salario = salario
    }

    get salario(): number {
        return this._salario;
    }

    abstract getBonificacao(): number;
}

class Gerente extends Funcionario1 {
    constructor(salario: number) {
        super(salario);
    }

    getBonificacao(): number {
        return this.salario * 0.4;
    }
}

class Diretor extends Funcionario1{
    constructor(salario: number) {
        super(salario);
    }

    getBonificacao(): number {
        return this.salario * 0.6;
    }
}

class Presidente extends Funcionario1{
    constructor(salario: number){
        super(salario);
    }

    getBonificacao(): number {
        return this.salario + 1000;
    }
}

//7 -
interface FiguraGeometrica1{
    calcularPerimetro(): number;
    calcularArea(): number;
}

class Quadrado1 implements FiguraGeometrica1, IComparavel{
    private _tamanhoLado: number;

    constructor(tamanhoLado: number){
        this._tamanhoLado = tamanhoLado;
    }
    
    comparar(FiguraGeometrica: FiguraGeometrica1): number {
        if(FiguraGeometrica.calcularArea() < this.calcularArea()){
            return 1;
        }else if(FiguraGeometrica.calcularArea() == this.calcularArea()){
            return 0;
        }

        return -1;
    }

    get tamanhoLado(): number{
        return this._tamanhoLado;
    }

    calcularArea(): number {
        return this.tamanhoLado * this.tamanhoLado;
    }

    calcularPerimetro(): number {
        return this.tamanhoLado * 4;
    }
}

class Triangulo1 implements FiguraGeometrica1, IComparavel{
    private _tamanhoLado: number;

    constructor(tamanhoLado: number){
        this._tamanhoLado = tamanhoLado;
    }

    get tamanhoLado(): number{
        return this._tamanhoLado;
    }

    calcularArea(): number {
        return Math.sqrt(3) * this.tamanhoLado * this.tamanhoLado / 4;
    }

    calcularPerimetro(): number {
        return this.tamanhoLado * 3;
    }

    comparar(FiguraGeometrica: FiguraGeometrica1): number {
        if(FiguraGeometrica.calcularArea() < this.calcularArea()){
            return 1;
        }else if(FiguraGeometrica.calcularArea() == this.calcularArea()){
            return 0;
        }

        return -1;
    }
}

class Circulo1 implements FiguraGeometrica1, IComparavel{
    private _raio: number;

    constructor(raio: number){
        this._raio = raio;
    }

    get raio(): number{
        return this._raio;
    }

    calcularArea(): number {
        return 3.14 * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * 3.14 * this.raio;
    }

    comparar(FiguraGeometrica: FiguraGeometrica1): number {
        if(FiguraGeometrica.calcularArea() < this.calcularArea()){
            return 1;
        }else if(FiguraGeometrica.calcularArea() == this.calcularArea()){
            return 0;
        }

        return -1;
    }
}

class Retangulo1 implements FiguraGeometrica1, IComparavel{
    private _altura: number;
    private _largura: number;

    constructor(altura: number, largura: number){
        this._altura = altura;
        this._largura = largura;
    }

    get altura(): number{
        return this._altura;
    }

    get largura(): number{
        return this._largura;
    }

    calcularArea(): number {
        return this.altura * this.largura;
    }

    calcularPerimetro(): number {
        return 2 * this.largura + 2 * this.altura;
    }

    comparar(FiguraGeometrica: FiguraGeometrica1): number {
        if(FiguraGeometrica.calcularArea() < this.calcularArea()){
            return 1;
        }else if(FiguraGeometrica.calcularArea() == this.calcularArea()){
            return 0;
        }

        return -1;
    }
}

let quadrado: Quadrado1 = new Quadrado1(2);
let triangulo: Triangulo1 = new Triangulo1(2);
let circ: Circulo1 = new Circulo1(2);
let retang: Retangulo1 = new Retangulo1(2, 3);

console.log(quadrado.calcularArea());
console.log(quadrado.calcularPerimetro());
console.log(triangulo.calcularArea());
console.log(triangulo.calcularPerimetro());
console.log(circ.calcularArea());
console.log(circ.calcularPerimetro());
console.log(retang.calcularArea());
console.log(retang.calcularPerimetro());

//8 -
interface IComparavel{
    comparar(FiguraGeometrica: FiguraGeometrica1): number;
}

//9 - 

class TesteFormas {
    testarComparacao(forma1: IComparavel, forma2: FiguraGeometrica1): void {
        let resultado: number = forma1.comparar(forma2);
        console.log(`Resultado da comparação: ${resultado}`);
    }

    main(): void {
        let quadrado: Quadrado1 = new Quadrado1(2);
        let triangulo: Triangulo1 = new Triangulo1(2);
        let circ: Circulo1 = new Circulo1(2);
        let retang: Retangulo1 = new Retangulo1(2, 3);

        this.testarComparacao(quadrado, triangulo);
        this.testarComparacao(quadrado, circ);
        this.testarComparacao(quadrado, retang);
        this.testarComparacao(circ, triangulo);
        this.testarComparacao(circ, retang);
        this.testarComparacao(retang, triangulo);
    }
}

let teste: TesteFormas = new TesteFormas();
teste.main();

//10 -

class Conta3{
    private _nome: string;
    private _saldo: number;

    constructor(nome: string, saldo: number){
        this._nome = nome;
        this._saldo = saldo;
    }

    get nome(): string{
        return this._nome;
    }

    get saldo(): number{
        return this._saldo;
    }

    set nome(nome: string){
        this._nome = nome;
    }

    set saldo(saldo: number){
        this._saldo = saldo;
    }
}

class ContaCorrente extends Conta3 implements Tributavel{
    constructor(nome: string, saldo: number){
        super(nome, saldo);
    }

    calcularTributo(): number {
        return this.saldo * 0.1;
    }

}

class SeguroDeVida implements Tributavel{
    calcularTributo(): number {
        return 50;
    }
}

interface Tributavel{
    calcularTributo(): number;
}

//11 - 

class AuditoriaInterna{
    private _tributaveis: Tributavel[] = [];

    adicionar(tributavel: Tributavel){
        this._tributaveis.push(tributavel);
    }

    calcularTributos(): number{
        let somatorioTributos: number = 0;

        for(let i: number = 0; i < this._tributaveis.length; i++){
            somatorioTributos += this._tributaveis[i].calcularTributo();
        }     
        
        return somatorioTributos;
    }
}

class TesteTributaveis{
    testeAdicionar(auditoriaInterna: AuditoriaInterna, tributavel: Tributavel): void{
        auditoriaInterna.adicionar(tributavel);
        console.log(`Tributável: ${tributavel} adicionado com sucesso.`);
    }

    testeCalcularTributos(auditoriaInterna: AuditoriaInterna): void{
        let somatorioTributos: number = auditoriaInterna.calcularTributos();
        console.log(`O somatório dos tributos é ${somatorioTributos}`);
    }

    main(): void{
        let contaCorrente: ContaCorrente = new ContaCorrente("maxraiodeluz", 100);
        let seguroDeVida: SeguroDeVida = new SeguroDeVida();
        let auditoriaInterna: AuditoriaInterna = new AuditoriaInterna();

        this.testeAdicionar(auditoriaInterna, contaCorrente);
        this.testeAdicionar(auditoriaInterna, seguroDeVida);
        this.testeCalcularTributos(auditoriaInterna);
    }
}

let testeTributaveis: TesteTributaveis = new TesteTributaveis();
testeTributaveis.main();

//12 - 
