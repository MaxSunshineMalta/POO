class Postagem{
    id: number;
    texto: string;
    qtdCurtidas: number;

    constructor(id: number, texto: string, qtdCurtidas: number){
        this.id = id;
        this.texto = texto;
        this.qtdCurtidas = qtdCurtidas;
    }

    curtir(): void{
        this.qtdCurtidas++;
    }

    toString(): string{
        return `${this.texto} - ${this.qtdCurtidas} Curtidas`
    }
}

class Microblog{
    postagens: Postagem[] = [];

    procurarPorId(id: number): Postagem{
        let postagemProcurada!: Postagem = null;

        for(let i: number = 0; i < this.postagens.length; i++){
            if(this.postagens[i].id == id){
                postagemProcurada = this.postagens[i];
                break;
            }
        }

        return postagemProcurada;
    }

    procurarPorIndice(id: number): number{
        let indiceProcurado: number = -1;

        for(let i:number = 0; i< this.postagens.length; i++){
            if(this.postagens[i].id == id){
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

    adicionar(postagem: Postagem): void{
        let indiceProcurado: number = this.procurarPorIndice(postagem.id);

        if(indiceProcurado == -1){
            this.postagens.push(postagem);
        }
    }

    excluir(id: number): void{
        let indiceProcurado: number = this.procurarPorIndice(id);

        if(indiceProcurado != -1){
            for(let i = indiceProcurado; i < this.postagens.length; i++){
                this.postagens[i] = this.postagens[i+1];
            }
            this.postagens.pop();
        }
    }

    obterPostagemMaisCurtida(): Postagem{
        let postagemMaisCurtida: Postagem = this.postagens[0];

        for(let i: number = 1; i < this.postagens.length; i++){
            postagemMaisCurtida = this.postagens[i].qtdCurtidas > postagemMaisCurtida.qtdCurtidas ? this.postagens[i] : postagemMaisCurtida;

        }

        return postagemMaisCurtida;
    }

    curtir(id: number){
        let postagemProcurada: Postagem = this.procurarPorId(id);

        if(postagemProcurada != null){
            postagemProcurada.curtir();
        }
    }

    toString(): string{
        let listaDePostagens: string = ""

        for(let i: number = 0; i < this.postagens.length; i++){
            listaDePostagens += this.postagens[i].toString() + ", ";
        }

        listaDePostagens = listaDePostagens.slice(0, -2);

        return listaDePostagens;
    }
}

let micro: Microblog = new Microblog();
micro.adicionar(new Postagem(1, "oi", 0));
micro.adicionar(new Postagem(2, "oioi", 8));
micro.adicionar(new Postagem(2, "oioioioi", 5));
micro.adicionar(new Postagem(3, "oioioi", 4));


micro.curtir(3);
console.log(micro.obterPostagemMaisCurtida());
micro.excluir(2);
console.log(micro.toString());


