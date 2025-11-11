let letraUsuario = prompt("Introduce una letra de la A a la Z:").toUpperCase();

if (!/^[A-Z]$/.test(letraUsuario)) 
    {
        document.getElementById("salida").innerHTML = "Debes introducir una sola letra entre A y Z.";
    } 
else 
    {
        const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

        let coincidencias = [];

        for (let dni = 1; dni <= 999; dni++) 
            {
                let resto = dni % 23;
                let letra = letras.charAt(resto);

                if (letra === letraUsuario) 
                    {
                        let dniFormateado = dni.toString().padStart(3, "0");
                        coincidencias.push(dniFormateado + letra);
                    }
            }

        document.getElementById("salida").innerHTML = " Hay <b>" + coincidencias.length + "</b> DNIs con la letra <b>" + letraUsuario + "</b>." + "<br><br>Listado completo:<br>" +
        coincidencias.join(", ");
    }
