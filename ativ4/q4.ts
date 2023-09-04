class Radio {
    volume : number;

    constructor(volume : number) {
        this.volume = volume;
    }

}
    
//let r : Radio = new Radio(); com erro de compilação
let r : Radio = new Radio(4);// corrigido

r.volume = 10;
console.log(r.volume);

//O erro de compilação ocorre, pois ele espera um valor do tipo number para o atributo volume, entretanto não é fornecido nenhum, fazendo inpossível atualizar seu valor depois. Para resolver, apenas colocar um valor aleatório como parâmetro para volume, no momento da criação do objeto, assim ele pode ser atualizado para 10 em seguida.
