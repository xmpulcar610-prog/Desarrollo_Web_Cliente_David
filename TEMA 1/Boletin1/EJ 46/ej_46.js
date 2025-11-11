function sumaCincoDigitos (num1, num2, num3, num4, num5)
    {
        suma = num1 + num2 + num3 + num4 + num5;
        document.getElementById("salida").innerHTML = "La suma de los 5 números es: " +suma;
    }

let num1 = parseInt(prompt("Introduce el primer número: "));
let num2 = parseInt(prompt("Introduce el segundo número: "));
let num3 = parseInt(prompt("Introduce el tercer número: "));
let num4 = parseInt(prompt("Introduce el cuarto número: "));
let num5 = parseInt(prompt("Introduce el quinto número: "));

sumaCincoDigitos (num1, num2, num3, num4, num5)
