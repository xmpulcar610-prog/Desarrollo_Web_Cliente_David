const teclado = document.getElementById("teclado");
const salida = document.getElementById("salida");

teclado.addEventListener('click', function(event)
    {
        const boton = event.target
        
        if (boton.tagName === "INPUT" && boton.type === "button")
            {
                salida.value += boton.value
            }
    })