let num = parseFloat(prompt("Introduce el número:"));

if (num > 0 && num < 10)
    {
        document.getElementById("salida").innerHTML = "El número tiene 1 CIFRA";
    }
else if (num >= 10 && num < 100)
    {
        document.getElementById("salida").innerHTML = "El número tiene 2 CIFRAS";
    }
else if (num >= 100 && num < 1000)
    {
        document.getElementById("salida").innerHTML = "El número tiene 3 CIFRAS";
    }
else 
    {
        document.getElementById("salida").innerHTML = "El número no tiene ni 1, ni 2 ni 3 CIFRAS";
    }