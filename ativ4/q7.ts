class Tringulo{
    l1: number;
    l2: number;
    l3: number;

    constructor(l1: number, l2: number, l3: number){
        this.l1 = l1;
        this.l2 = l2;
        this.l3 = l3;
    }

    formaTriangulo(): boolean{
        if(Math.abs(this.l2 - this.l3) < this.l1 && this.l1 < (this.l2 + this.l3)){
            return true;
        }else{
            return false;
        }
    }


    ehIsosceles(): boolean{
        if(this.formaTriangulo() == true){
            if((this.l1 == this.l2 && this.l1 != this.l3) || (this.l1 == this.l3 && this.l1 != this.l2) || (this.l2 == this.l3 && this.l2 != this.l1)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }


    ehEquilatero(): boolean{
        if(this.formaTriangulo() == true){
            if(this.l1 == this.l2 && this.l1 == this.l3){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }


    ehEscaleno(): boolean{
        if(this.formaTriangulo() == true){
            if(this.l1 != this.l2 && this.l1 != this.l3 && this.l2 != this.l3){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}


let triangulo1: Tringulo = new Tringulo(2, 2, 2);
let triangulo2: Tringulo = new Tringulo(3, 4, 5);
let triangulo3: Tringulo = new Tringulo(1, 2, 2);
let triangulo4: Tringulo = new Tringulo(2, 2, 1);
let triangulo5: Tringulo = new Tringulo(2, 1, 2);
let triangulo6: Tringulo = new Tringulo(5, 10, 25);

console.log(triangulo1.ehEquilatero());
console.log(triangulo2.ehEscaleno());
console.log(triangulo3.ehIsosceles());
console.log(triangulo4.ehIsosceles());
console.log(triangulo5.ehIsosceles());
console.log(triangulo6.ehEscaleno());



