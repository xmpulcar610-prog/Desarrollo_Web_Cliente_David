let fecha1 = prompt("Introduce la primera fecha (formato AAAA-MM-DD):");
let fecha2 = prompt("Introduce la segunda fecha (formato AAAA-MM-DD):");

let fecha_str1 = new Date(fecha1);
let fecha_str2 = new Date(fecha2);

let anterior, posterior;

if (fecha_str1 > fecha_str2) 
    {
        anterior = fecha_str2;
        posterior = fecha_str1;
    } 
else if (fecha_str2 > fecha_str1) 
    {
        anterior = fecha_str1;
        posterior = fecha_str2;
    } 
else 
    {
        document.getElementById("salida1").innerHTML = "Las dos fechas son iguales.";
    }

document.getElementById("salida1").innerHTML ="La fecha " + anterior.toLocaleDateString() + " es anterior a " + posterior.toLocaleDateString();

let difeMs = posterior - anterior;
let difeDias = Math.floor(difeMs / (1000 * 60 * 60 * 24));

let años = Math.floor(difeDias / 365);
let meses = Math.floor((difeDias % 365) / 30);
let dias = difeDias - (años * 365 + meses * 30);

document.getElementById("salida2").innerHTML = "Tiempo transcurrido: " + años + " año(s), " + meses + " mes(es) y " + dias + " día(s).";
