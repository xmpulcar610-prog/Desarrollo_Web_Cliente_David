let letrasDNI = [];

function calcularLetra(dni) 
    {
        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        let resto = dni % 23;
        return letras.charAt(resto);
    }

let intervalo = setInterval(() => 
    {
        let entrada = prompt("Introduce un DNI (solo números). Escribe -1 para salir:");

        if (entrada === "-1") 
            {
                clearInterval(intervalo);
                document.getElementById("salida").innerHTML = "Letras de los DNIs introducidos: " + letrasDNI.join(" ");
            } 
        else 
            {
                let dniNumero = parseInt(entrada);

                if (!isNaN(dniNumero) && dniNumero > 0 && dniNumero < 100000000) 
                    {
                        let letra = calcularLetra(dniNumero);
                        letrasDNI.push(letra);
                        document.getElementById("salida").innerHTML = ("Letra del DNI " + dniNumero + " → " + letra);
                    } 
                else 
                    {
                        document.getElementById("salida").innerHTML = ("DNI no válido. Inténtalo de nuevo.");
                    }
            }
        }, 20000);
