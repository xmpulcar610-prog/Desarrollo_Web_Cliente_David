let campoTexto = formulario.txtEntrada;

campoTexto.addEventListener("copy", impedirCopia);

function impedirCopia(event) 
    {
        event.preventDefault(); 
    }


