let contador = 0;
let numero = 2;


while (contador < 100) 
    {
        let esPrimo = true;

        for (let i = 2; i <= Math.sqrt(numero); i++) 
            {
                if (numero % i === 0) 
                    {
                        esPrimo = false;
                        break;
                    }
            }

        if (esPrimo) 
            {
                document.getElementById("salida").innerHTML += numero + " - ";
                contador++;
            }
  numero++;
}

