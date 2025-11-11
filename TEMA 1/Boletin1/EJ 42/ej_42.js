function ordenarNumeros (num1, num2, num3)
    {
        if (num1 > num2 && num1 > num3 && num2 > num3)
            {
                document.getElementById("salida").innerHTML= (num3 + " - " + num2 + " - " + num1);
            }
        else if (num1 > num2 && num1 > num3 && num2 < num3)
            {
                document.getElementById("salida").innerHTML= (num2 + " - " + num3 + " - " + num1);
            }
        else if (num1 > num2 && num3 > num1 && num3 > num2)
            {
                document.getElementById("salida").innerHTML= (num2 + " - " + num1 + " - " + num3);
            }
        else if (num1 < num2 && num3 > num1 && num3 > num2)
            {
                document.getElementById("salida").innerHTML= (num1 + " - " + num2 + " - " + num3);
            }
        else if (num1 < num2 && num3 < num1 && num3 < num2)
            {
                document.getElementById("salida").innerHTML= (num3 + " - " + num1 + " - " + num2);
            }
        else if (num1 < num2 && num3 > num1 && num3 < num2)
            {
                document.getElementById("salida").innerHTML= (num1 + " - " + num3 + " - " + num2);
            }
    }

let num1 = parseInt(prompt("Introduce el primer número:"));
let num2 = parseInt(prompt("Introduce el primer número:"));
let num3 = parseInt(prompt("Introduce el primer número:"));

ordenarNumeros(num1,num2,num3)