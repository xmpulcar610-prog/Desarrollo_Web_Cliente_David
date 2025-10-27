let numeros = [12,54,21,2,74,32,6,4,77,54,31]

let pares = [];
let impares = [];

for (let i = 0; i < numeros.length; i++) 
    {
        if (numeros[i] % 2 === 0) 
            {
                pares.push(numeros[i]);
            } 
        else 
            {
                impares.push(numeros[i]);
            }
    }

pares.sort((a, b) => a - b);
impares.sort((a, b) => a - b);

let resultado = [];

if (numeros.length % 2 !== 0) 
    {
        resultado = impares.concat(pares);
    } 
else 
    {
        resultado = pares.concat(impares);
    }

document.getElementById("salida1").innerHTML = "Array original: " + numeros.join(", ");
document.getElementById("salida2").innerHTML = "Array resultado: " + resultado.join(", ");
