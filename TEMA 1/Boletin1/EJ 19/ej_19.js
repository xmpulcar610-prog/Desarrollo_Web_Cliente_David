let dia = prompt("Ingresa el día que quieres comprobar");
let mes = prompt("Ingresa el mes que quieres comprobar");

if (dia == 25 && mes == 12)
    {
        document.getElementById("salida").innerHTML = "La fecha introducida es NAVIDAD"
    }
else
    {
        document.getElementById("salida").innerHTML = "La fecha introducida no coincide con NAVIDAD"
    }