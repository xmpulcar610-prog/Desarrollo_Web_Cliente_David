let num1 = prompt ("Introduce el primer número");
let num2 = prompt ("Introduce el segundo número");
let num3 = prompt ("Introduce el tercer número");

if (num1 == num2 && num2 == num3)
    {
        suma = num1 + num2;
        resultado = suma * num3;
    }
else document.getElementById("salida").innerHTML = "Los valores no son iguales";

document.getElementById("salida").innerHTML = "El resultado de los 3 números es "+resultado;    