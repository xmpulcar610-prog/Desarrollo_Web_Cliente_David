let num1 = parseFloat(prompt("Introduce el primer número"));
let num2 = parseFloat(prompt("Introduce el segundo número"));
let num3 = parseFloat(prompt("Introduce el tercer número"));
let num4 = parseFloat(prompt("Introduce el cuarto número"));

suma = num1 + num2;
producto = num3 * num4;

document.getElementById("salida1").innerHTML = "La suma de los dos primeros numeros (" + num1 + " + " + num2 + ") es de " + suma;
document.getElementById("salida2").innerHTML = "EL producto deL tercer y cuarto numero (" + num3 + " x " + num4 + ") es de " + producto;
