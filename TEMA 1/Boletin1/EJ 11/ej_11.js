let num1 = parseFloat(prompt("Introduce el primer número:"));
let num2 = parseFloat(prompt("Introduce el segundo número, que sea diferente al primero:"));

if (num1 > num2)
    {
        document.getElementById("salida").innerHTML = "El número mayor es: " +num1;
    }
else if (num1 < num2)
    {
        document.getElementById("salida").innerHTML = "El número mayor es: " +num2;
    }
else
    {
        document.getElementById("salida").innerHTML = "Son números iguales"
    }


