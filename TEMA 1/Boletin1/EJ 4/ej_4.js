let num1 = parseFloat(prompt("Introduce el primer número:"));
let num2 = parseFloat(prompt("Introduce el segundo número:"));

suma = num1 + num2;
producto = num1 * num2;

document.getElementById("salida1").innerHTML = "La suma de " + num1 + " + " + num2 + " es de " + suma;
document.getElementById("salida2").innerHTML = "El producto de " + num1 + " x " + num2 + " es de " + producto;