let mensaje = prompt("Introduce la frase:");

let cursiva = "";

for (let i=0; i < mensaje.length; i++)
    {
        let letra = mensaje[i];

        if (letra >= "a" && letra <= "z")
            {
                cursiva += "<i>" + letra + "</i>"
            }
        else
            {
                cursiva += letra;
            }
    }

document.getElementById("salida").innerHTML = cursiva;