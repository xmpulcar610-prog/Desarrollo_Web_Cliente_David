let nombre = prompt("Introduzca su nombre:");
let fecha_nacimiento = prompt("Introduzca su fecha de nacimiento (aaaa/mm/dd):");

let partes = fecha_nacimiento.split("/"); // ["dd", "mm", "aa"]

let fechaNacimiento = new Date("20" + partes[2], partes[1] - 1, partes[0]);

let hoy = new Date();

let diferenciaMs = hoy - fechaNacimiento;

let diasVividos = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

document.getElementById("salida").innerHTML =nombre + ", has vivido aproximadamente " + diasVividos + " días.";
