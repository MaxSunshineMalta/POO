function main(){
    let numero: number;
    numero = 23;

    const situacao = verificar_se_par_ou_impar(numero);

    console.log(situacao);
}


function verificar_se_par_ou_impar(num: number): boolean{
    if(num % 2 == 0){
        return true
    }else{
        return false
    }
}

main()