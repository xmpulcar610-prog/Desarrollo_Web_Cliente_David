function perimetroCuadrado (lado)
    {
        document.getElementById("salida").innerHTML = "El perimetro del cuadrado es " + lado * 4
    }

let lado = parseFloat(prompt("Introduce el valor del lado del cuadrado: "))

perimetroCuadrado(lado)
