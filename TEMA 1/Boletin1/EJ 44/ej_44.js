function contarDigitos(numero) 
    {
        let contador = 0;

        while (numero > 0) 
            {
               numero = Math.floor(numero / 10);
                contador++;
            }

        return document.getElementById("salida").innerHTML = "El número introducido tiene " + contador + " dígito(s).";
    }

let num = parseInt(prompt("Introduce el número que quieres saber el número de digitos"));

contarDigitos(num);
