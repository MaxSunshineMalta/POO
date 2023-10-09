class Calculadora{
    private _operando1: number;
    private _operando2: number;
    
    constructor(_operando1: number, _operando2: number){
        this._operando1 = _operando1;
        this._operando2 = _operando2;
    }

     public soma(): number{
        return this._operando1 + this._operando2;
    }

    public subtracao(): number{
        return this._operando1 - this._operando2;
    }
}

let calculadora: Calculadora = new Calculadora(5,3);

console.log(calculadora.soma());
console.log(calculadora.subtracao());
