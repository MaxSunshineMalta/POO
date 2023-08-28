function main(){
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const dobra = (array: number[]) => array.map(numero => numero * 2);
    const soma = (soma: number[]) => array.reduce((acc: number, numero: number) => acc + numero, 0);

    console.log(dobra(array));
    console.log(soma(array));
}

main()