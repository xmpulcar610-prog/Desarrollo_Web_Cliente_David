let nombre= prompt("Introduzca su nombre y apellidos");

let tamaño = nombre.replaceAll(" ", "").length;
let minusculas = nombre.toLowerCase();
let mayusculas = nombre.toUpperCase();
let nombre_por_partes = nombre.trim().split(" ");

let nombre_propio = nombre_por_partes[0];
let apellido1 = nombre_por_partes[1];
let apellido2 = nombre_por_partes[2];

let usuario = nombre_propio[0].toLowerCase() + apellido1.slice(0,3).toLowerCase() + apellido2.slice(0,3).toLowerCase();

document.getElementById("salida1").innerHTML = "El tamaño de la cadena es: " +tamaño;
document.getElementById("salida2").innerHTML = "Esta es la cadena en minúsculas: " + minusculas + "<br>" + 
                                                "Esta es la cadena en mayúsculas: " +mayusculas;
document.getElementById("salida3").innerHTML = nombre_por_partes.join("<br>");
document.getElementById("salida4").innerHTML = usuario;

