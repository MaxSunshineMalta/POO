class Jogador{
    id: number;
    forca: number;
    nivel: number;
    pt_atuais: number;
    ataque: number;
    [key: string]: any

    constructor(id: number, forca: number, nivel: number, pt_atuais: number){
        this.id = id;
        this.forca = forca;
        this.nivel = nivel;
        this.pt_atuais = pt_atuais;
        this.ataque = this.forca * this.nivel;
    }

    calcularAtaque(): number{
        return this.forca * this.nivel;
    }

    atacar(jogador2: Jogador): void{
        if(this.estaVivo() && jogador2.estaVivo() == true){
            const dano: number = this.calcularAtaque();
            jogador2.pt_atuais -= dano;

            const descricao: any = `>> Jogador ${this.id} atacou o Jogador ${jogador2.id}\nDano causado: ${dano}\nSituação atual do Jogador atacado:\n`

            if(jogador2.pt_atuais > 0){
                console.log(descricao);

                for (let prop in jogador2) {
                    console.log(`${prop}: ${jogador2[prop]}`);
                }
                
                console.log();
            }else{
                jogador2.pt_atuais = 0;
                console.log(descricao);

                for (let prop in jogador2) {
                    console.log(`${prop}: ${jogador2[prop]}`);
                }

                console.log(`\nO Jogador ${jogador2.id} está morto! :(\n`);
                console.log(`================ BATALHA FINALIZADA ====================`);
            }
        }
    }

    estaVivo(): boolean{
        if(this.pt_atuais > 0){
            return true;
        }

        return false;
    }

    toString(): string {
        return `>> Status do Jogador ${this.id} :\nId: ${this.id}, Força: ${this.forca}, Nível: ${this.nivel}, Pontos Atuais: ${this.pt_atuais}, Ataque: ${this.ataque}\n`;
    }
}


let j1: Jogador = new Jogador(1, 4, 1, 10);
let j2: Jogador = new Jogador(2, 2, 2, 7);

console.log(j1.toString());
console.log(`${j2.toString()}\n`);
console.log(`================= BATALHA INICIADA =====================\n`);



j1.atacar(j2);
j2.atacar(j1);
j1.atacar(j2);
j2.atacar(j1);
j1.atacar(j2);
j2.atacar(j1);

