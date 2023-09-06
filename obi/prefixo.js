var n, cad1, m, cad2, tamanho_do_prefixo, prefixo_comum;
	
scanf("%d%s%d%s", "n", "cad1", "m", "cad2");

if(n === m){
    prefixo_comum = obter_prefixo_comum(cad1, cad2);
    tamanho_do_prefixo = prefixo_comum.length;

    printf("%d\n", tamanho_do_prefixo);
}else{
    prefixo_comum = obter_prefixo_comum(cad1, cad2);
    tamanho_do_prefixo = prefixo_comum.length;
  
    printf("%d\n", tamanho_do_prefixo);
}
   
function obter_prefixo_comum(nome1, nome2){
var prefixo_comum = "";
var caractere = 0;

while(nome1[caractere] === nome2[caractere]){
   prefixo_comum = prefixo_comum + nome1[caractere];
   caractere++;
}  

return prefixo_comum;
}