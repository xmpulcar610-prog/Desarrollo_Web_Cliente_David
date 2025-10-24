let clave1 = prompt("Introduce la primera clave:");
let clave2 = prompt("Introduce la segunda clave:");

if (clave1 == clave2)
    {
        document.getElementById("salida").innerHTML = "Las claves son IGUALES";
    }
else
    {
        document.getElementById("salida").innerHTML = "Las claves son DIFERENTES";
    }