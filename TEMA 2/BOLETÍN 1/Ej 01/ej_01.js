formulario.consultar.addEventListener("click", mostrarDatos);
function mostrarDatos()
    {
        for (let actor of formulario.actores)
            {
                if (actor.checked)
                    {
                        document.getElementById("salida").innerHTML = (actor.value);
                    }
            }
    }
