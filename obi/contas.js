var v, a, f, p, qtd_de_pagamentos; 
	scanf("%d%d%d%d", "v", "a", "f", "p");
	
	qtd_de_pagamentos = calcular_qtd_de_pagamentos(v, a, f, p);
	
	printf("%d\n", qtd_de_pagamentos);

function calcular_qtd_de_pagamentos(v, a, f, p){
	if(v < a && v < f && v < p){
        return 0;
    }else if(v >= a + f + p){
        return 3;
    }else if(v >= a + f || v >= a + p || v >= f + p){
        return 2;
    }else{
        return 1; 
    }
}
