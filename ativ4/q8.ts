class Equipamento{
    ligado: boolean;

    constructor(ligado: boolean){
        this.ligado = ligado;
    }

    liga(): boolean{
        if(this.ligado == false){
            return this.ligado = true;
        }else{
            return this.ligado = this.ligado;
        }
    }

    desliga(): boolean{
        if(this.ligado == true){
           return this.ligado = false;
        }else{
            return this.ligado = this.ligado;
        }
    }

    inverte(): boolean{
        if(this.ligado == true){
            return this.desliga();
        }else{
            return this.liga();
        }
    }

    estaLigado(): void{
        console.log(this.ligado);
    }
}


let equipamento1: Equipamento = new Equipamento(true);
equipamento1.estaLigado();
console.log(equipamento1.desliga());
equipamento1.estaLigado();
console.log(equipamento1.liga());
equipamento1.estaLigado();
console.log(equipamento1.inverte());