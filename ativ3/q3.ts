function main(){
    const frase: string = obter_saudacao("Max", "Sra");

    console.log(frase);
}


function obter_saudacao(nome: string, pronome : string = "Sr"): string {
    return pronome + ", " + nome;
}

main()