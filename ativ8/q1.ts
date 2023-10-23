class Empregado {
    salario: number = 500;

    calcularSalario(): number { 
        return this.salario;
    }
}
    
class Diarista extends Empregado {
    calcularSalario(): number {
        return super.calcularSalario() / 30;
    }
}
    
class Horista extends Diarista {
    calcularSalario(): number {
        return super.calcularSalario() / 24;
    }
}

let a: Horista = new Horista();
console.log(a.calcularSalario());