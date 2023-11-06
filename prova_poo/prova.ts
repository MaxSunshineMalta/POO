import prompt from "prompt-sync"
import* as fs from 'fs';

let input = prompt();

class Perfil{
    private _id: number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem1[] = [];

    constructor(id: number, nome: string, email: string){
        this._id = id;
        this._nome = nome;
        this._email = email;
    }

    get id(): number{
        return this._id;
    }

    get nome(): string{
        return this._nome;
    }

    get email(): string{
        return this._email;
    }

    get postagens(): Postagem1[]{
        return this._postagens;
    }

    set nome(nome: string){
        this._nome = nome;
    }

    set email(email: string){
        this._email = email;
    }

}

class Postagem1{
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number
    private _data: Date;
    private _perfil: Perfil;

    constructor(id: number, texto: string, curtidas: number, descurtidas: number, data: string, perfil: Perfil){
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._data = new Date(data); // `2023-11-02`
        this._perfil = perfil;
    }

    get id(): number{
        return this._id;
    }

    get texto(): string{
        return this._texto;
    }

    get curtidas(): number{
        return this._curtidas;
    }

    get descurtidas(): number{
        return this._descurtidas
    }

    get data(): Date{
        return this._data;
    }

    get perfil(): Perfil{
        return this._perfil;
    }

    set curtidas(valor: number){
        this._curtidas = valor;
    }

    set descurtidas(valor: number){
        this._descurtidas = valor;
    }

    set texto(texto: string){
        this._texto = texto;
    }

    set data(data: Date){
        this._data = data;
    }

    curtir(): void{
        this._curtidas++;
    }

    descurtir(): void{
        this._descurtidas++;
    }

    eh_Popular(): boolean{
        return this._curtidas > this._descurtidas + (0.5 * this._descurtidas);
    }

    remover_curtida(): void{
        if(this._curtidas > 0){
            this._curtidas--;
        }
    }

    remover_descurtida(): void{
        if(this._descurtidas > 0){
            this._descurtidas--;
        }
    }
}

class Postagem_avancada extends Postagem1{
    private _hashtags: string[] = [];
    private _visualizacoes_Restantes: number = 15;
    
    adicionar_Hashtag(hashtag: string): void{
        this._hashtags.push(hashtag);
    }

    existe_Hashtag(hashtag: string): boolean{
        for(let hashtag_atual of this._hashtags){
            if(hashtag_atual = hashtag){
                return true;
            }
        }
        return false;
    }

    decrementar_visualizacoes(): void{
        this._visualizacoes_Restantes--;
    }

    get hashtags(): string[] {
        return this._hashtags;
    }

    get visualizacoes_restantes(): number{
        return this._visualizacoes_Restantes;
    }

    set visualizacoes_restantes(valor: number){
        this._visualizacoes_Restantes = valor;
    } 

    set hashtags(hashtags: string[]){
        this._hashtags = hashtags;
    }
}

class Repositorio_perfis{
    private _perfis: Perfil[] = [];

    get perfis(): Perfil[]{
        return this._perfis;
    }

    set perfis(array: Perfil[]){
        this._perfis = array;
    }

    incluir(perfil: Perfil): void{
        let pertence: boolean = false;
        for(let perfil_atual of this._perfis){
            if(perfil_atual.id == perfil.id){
                pertence = true;
                break
            }
        }

        if(!pertence){
            this._perfis.push(perfil);
            console.log("Perfil adicionado com sucesso!");
        }else{
            console.log("Já existe um perfil com o ID que você inseriu, tente outro ID!");
        }
    }

    consultarPerfil(id: number | null, nome: string | null, email: string | null): Perfil | null {
        for (let perfil of this._perfis) {
          if (
            (id == null || perfil.id == id) && (nome == null || perfil.nome == nome) && (email == null || perfil.email == email)) {
            if(id == null && nome == null && email == null){
                return null;
            }else{
                return perfil;
            }  
          }
        }
        return null;
    }
}
    
class Repositorio_postagens{
    private _postagens: Postagem1[] = [];

    get postagens(): Postagem1[] {
        return this._postagens;
    }

    incluir(postagem: Postagem1, perfil: Perfil): void{
        let pertence: boolean = false;
        for(let postagem_atual of this._postagens){
            if(postagem_atual.id == postagem.id){
                pertence = true;
                break
            }
        }

        if(!pertence){
            perfil.postagens.push(postagem);
            this._postagens.push(postagem);
        }
    }

    procurar_por_hashtag(postagem: Postagem_avancada, hashtag: string): boolean{
        for(let hashtag_atual of postagem.hashtags){
            if(hashtag_atual == hashtag){
                return true;
            }
        }

        return false;
    }

    consultarPostagens(id: number | null, texto: string | null, hashtag: string | null, perfil: Perfil | null): Postagem1[]{
        let postagens_encontradas: Postagem1[] = [];
    

        for(let postagem of this._postagens){
            if (
                (id == null || postagem.id == id) &&
                (texto == null || postagem.texto.includes(texto)) &&
                (hashtag == null || (postagem instanceof Postagem_avancada && this.procurar_por_hashtag(postagem, hashtag))) &&
                (perfil == null || postagem.perfil == perfil) 
              ) {
                if(id == null && texto == null && hashtag == null && perfil == null){
                    return postagens_encontradas;
                }else{
                    postagens_encontradas.push(postagem); 
                }
              }
        }

        return postagens_encontradas;
    }    

    remover_postagem(postagem: Postagem1): void{
        let contador: number = 0;
        for(let postagem_atual of this._postagens){
            if(postagem_atual.id == postagem.id && postagem_atual.texto == postagem.texto && postagem_atual.data == postagem.data && postagem_atual.curtidas == postagem.curtidas && postagem_atual.descurtidas == postagem.descurtidas && postagem_atual.perfil == postagem.perfil){
                this._postagens.splice(contador, 1);
                break;
            }
            contador++;
        }
    }
}

class Rede_social{
    private _repositorio_perfis: Repositorio_perfis;
    private _repositorio_postagens: Repositorio_postagens;

    constructor(repositorio_perfis: Repositorio_perfis, repositorio_postagens: Repositorio_postagens){
        this._repositorio_perfis = repositorio_perfis;
        this._repositorio_postagens = repositorio_postagens;
    }

    get repositorio_perfis(): Repositorio_perfis{
        return this._repositorio_perfis;
    }

    get repositorio_postagens(): Repositorio_postagens{
        return this._repositorio_postagens;
    }

    incluirPerfil(perfil: Perfil): void{
        if(perfil.id != null && perfil.nome !== null && perfil.email !== null){
            let perfilExistente: Perfil | null  = this._repositorio_perfis.consultarPerfil(perfil.id, perfil.nome, perfil.email);

            if(!perfilExistente){
                this._repositorio_perfis.incluir(perfil);
            }
        }
    }

    consultarPerfil(id: number | null, nome: string | null, email: string | null): Perfil | null {
        return this._repositorio_perfis.consultarPerfil(id, nome, email);
    }

    incluirPostagem(postagem: Postagem1): void{
        let perfil: Perfil = new Perfil(1, "1", "1");
        let postagemExistente: Postagem1 = new Postagem1(1, "1", 1, 1, "1111-11-11", perfil);

        if(postagem instanceof Postagem_avancada && (postagem.curtidas != null && postagem.data != null && postagem.descurtidas != null && postagem.id != null && postagem.texto != null && postagem.perfil != null && postagem.visualizacoes_restantes != null && postagem.hashtags != null)){
            postagemExistente = this._repositorio_postagens.consultarPostagens(postagem.id, null, null, null)[0] as Postagem_avancada;
       
        }else if(postagem.curtidas != null && postagem.data != null && postagem.descurtidas != null && postagem.id != null && postagem.texto != null && postagem.perfil != null){
            postagemExistente = this._repositorio_postagens.consultarPostagens(postagem.id, null, null, null)[0];
        }

        if(!postagemExistente){
            this._repositorio_postagens.incluir(postagem, postagem.perfil);
            console.log("Postagem adicionada com sucesso!");
        }else{
            console.log("Já existe uma postagem com o ID que você inseriu, tente outro ID!");
        }
    }

    consultarPostagens(id: number | null, texto: string | null, hashtag: string | null, perfil: Perfil | null): Postagem1[]{
        return this._repositorio_postagens.consultarPostagens(id, texto, hashtag, perfil);
    }

    curtir(id_postagem: number): void{
        let postagem_a_ser_curtida: Postagem1 = this.consultarPostagens(id_postagem, null, null, null)[0];

        if(postagem_a_ser_curtida != null){
            postagem_a_ser_curtida.curtir();
        }
    }

    descurtir(id_postagem: number): void{
        let postagem_a_ser_descurtida: Postagem1 = this.consultarPostagens(id_postagem, null, null, null)[0];

        if(postagem_a_ser_descurtida != null){
            postagem_a_ser_descurtida.descurtir();
        }
    }

    decrementar_visualizacoes(postagem: Postagem_avancada): void{
        if(postagem.visualizacoes_restantes > 0){
            postagem.decrementar_visualizacoes();
        }
    }

    exibir_postagens_por_perfil(id: number): Postagem1[]{
        let perfil: Perfil | null = this._repositorio_perfis.consultarPerfil(id, null, null);
        let postagens_visualizaveis: Postagem1[] = [];

        if(perfil != null){
            let postagens_perfil: Postagem1[] = perfil.postagens;

            for(let postagemAtual of postagens_perfil){
                if(postagemAtual instanceof Postagem1){
                    if(postagemAtual instanceof Postagem_avancada && postagemAtual.visualizacoes_restantes > 0){
                        postagens_visualizaveis.push(postagemAtual);
                        continue;
                    }else if(postagemAtual instanceof Postagem_avancada){
                        continue;
                    }
                    postagens_visualizaveis.push(postagemAtual);
                }
            }

            for(let postagemAtual of postagens_visualizaveis){
                if(postagemAtual instanceof Postagem_avancada){
                    this.decrementar_visualizacoes(postagemAtual);
                }
            }
        }

        return postagens_visualizaveis;
    }

    exibir_postagens_por_hashtag(hashtag: string): Postagem_avancada[]{
        let postagens: Postagem_avancada[] = this.consultarPostagens(null, null, hashtag, null) as Postagem_avancada[];
        let postagens_visualizaveis: Postagem_avancada[] = [];

        postagens_visualizaveis = postagens.filter(postagem => postagem.visualizacoes_restantes >0);
        
        for(let postagemAtual of postagens_visualizaveis){
            this.decrementar_visualizacoes(postagemAtual);
        }

        return postagens_visualizaveis;
    }

    limparPerfis(): void{
        this._repositorio_perfis.perfis = []; 
    }

    remover_curtida(id_postagem: number){
        let postagem_procurada: Postagem1 = this.consultarPostagens(id_postagem, null, null, null)[0];

        if(postagem_procurada != null){
            postagem_procurada.remover_curtida();
        }
    }

    remover_descurtida(id_postagem: number){
        let postagem_procurada: Postagem1 = this.consultarPostagens(id_postagem, null, null, null)[0];

        if(postagem_procurada != null){
            postagem_procurada.remover_descurtida();
        }
    }

    atualizar_perfil(perfil: Perfil): void{
        for(let perfil_atual of this._repositorio_perfis.perfis){
            if(perfil_atual.id == perfil.id){
                perfil_atual.nome = perfil.nome;
                perfil_atual.email = perfil.email;
                break;
            }
        }
    }

    atualizar_postagem(postagem: Postagem1): void{
        for(let postagem_atual of this._repositorio_postagens.postagens){
            if(postagem_atual.id == postagem.id && postagem instanceof Postagem_avancada && postagem_atual instanceof Postagem_avancada){
                postagem_atual.texto = postagem.texto;
                postagem_atual.data = postagem.data;
                postagem_atual.hashtags = postagem.hashtags;
                break;
            }else if(postagem_atual.id == postagem.id && postagem instanceof Postagem1 && postagem_atual instanceof Postagem1){
                postagem_atual.texto = postagem.texto;
                postagem_atual.data = postagem.data;
                break;
            }
        }
    }

    exibir_postagens_populares(): Postagem1[] {
        let postagens_populares_e_visualizaveis: Postagem1[] = [];

        for(let postagemAtual of this._repositorio_postagens.postagens){
            if(postagemAtual instanceof Postagem1 && postagemAtual.eh_Popular()){
                if(postagemAtual instanceof Postagem_avancada && postagemAtual.visualizacoes_restantes > 0){
                    postagens_populares_e_visualizaveis.push(postagemAtual);
                    continue;
                }else if(postagemAtual instanceof Postagem_avancada){
                    continue;
                }
                postagens_populares_e_visualizaveis.push(postagemAtual);
            }
        }

        for(let postagemAtual of postagens_populares_e_visualizaveis){
            if(postagemAtual instanceof Postagem_avancada){
                this.decrementar_visualizacoes(postagemAtual);
            }
        }    

        return postagens_populares_e_visualizaveis;
    }

    remover_perfil(perfil: Perfil): void{
        if(this._repositorio_perfis.perfis != null){
            let contador: number = 0;
        for(let perfil_atual of this._repositorio_perfis.perfis){
            if(perfil_atual.id == perfil.id && perfil_atual.nome == perfil.nome && perfil_atual.email == perfil.email){

                for(let postagens_a_remover of perfil_atual.postagens){
                    this._repositorio_postagens.remover_postagem(postagens_a_remover);
                }
                this._repositorio_perfis.perfis.splice(contador, 1);
                break;
            }
            contador++;
        }
        }
    }

    remover_postagem(postagem: Postagem1): void{
        if(this._repositorio_postagens.postagens != null){
            let perfil: Perfil = postagem.perfil;
            let contador: number = 0;

            for(let postagem_atual of perfil.postagens){
                if(postagem_atual.id == postagem.id && postagem_atual.texto == postagem.texto && postagem_atual.data == postagem.data && postagem_atual.curtidas == postagem.curtidas && postagem_atual.descurtidas == postagem.descurtidas){
                    perfil.postagens.splice(contador,1);
                }
                contador++;
            }
            this._repositorio_postagens.remover_postagem(postagem);
        }
    }

    obter_hashtags_mais_populares(hashtags: string[], qtd_desejada: number): { valor: string, contagem: number }[] {
        let contagem:{[key: string]: number } = {}; 
        const hashtag_mais_popular: { valor: string, contagem: number }[] = []; 
      
        for (let hashtag of hashtags) {
          if (contagem[hashtag]) {
            contagem[hashtag]++;
          } else {
            contagem[hashtag] = 1;
          }
        }
      
        const valores_ordenados = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]);
      
        for (let i = 0; i < qtd_desejada; i++) {
          const valor = valores_ordenados[i];
          const contagemMaxima = contagem[valor];
          hashtag_mais_popular.push({ valor, contagem: contagemMaxima });
        }
      
        return hashtag_mais_popular;
    }

    exibir_hashtags_populares(qtd_desejada: number): { valor: string, contagem: number }[]{
        let postagens_avancadas: Postagem1[] = this._repositorio_postagens.postagens.filter(postagem => postagem instanceof Postagem_avancada);

        let todas_hashtags: string[] = [];

        for(let postagem of postagens_avancadas){
            if(postagem instanceof Postagem_avancada){
                for(let hashtag of postagem.hashtags){
                    todas_hashtags.push(hashtag);
                }
            }
        }

        const hashtags_populares: { valor: string, contagem: number }[] = this.obter_hashtags_mais_populares(todas_hashtags, qtd_desejada);

        return hashtags_populares;
    }
    
}

let repositorio_perfis1: Repositorio_perfis = new Repositorio_perfis();
let repositorio_postagens1: Repositorio_postagens = new Repositorio_postagens();

class App{
    private _rede_social: Rede_social = new Rede_social(repositorio_perfis1, repositorio_postagens1);

    menu(): void{
        this.baixar_arquivo();
        console.clear();

        let opcao: string = '';
        
        do {
            console.log('\nBem vindo\nDigite uma opção:');
            console.log('1 - Incluir Perfil\n2 - Consultar Perfil\n3 - Incluir Postagem\n' +
            '4 - Consultar Postagens\n5 - Curtir Postagem\n6 - Descurtir Postagem\n' +
            '7 – Exibir uma Postagem\n' + '8 - Exibir Postagens por Perfil\n' + 
            '9 - Exibir Postagens por Hashtag\n' + '10 - Remover curtida\n' + '11 - Remover Descurtida\n' + '12 - Atualizar Perfil\n' + 
            '13 - Atualizar Postagem\n' + '14 - Exibir Postagens Populares\n' + '15 - Remover Perfil\n' + '16 - Remover Postagem\n' +
            '17 - Exibir Hashtags Mais Populares\n' + '0 - Sair\n');
                opcao = input("Opção:");
            
                switch (opcao) {
                    case "1":
                        this.incluir_perfil();
                        break
                    case "2":
                        this.consultar_perfil();
                        break
                    case "3":
                        this.incluir_postagem();
                        break
                    case "4":
                        this.consultar_postagens();
                        break
                    case "5":
                        this.curtir();
                        break
                    case "6":
                        this.descurtir();
                        break
                    case "7":
                        this.visualizar_postagem();
                        break
                    case "8":
                        this.exibir_postagens_por_perfil();
                        break
                    case "9":
                        this.exibir_postagens_por_hashtag();
                        break
                    case "10":
                        this.remover_curtida();
                        break
                    case "11":
                        this.remover_descurtida();
                        break
                    case "12":
                        this.atualizar_perfil();
                        break
                    case "13":
                        this.atualizar_postagem();
                        break
                    case "14":
                        this.exibir_postagens_populares();
                        break
                    case "15":
                        this.remover_perfil();
                        break
                    case "16":
                        this.remover_postagem();
                        break
                    case "17":
                        this.exibir_hashtags_populares();
                        break
            }
            
            input("Operação finalizada. Digite <enter>");
            console.clear();
            
            } while (opcao != "0");
            this.salvar_arquivo();
            
            console.log("Aplicação encerrada");
    }

    incluir_perfil(): void{
        let id: number = Number(input('Digite o ID do seu perfil:'));
        let nome: string = input('Digite o nome do seu perfil:');
        let email: string = input('Digite o email do seu perfil:');

        let perfil: Perfil = new Perfil(id, nome, email);
        this._rede_social.incluirPerfil(perfil);
    }

    consultar_perfil(): void{
        let id: any = input('Digite o ID do seu perfil ou apenas pressiona ENTER:');
        let nome: string | null = input('Digite o nome do seu perfil ou apenas pressiona ENTER:');
        let email: string | null = input('Digite o email do seu perfil ou apenas pressiona ENTER:');

        id = id === '' ? null : Number(id);
        nome = nome === '' ? null : nome;
        email = email === '' ? null : email;

        let perfil_procurado: Perfil | null = this._rede_social.consultarPerfil(id, nome, email);

        console.log(perfil_procurado);
    }

    incluir_postagem(): void{
        if(repositorio_perfis1.perfis != null){
            let id: number = Number(input('Digite o ID da sua postagem:'));
            let texto: string = input("Digite o texto da postagem:");
            let curtidas: number = 0;
            let descurtidas: number = 0;
            let data: string = input("Digite a data da postagem:");
                
            let id_perfil: number = Number(input("Digite o id do seu perfil:"));
            let perfil: Perfil | null = this._rede_social.consultarPerfil(id_perfil, null, null);

            console.log("Digite 1 para postagem normal e 2 para postagem avançada!!");
            let opcao: number = Number(input("Digite o tipo da postagem:"));

            while(opcao != 1 && opcao != 2){
                console.log("Opção inválida!! Digite 1 para postagem normal e 2 para postagem avançada!!")
                opcao = Number(input("Digite o tipo da postagem:"));
            }
            
            if(opcao == 1){
                if(perfil != null){
                    let postagem: Postagem1 = new Postagem1(id, texto, curtidas, descurtidas, data, perfil);
                    this._rede_social.incluirPostagem(postagem);
                }
            }else if(opcao == 2){
                if(perfil != null){
                    let qtd_hashtag: number = Number(input("Digite a quantidade de hashtagas que deseja inserir:"));
                    let postagem: Postagem_avancada = new Postagem_avancada(id, texto, curtidas, descurtidas, data, perfil)

                    for(let i: number = 0; i < qtd_hashtag; i++){
                        let hashtag: string = input("Digite a hashtag:");
                        postagem.adicionar_Hashtag(hashtag);
                    }

                    this._rede_social.incluirPostagem(postagem);
                }
            }
        }else{
            console.log("Não existem perfis cadastrados para incluir sua postagem!!");
        }
    }

    consultar_postagens(): void{
        let id: any = input('Digite o ID da sua postagem ou apenas pressiona ENTER:');
        let texto: string | null = input('Digite o texto da seu postagem ou apenas pressiona ENTER:');
        let hashtag: string | null = input('Digite uma hashtag da seu postegam ou apenas pressiona ENTER:');
        let id_perfil: any = input("Digite o id do seu perfil ou apenas pressiona ENTER:");

        id = id == '' ? null : Number(id);
        texto = texto == '' ? null : texto;
        hashtag = hashtag == '' ? null : hashtag;
        id_perfil = id_perfil == '' ? null : Number(id_perfil);

        let perfil: Perfil | null = this._rede_social.consultarPerfil(id_perfil, null, null);

        let postagens_procuradas: Postagem1[] = this._rede_social.consultarPostagens(id, texto, hashtag, perfil);

        for(let postagemAtual of postagens_procuradas){
            console.log(postagemAtual);
        }
    }

    curtir(): void{
        let id: number = Number(input('Digite o ID da sua postagem:'));
        this._rede_social.curtir(id);
    }

    descurtir(): void{
        let id: number = Number(input('Digite o ID da sua postagem:'));
        this._rede_social.descurtir(id);
    }

    visualizar_postagem(): void{
        let id: number = Number(input('Digite o ID da sua postagem:'));

        let postagem: Postagem1 = this._rede_social.consultarPostagens(id, null, null, null)[0];

        if(postagem != null && postagem instanceof Postagem1){
            if(postagem instanceof Postagem_avancada && postagem.visualizacoes_restantes > 0){
                this._rede_social.decrementar_visualizacoes(postagem);
                console.log(postagem);
                return ;
            }else if(postagem instanceof Postagem_avancada) {
                console.log("Essa postagem atingiu o máximo de vizualizações possíveis!");
                return;
            }
            console.log(postagem);
        }
    }

    exibir_postagens_por_perfil(): void{
        let id: number = Number(input("Digite o id do seu perfil:"));
        let postagens_exibidas: Postagem1[] = this._rede_social.exibir_postagens_por_perfil(id);   

        for(let postagemAtual of postagens_exibidas){
            console.log(postagemAtual);
        }
    }

    exibir_postagens_por_hashtag(): void{
        let hashtag: string = input("Digite a hashtag das postagens:");
        let postagens_exibidas: Postagem_avancada[] = this._rede_social.exibir_postagens_por_hashtag(hashtag);   

        for(let postagemAtual of postagens_exibidas){
            console.log(postagemAtual);
        }
    }       
    
    baixar_arquivo(): void {
        let arquivo_perfis: string = fs.readFileSync("C:/Users/Kadu/POO/prova_poo/perfis.txt", "utf-8");
        let arquivo_postagens: string = fs.readFileSync("C:/Users/Kadu/POO/prova_poo/postagens.txt", "utf-8");
    
        let linhas_postagens: string[] = arquivo_postagens.split("\n");
        let linhas_perfis: string[] = arquivo_perfis.split("\n");
    
        // Limpa todos os perfis antes de recarregar
        this._rede_social.limparPerfis();

        for (let linha of linhas_perfis) {
            let elementos: string[] = linha.split(";");
    
            if (elementos.length < 3) {
                continue; // Ignora linhas inválidas
            }
    
            let perfil: Perfil = new Perfil(Number(elementos[0]), elementos[1], elementos[2]);
    
            this._rede_social.incluirPerfil(perfil);
        }
    
        for (let linha of linhas_postagens) {
            let elementos: string[] = linha.split(";");
    
            if (elementos.length < 6) {
                continue; // Ignora linhas inválidas
            }
    
            if (elementos[2] == "pn") {
                let perfil: Perfil | null = this._rede_social.consultarPerfil(Number(elementos[6]), null, null);
                let postagem: Postagem1 = new Postagem1(Number(elementos[0]), elementos[1], Number(elementos[3]), Number(elementos[4]), elementos[5], perfil as Perfil);
                this._rede_social.incluirPostagem(postagem);
            } else if (elementos[2] == "pa") {
                let perfil: Perfil | null = this._rede_social.consultarPerfil(Number(elementos[6]), null, null);
                let postagem: Postagem_avancada = new Postagem_avancada(Number(elementos[0]), elementos[1], Number(elementos[3]), Number(elementos[4]), elementos[5], perfil as Perfil);
    
                if (elementos.length > 7) {
                    postagem.visualizacoes_restantes = Number(elementos[7]);
    
                    for (let i: number = 8; i < elementos.length; i++) {
                        postagem.adicionar_Hashtag(elementos[i]);
                    }
                }
    
                this._rede_social.incluirPostagem(postagem);
            }
        }
    }
    
    salvar_arquivo(): void {
        let arquivo_postagens: string = "";
        let data_string: string;
    
        for (let postagem of this._rede_social.repositorio_postagens.postagens) {
            let linha: string = "";
            if (postagem instanceof Postagem_avancada) {
                data_string = postagem.data.toISOString().slice(0, 10);
    
                linha = `${postagem.id};${postagem.texto};pa;${postagem.curtidas};${postagem.descurtidas};${data_string};${postagem.perfil.id};${postagem.visualizacoes_restantes}`;
    
                for (let hashtag of postagem.hashtags) {
                    linha = linha + `;${hashtag}`;
                }
    
                linha += '\n';
            } else {
                data_string = postagem.data.toISOString().slice(0, 10);
    
                linha = `${postagem.id};${postagem.texto};pn;${postagem.curtidas};${postagem.descurtidas};${data_string};${postagem.perfil.id}\n`;
            }
    
            arquivo_postagens += linha;
        }
        arquivo_postagens = arquivo_postagens.slice(0, arquivo_postagens.length - 1);
        fs.writeFileSync("C:/Users/Kadu/POO/prova_poo/postagens.txt", arquivo_postagens, "utf-8");
    
        let arquivo_perfis: string = "";
        for (let perfil of this._rede_social.repositorio_perfis.perfis) {
            let linha: string = `${perfil.id};${perfil.nome};${perfil.email}\n`;
        
            arquivo_perfis += linha;
        }
        arquivo_perfis = arquivo_perfis.slice(0, arquivo_perfis.length - 1);
        fs.writeFileSync("C:/Users/Kadu/POO/prova_poo/perfis.txt", arquivo_perfis, "utf-8");
    }

    remover_curtida(): void {
        let id: number = Number(input('Digite o ID da postagem que deseja remover uma curtida:'));
        this._rede_social.remover_curtida(id);
    }

    remover_descurtida(): void{
        let id: number = Number(input('Digite o ID da postagem que deseja remover uma descurtida:'));
        this._rede_social.remover_descurtida(id);
    }

    atualizar_perfil(): void{
        if(repositorio_perfis1.perfis != null){ 
            let id: number = Number(input('Digite o ID do seu perfil:'));
            let nome: string = input('Atualize o nome do seu perfil:');
            let email: string = input('Atualize o email do seu perfil:');

            let perfil: Perfil = new Perfil(id, nome, email);

            this._rede_social.atualizar_perfil(perfil);
        }else{
            console.log("Não existem perfis para serem atualizados!");
        }
       
    }

    atualizar_postagem(): void{
        if(repositorio_perfis1.perfis != null && repositorio_postagens1.postagens != null){
            let id: number = Number(input('Digite o ID da sua postagem:'));
            let texto: string = input("Atualize o texto da postagem:");
            let curtidas: number = 0;
            let descurtidas: number = 0;
            let data: string = input("Atualize a data da postagem:");
                
            let id_perfil: number = Number(input("Digite o id do seu perfil:"));
            let perfil: Perfil | null = this._rede_social.consultarPerfil(id_perfil, null, null);
            let opcao: number;

            let postagem_a_ser_atualizada: Postagem1 = this._rede_social.consultarPostagens(id, null, null, null)[0];

            if(postagem_a_ser_atualizada instanceof Postagem_avancada){
                opcao = 2;
            }else{
                opcao = 1;
            }
            
            if(opcao == 1){
                if(perfil != null){
                    let postagem: Postagem1 = new Postagem1(id, texto, curtidas, descurtidas, data, perfil);
                    this._rede_social.atualizar_postagem(postagem);
                }
            }else if(opcao == 2){
                if(perfil != null){
                    let qtd_hashtag: number = Number(input("Atualize a quantidade de hashtagas que deseja inserir:"));
                    let postagem: Postagem_avancada = new Postagem_avancada(id, texto, curtidas, descurtidas, data, perfil)

                    for(let i: number = 0; i < qtd_hashtag; i++){
                        let hashtag: string = input("Digite as novas hashtags:");
                        postagem.adicionar_Hashtag(hashtag);
                    }

                    this._rede_social.atualizar_postagem(postagem);
                }
            }
        }else{
            console.log("Não existem perfis cadastrados para atualizar sua postagem!!");
        }
    }

    exibir_postagens_populares(): void{
        let postagens_populares_e_visualizaveis: Postagem1[] = this._rede_social.exibir_postagens_populares();

        for(let postagem of postagens_populares_e_visualizaveis){
            console.log(postagem);
        }
    }

    remover_perfil(): void{
        let id: number = Number(input('Digite o ID do seu perfil:'));

        let perfil: Perfil | null = this._rede_social.consultarPerfil(id, null, null);

        if(perfil != null){
            this._rede_social.remover_perfil(perfil);
            console.log("Perfil removido com sucesso!")
        }else{
            console.log("Você não preencheu nenhuma informação de perfil ou preencheu apenas informações de perfis que não estão registrados, tornando imposível remover!")
        }
    }

    remover_postagem(): void{
        let id: number = Number(input('Digite o ID da sua postagem:'));
        
        let postagem: Postagem1 = this._rede_social.consultarPostagens(id, null, null, null)[0];

        if(postagem != null){
            this._rede_social.remover_postagem(postagem);
            console.log("Postagem removida com sucesso!")
        }else{
            console.log("Você não preencheu nenhuma informação de postagem ou preencheu apenas informações de postagens que não estão registradas, tornando imposível remover!")
        }
    }

    exibir_hashtags_populares(): void{
        let qtd_desejada: number = Number(input("Digite a quantidade de hashtags populares que deseja obter:"));
        let contador: number = 1;
        let hashtags_distintas = new Set<string>();
        let qtd_hashtag_distintas: number;

        let postagens_avancadas: Postagem1[] = repositorio_postagens1.postagens.filter(postagem => postagem instanceof Postagem_avancada);

        let todas_hashtags: string[] = [];

        for(let postagem of postagens_avancadas){
            if(postagem instanceof Postagem_avancada){
                for(let hashtag of postagem.hashtags){
                    todas_hashtags.push(hashtag);
                }
            }
        }

        for(let hashtag_distinta of todas_hashtags){
            hashtags_distintas.add(hashtag_distinta);
        }

        qtd_hashtag_distintas = hashtags_distintas.size;

        while(qtd_desejada > qtd_hashtag_distintas || qtd_desejada < 1){
            console.log("Você digitou uma quantidade inválida, digite uma nova quantidade!!");
            qtd_desejada = Number(input("Digite a quantidade de hashtags populares que deseja obter:"));
        }

        let hashtags_populares: { valor: string, contagem: number }[] = this._rede_social.exibir_hashtags_populares(qtd_desejada);

        console.log(`As ${qtd_desejada} hashtags mais populares são:`);

        for(let hashtag of hashtags_populares){
            console.log(`${contador} - Hashtag: "${hashtag.valor}" que aparece ${hashtag.contagem} vezes\n`);
            contador++
        }
       
    }
}
let zapzap: App = new App();
zapzap.menu();