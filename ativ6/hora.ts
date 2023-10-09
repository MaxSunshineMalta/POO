class Hora{
    constructor(private _hora: number, private _minuto: number, private _segundo: number ){}

    public get hora(): number{
        return this._hora;
    }

    public get minuto(): number{
        return this._minuto;
    }


    public get segundo(): number{
        return this._segundo;
    }

    obterHoraConvencional(): string{
        return `${this.hora}:${this.minuto}:${this.segundo}`;
    }
}

let hora:Hora = new Hora(16, 59, 10);
console.log(hora.hora);
console.log(hora.minuto);
console.log(hora.segundo);
console.log(hora.obterHoraConvencional());
