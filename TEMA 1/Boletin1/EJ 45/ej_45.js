let suma = 0;
function promedioTresEnteros (num1, num2,num3)
    {
        suma = num1 + num2 + num3;
        document.getElementById("salida").innerHTML = "El promedio de los 3 números es: " + (suma / 3);
    }

let num1 = parseInt(prompt("Introduce el primer número: "));
let num2 = parseInt(prompt("Introduce el segundo número: "));
let num3 = parseInt(prompt("Introduce el tercer número: "));

promedioTresEnteros (num1, num2, num3);