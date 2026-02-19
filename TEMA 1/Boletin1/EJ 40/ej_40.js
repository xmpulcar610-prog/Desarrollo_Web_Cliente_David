function mostrarValoresComprendidos(num1, num2)
{
    if (num1 < num2)
        {
            for (let i = num1; i <= num2; i++)
                {
                    document.getElementById("salida").innerHTML += (i + " - ");
                }
        }
    
    else
        {
            for (let i = num1; i >= num2; i--)
                {
                    document.getElementById("salida").innerHTML += (i + " - ");
                }
        }
}

let valor1 = parseInt(prompt("Introducel el primer valor: "));
let valor2 = parseInt(prompt("Introducel el segundo valor: "));

mostrarValoresComprendidos(valor1, valor2)