pares = 0;
impares = 0;

for (let i=1; i <= 5; i++)
    {
        let num= parseFloat(prompt("Introduce el número " + i + ": "));

        if (num % 2 == 0)
            {
                pares++;
            }
        else
            {
                impares++;
            }
    }

document.getElementById("salida1").innerHTML = "La cantidad de número pares es de: " +pares;
document.getElementById("salida2").innerHTML = "La cantidad de número pares es de: " +impares;