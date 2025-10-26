let num = parseInt(prompt("Introduce un número entre 0 y 9999:"));
let suma_num = 0;

while (num != 9999)
    {
        num = parseInt(prompt("Introduce un número entre 0 y 9999:"));
        suma_num += num;
    }

document.getElementById("salida1").innerHTML= "La suma de los números introducidos es de: " +suma_num;
    
if (suma_num === 0)
    {
        document.getElementById("salida2").innerHTML= "El número es igual a 0"
    }

else if (suma_num > 0)
    {
        document.getElementById("salida2").innerHTML= "El número es mayor a 0"
    }

else if (suma_num < 0)
    {
        document.getElementById("salida2").innerHTML= "El número es menor a 0"
    }
