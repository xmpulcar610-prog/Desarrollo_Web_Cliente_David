document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("btnMover").onclick = aplicarSeleccion;

});

function aplicarSeleccion() {
    const carga = document.querySelector("[class='check-prod']:checked").checked; 

    const destino = document.querySelector("[name='destino']:checked").value; 

    const metodo = document.querySelector("[name='metodo']:checked").value; 

    const clonar = document.querySelector("[name='clonar']:checked").value;

    const contenedorDestino = document.getElementById(destino);

    let seleccion;

    for (let i = 0; i < seleccionados.length; i++) {

    if (clonar) {

      seleccion = seleccionados[i].cloneNode();

      seleccion.onclick = function () {
        permutarSeleccion(this);
      };

    } else {
      seleccion = seleccionados[i];
    }

   if (metodo == "before" && contenedorDestino.children.length > 1) 
    {
      contenedorDestino.insertBefore(seleccion, contenedorDestino.children[i + 1]);
    }
   elif(metodo == "after" && contenedorDestino.children.length > 1) 
    {
      contenedorDestino.insertAfter(seleccion, contenedorDestino.children[i + 1]);
    }
   elif(metodo == "append" && contenedorDestino.children.length > 1) 
    {
      contenedorDestino.append(seleccion, contenedorDestino.children[i + 1]);
    } 
   elif(metodo == "prepend" && contenedorDestino.children.length > 1) 
   {
      contenedorDestino.prepend(seleccion, contenedorDestino.children[i + 1]);
   }
}
}



// Funcionalidad de reinicio
document
  .getElementById("btnRestaurar")
  .addEventListener("click", () => location.reload());
