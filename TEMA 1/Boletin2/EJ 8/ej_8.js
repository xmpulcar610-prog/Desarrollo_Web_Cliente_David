let opcion = prompt("¿Qué deseas ver?\n"+
    "1. Fecha actual\n"+
    "2. Hora actual\n"+
    "3. Día de la semana\n"+
    "4. Todo a la vez\n\n"+
    "Escribe el número correspondiente:");

let fecha = new Date();

let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio","julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

let diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

let dia = fecha.getDate();
let mes = meses[fecha.getMonth()];
let año = fecha.getFullYear();

let hora = fecha.getHours();
let minutos = fecha.getMinutes().toString().padStart(2, "0");
let diaSemana = diasSemana[fecha.getDay()];

let mensaje = "";

if (opcion == "1") {
  mensaje = " Fecha actual: " + dia + " de " + mes + " de " + año;
} else if (opcion == "2") {
  mensaje = "Hora actual: " + hora + ":" + minutos;
} else if (opcion == "3") {
  mensaje = "Hoy es " + diaSemana;
} else if (opcion == "4") {z
  mensaje = dia + " de " + mes + " de " + año +
             "<br>" + hora + ":" + minutos +
             "<br>" + diaSemana;
} else {
  mensaje = "Opción no válida. Debes elegir 1, 2, 3 o 4.";
}

document.getElementById("salida").innerHTML = mensaje;
