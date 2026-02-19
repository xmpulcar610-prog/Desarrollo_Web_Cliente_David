let mensaje = prompt("Introduce la frase:");

let negrita = "";

for (let i=0; i < mensaje.length; i++)
    {
        let letra = mensaje[i];

        if (letra >= "A" && letra <= "Z")
            {
                negrita += "<b>" + letra + "</b>"
            }
        else
            {
                negrita += letra;
            }
    }

document.getElementById("salida").innerHTML = negrita;