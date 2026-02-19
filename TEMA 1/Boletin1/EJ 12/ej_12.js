let num1 = Number(prompt("Introduce el primer número"));
let num2 = Number(prompt("Introduce el segundo número"));

suma = num1 + num2;
resta = num1 - num2;
multi = num1 * num2;
division = num1 / num2;

if (num1 > num2) document.getElementById("salida").innerHTML = "Al ser el numero " +num1+ " MAYOR que el número " +num2+ " se debe realizar la SUMA "+ suma+ " y la RESTA "+ resta;
else document.getElementById("salida").innerHTML ="Al ser el numero " +num1+ " MENOR que el número " +num2+ " se debe realizar la MULTIPLICACIÓN " +multi+ " y la DIVISIÓN "+division; 