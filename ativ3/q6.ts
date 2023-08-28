function exibir(...caracteres: string[]): void{
    let cadeia_de_caracteres = "";

    for(let caractere of caracteres){
        cadeia_de_caracteres = cadeia_de_caracteres + caractere + ", ";
    }

    cadeia_de_caracteres = cadeia_de_caracteres.slice(0, -2);

    console.log(cadeia_de_caracteres);
}


exibir("a", "b");
exibir("a", "b", "c");
exibir("a", "b", "c", "d");

