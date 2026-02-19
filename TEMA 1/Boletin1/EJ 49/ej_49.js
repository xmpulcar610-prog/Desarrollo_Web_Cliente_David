let nuevo_dia = 0;
let nuevo_mes = 0;
let nuevo_año = 0;

function diaSiguiente()
    {
        const dia = Number(frmFecha.dd.value);
        const mes = Number(frmFecha.mm.value);
        const año = Number(frmFecha.aa.value);

        nuevo_dia = dia + 1;
        nuevo_mes = mes;
        nuevo_año = año;
        
        let dias_mes;

        if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) 
            {
                dias_mes = 31;
            } 
        
        else if ([4, 6, 9, 11].includes(mes)) 
            {
                dias_mes = 30;
            } 
        
        else if (mes === 2) 
            {
                if ((año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0)) 
                    {
                        dias_mes = 29;
                    } 
                else 
                    {
                        dias_mes = 28;
                    }
            }
        
        if (nuevo_dia > dias_mes) 
            {
                nuevo_dia = 1;
                nuevo_mes++;
            }

        if (nuevo_mes > 12) 
            {
                nuevo_mes = 1;
                nuevo_año++;
            }
            
        document.getElementById("salida").innerHTML = "La nueva fecha es " + nuevo_dia + " / " + nuevo_mes + " / " + nuevo_año
    }