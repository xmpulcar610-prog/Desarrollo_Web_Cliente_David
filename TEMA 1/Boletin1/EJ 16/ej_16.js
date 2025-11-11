let num = prompt("Introduce un número")

if (num > 0)
    {
        document.getElementById("salida").innerHTML = "El número " +num+ " es POSITIVO";
    }
else if (num < 0)
    {
        document.getElementById("salida").innerHTML = "El número " + num + " es NEGATIVO";
    }
else if (num == 0)
    {
        document.getElementById("salida").innerHTML = "El número es 0";
    }   