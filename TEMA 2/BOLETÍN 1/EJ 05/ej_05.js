let checkbox = formulario.verano;
let botonMarcar = document.getElementById("botonMarcar");

function marcarDesmarcar() 
{
    checkbox.checked = !checkbox.checked;
}

function addManejador() 
{
    botonMarcar.addEventListener("click", marcarDesmarcar);
    console.log("Manejador añadido");
}

function deleteManejador() 
{
    botonMarcar.removeEventListener("click", marcarDesmarcar);
    console.log("Manejador eliminado");
}
