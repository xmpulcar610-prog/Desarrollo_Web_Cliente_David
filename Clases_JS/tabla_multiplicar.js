let num = prompt("Introduce un número")
let resultado = ""

for (let i=1; i<=10; i++)
{
    resultado += num + " x " + i + " = " + num*i + "<br>";

}

document.getElementById("salida").innerHTML = resultado;