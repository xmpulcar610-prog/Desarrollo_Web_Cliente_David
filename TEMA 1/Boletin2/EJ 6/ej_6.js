let mensaje = prompt("Introduce la frase:");

let nuevo_mensaje = "";


for (let i=0; i < mensaje.length; i++)
    {
        let letra = mensaje[i];

        if (letra >= "A" && letra <= "Z")
            {
                nuevo_mensaje += letra.toLowerCase()
            }
        else
            {
                nuevo_mensaje += letra.toUpperCase();
            }
    }

document.getElementById("salida").innerHTML = nuevo_mensaje;