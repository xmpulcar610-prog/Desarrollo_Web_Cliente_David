let suma = 0;

for ( let i = 1; i <= 5; i++)
{
    let valor = Number(prompt("Introduce un número"));
    suma+= valor;
}

document.getElementById("salida").innerHTML = "La suma de estos 5 valores son "+suma;