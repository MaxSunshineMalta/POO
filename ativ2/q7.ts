function main(){
    const message: string = showMessage()
    console.log(message)
}


function showMessage(){
    const name: string = "Ely";
    const payment: number = 120.56;
    const prefferedLanguage: string = "Typescript";

    return `My name is ${name}
    My payment time is ${payment}
    and
    my preffered language is ${prefferedLanguage}`;
}

main()