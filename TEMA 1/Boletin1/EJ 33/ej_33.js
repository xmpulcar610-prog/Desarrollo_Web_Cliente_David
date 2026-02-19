let num = parseInt(prompt("Introduce un número entre 0 y 999:"));

while (num != 0) 
    {
        if (num > 0 && num <= 999) 
            {
                if (num < 10) 
                    {
                        document.getElementById("salida1").innerHTML = "El número tiene 1 dígito.";
                    } 
                else if (num < 100) 
                    {
                        document.getElementById("salida1").innerHTML = "El número tiene 2 dígitos.";
                    } 
                else 
                    {
                        document.getElementById("salida1").innerHTML = "El número tiene 3 dígitos.";
                    }
            } 
        else 
            {
                document.getElementById("salida1").innerHTML = "El número debe estar entre 0 y 999.";
            }

        num = parseInt(prompt("Introduce otro número (0 para salir):"));
    }

document.getElementById("salida2").innerHTML += "Programa finalizado.";
