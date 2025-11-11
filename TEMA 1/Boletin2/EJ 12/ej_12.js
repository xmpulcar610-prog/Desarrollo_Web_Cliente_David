let datos = [10, "hola", 25, "23", 7, "adiós", 100, "pepe"];

let suma = 0;
let noNumericos = 0;

for (let i = 0; i < datos.length; i++) 
    {
        let elemento = datos[i];

        let numero = Number(elemento);

        if (!isNaN(numero)) 
            {
                suma += numero;
            } 
        else 
            {
                noNumericos++;
            }
    }

document.getElementById("salida1").innerHTML = "Suma de los números: " + suma;
document.getElementById("salida2").innerHTML = "Cantidad de elementos no numéricos: " + noNumericos;