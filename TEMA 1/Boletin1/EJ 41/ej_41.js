function numeroMenor(num1, num2, num3)
    {
        if (num1 < num2 && num1 < num3)
        {
            document.getElementById("salida").innerHTML = "El número menor es: " + num1;
        }
        else if (num1 < num2 && num1 > num3)
        {
            document.getElementById("salida").innerHTML = "El número menor es: " + num3;
        }
        else if (num1 > num2 && num2 < num3)
        {
            document.getElementById("salida").innerHTML = "El número menor es: " + num2;
        }
        if (num1 > num2 && num2 > num3)
        {
            document.getElementById("salida").innerHTML = "El número menor es: " + num3;
        }
    }

let num1 = parseInt(prompt("Introduce el primer número:"));
let num2 = parseInt(prompt("Introduce el primer número:"));
let num3 = parseInt(prompt("Introduce el primer número:"));


numeroMenor(num1, num2, num3)