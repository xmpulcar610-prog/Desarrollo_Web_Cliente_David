let precio = parseFloat(prompt("Introduce el precio del producto"));
let cantidad = parseFloat(prompt ("Introduce la cantidad del producto comprado"));

debe_abonar = precio * cantidad

document.getElementById("salida").innerHTML = "El usuario debe abonar " + debe_abonar + "€";