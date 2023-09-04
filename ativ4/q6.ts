class Saudacao{
    texto: string;
    destinatario: string;

    constructor(texto: string, destinatario: string){
        this.texto = texto;
        this.destinatario = destinatario;
    }

    obterSaudacao(): void{
        this.texto = this.texto + this.destinatario;
        console.log(this.texto)
    }
}


let saudacao1: Saudacao = new Saudacao("Bom dia, ", "Max");
saudacao1.obterSaudacao();



