let numero = parseInt(prompt("Introduce un número:"));

if (numero <= 1) {
    console.log("No es primo");
} else {
    let esPrimo = true;
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            esPrimo = false;
            break;
        }
    }

    if (esPrimo) {
        console.log("Es primo");
    } else {
        console.log("No es primo");
    }
}