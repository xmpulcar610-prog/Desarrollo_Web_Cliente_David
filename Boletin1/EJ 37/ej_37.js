let negativos = 0;
let positivos = 0;
let multiplos_15 = 0;
let suma_pares = 0;

for ( let valor = 1; valor <= 10; valor++)
    {
        let num = parseInt(prompt("Introduce el " +valor+ "º número: "));
        suma_num += num;

        if (num < 0)
            {
                negativos++;
            }
        else (num > 0)
            {
                positivos++;
            }
        
        if ( num % 15 === 0)
            {
                multiplos_15++;
            }
        
        if (num % 2 === 0)
            {
                suma_pares += num;
            }
    }
document.getElementById("salida1").innerHTML = "La cantidad de número negativos es: " + negativos;
document.getElementById("salida2").innerHTML = "La cantidad de número positivos es: " + positivos;
document.getElementById("salida3").innerHTML = "La cantidad de múltiplos de 15 es: " + multiplos_15;
document.getElementById("salida4").innerHTML = "La suma de todos estos números es: " + suma_num;
