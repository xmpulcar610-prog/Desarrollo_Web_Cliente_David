let num_tabla = parseInt(prompt("Introduce el número que quieres tener la tabla"))

for (let num = 0; num <= 12; num++)
    {
        multiplica = num_tabla * num;
        document.getElementById("salida").innerHTML += num_tabla + " x " + num + " = " + multiplica + "<br>";
    }