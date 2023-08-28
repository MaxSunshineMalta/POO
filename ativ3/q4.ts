function main(){
    const array: number[] = [1, 3, 5, 7];
    
    const num_separados: string = obter_num_separados(array);

    console.log(num_separados);
}


function obter_num_separados(array: number[]): string{
    let num_separados = "";

    for(let numero of array){
        num_separados = num_separados + numero +"-";
    }

    num_separados = num_separados.slice(0, -1);
    //num_separados = num_separados.slice(0, num_separados.length - 1); tbm funciona

    return num_separados;
}


main()