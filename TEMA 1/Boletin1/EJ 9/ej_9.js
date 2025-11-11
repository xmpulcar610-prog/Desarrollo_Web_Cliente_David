let nota1 = parseFloat(prompt("Introduce la primera nota"));
let nota2 = parseFloat(prompt("Introduce la segunda nota"));
let nota3 = parseFloat(prompt("Introduce la tercera nota"));

promedio = (nota1 + nota2 + nota3) / 3;

if (promedio >= 7)
    {  
        document.getElementById("salida").innerHTML = "El alumno esta PROMOCIOMADO"
    }
else
    {
        document.getElementById("salida").innerHTML = "El alumno NO PROMOCIONA"
    }