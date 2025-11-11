let nota = parseFloat(prompt("Introduce la nota del alumno"));

if (nota >= 4)
    {
        document.getElementById("salida").innerHTML = "El alumno esta APROBADO";
    }
else
    {
        document.getElementById("salida").innerHTML = "El alumno esta SUSPENSO";
    }