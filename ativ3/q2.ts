function main(){
    let numero: number;
    numero = 7;

    const situacao = verificar_se_eh_primo(numero);

    console.log(situacao);
}


function verificar_se_eh_primo(num: number) : boolean {
    if(calcular_qtd_de_divisores(num) == 2){
        return true;
    }else{
        return false;
    }
}


function calcular_qtd_de_divisores(num: number) : number{
    let qtd_de_divisores: number = 0;
    
    for(let i: number = num; i > 0; i--){
        if(num % i == 0){
            qtd_de_divisores++;
        }
    }

    return qtd_de_divisores;
}


main()
