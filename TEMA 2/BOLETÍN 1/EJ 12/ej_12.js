formulario.addEventListener ("submit", validarFormulario);

function validarFormulario(event)
{
    if (formulario.txtTexto.value.length == 0)
    {
        event.preventDefault();
        alert("Input vacío");
    }
}