let num1 = parseFloat(prompt("Introduce el primer número: "));
let num2 = parseFloat(prompt("Introduce el segundo número: "));
let num3 = parseFloat(prompt("Introduce el tercer número: "));

if (num1 > num2 && num1 > num3)
    {
        document.getElementById("salida").innerHTML="El número mayor es: " + num1;
    }
else if (num1 > num2 && num1 < num3)
    {   
        document.getElementById("salida").innerHTML= "El número mayor es: " + num3;
    }
 else if (num1 < num2 && num2 > num3)
    {
        document.getElementById("salida").innerHTML= "El número mayor es: " + num2;
    }
 else if (num1 < num2 && num2 < num3)
    {
        document.getElementById("salida").innerHTML= "El número mayor es: " + num3;
    }