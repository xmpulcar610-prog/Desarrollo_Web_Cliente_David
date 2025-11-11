let nombre = prompt("Introduce el nombre del empleado:");
let num_preguntas = parseFloat(prompt("Introduce el número de preguntas que se le hizo:"));
let preguntas_correct = parseFloat(prompt("Introduce el número de preguntas correctas:"));

porcentaje_preguntas = (preguntas_correct / num_preguntas) * 100

if (porcentaje_preguntas >= 90)
    {
        document.getElementById("salida").innerHTML = " El empleado " +nombre+ " tiene un nivel Superior";
    }
else if (porcentaje_preguntas >= 75 && porcentaje_preguntas < 90)
    {
        document.getElementById("salida").innerHTML = " El empleado " +nombre+ " tiene un nivel Medio";
    }
else if (porcentaje_preguntas >= 50 && porcentaje_preguntas < 75)
    {
        document.getElementById("salida").innerHTML = " El empleado " +nombre+ " tiene un nivel Bajo";
    }
else if (porcentaje_preguntas < 50)
    {
        document.getElementById("salida").innerHTML = " El empleado " +nombre+ " no tiene nivel";
    }