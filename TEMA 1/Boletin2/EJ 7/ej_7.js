let mensaje = prompt ("Introduce una cadena con el siguiente formato: “nombre:apellidos:telefono:email:codigopostal”.");

let cadena = mensaje.split(":");

let cp = cadena[4];
let apellidos = cadena[1].replace(/([a-z])([A-Z])/g, "$1 $2");
let email = cadena[3];
let servidor = email.split("@")

document.getElementById("salida1").innerHTML = "El codigo postal es: " + cp;

document.getElementById("salida2").innerHTML = "Los apellidos son: " + apellidos;

document.getElementById("salida3").innerHTML = "El email es: " + email;

document.getElementById("salida4").innerHTML = "El servidor asociado es: " + servidor[1];

//Miguel:PulidoCarmona:697387397:miguelpulidocarmona12@gmail.com:41702