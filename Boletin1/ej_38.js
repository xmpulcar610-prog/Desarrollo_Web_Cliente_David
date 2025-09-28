let numero = parseInt(prompt("Introduce un número:"));
let esPrimo = true;


if (numero < 1) {
    document.getElementById("salida").innerHTML ="El numero " +numero+ " no es primo";
} else {
    for (let i = 3; i <= numero-1; i++) {
        if (numero % i === 0) {
            esPrimo = false;
            break;
        }
    }

    if (esPrimo) {
        document.getElementById("salida").innerHTML ="El numero " +numero+ " es primo";
    } else {
        document.getElementById("salida").innerHTML ="El numero " +numero+ " no es primo";
    }
}