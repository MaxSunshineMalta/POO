function main() {
    var message = showMessage();
    console.log(message);
}
function showMessage() {
    var name = "Ely";
    var payment = 120.56;
    var prefferedLanguage = "Typescript";
    return "My name is ".concat(name, "\n    My payment time is ").concat(payment, "\n    and\n    my preffered language is ").concat(prefferedLanguage);
}
main();
