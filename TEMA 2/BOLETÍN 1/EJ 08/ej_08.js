let campoTexto = formulario.txtEntrada;

campoTexto.addEventListener("keypress", impedirDigitos);

function impedirDigitos(event) 
    {

        if (event.key >= "0" && event.key <= "9") 
            {
                console.log(event.key)
                event.preventDefault(); 
            }
    }
