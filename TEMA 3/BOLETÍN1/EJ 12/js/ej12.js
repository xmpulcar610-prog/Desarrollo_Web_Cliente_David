/***************************************************************
 * EJERCICIO ej12.js  (comentado paso a paso)
 *
 * IDEA GENERAL (en cristiano):
 * 1) Click en una imagen  => se “marca” o “desmarca” (toggle) con la clase .seleccionado
 * 2) Botón BORRAR         => elimina del DOM todas las imágenes seleccionadas
 * 3) Botón APLICAR        => mueve o clona las seleccionadas al contenedor elegido,
 *                            y las coloca al principio o al final (siempre después del título)
 *                            y al terminar, quita la selección a todo.
 ***************************************************************/


/***************************************************************
 * 1) AL CARGAR LA PÁGINA: enganchar eventos (listeners)
 ***************************************************************/
document.addEventListener("DOMContentLoaded", function () {

  // Cuando se pulse el botón "Borrar", ejecuta borrarSeleccionados()
  document.getElementById("btnBorrar").onclick = borrarSeleccionados;

  // Cuando se pulse el botón "Aplicar", ejecuta aplicarSeleccion()
  document.getElementById("btnAplicar").onclick = aplicarSeleccion;

  // Cogemos todas las imágenes de la página (estén donde estén)
  let imagenes = document.getElementsByTagName("img");

  // Recorremos todas y a cada una le ponemos un onclick
  for (let i = 0; i < imagenes.length; i++) {

    // "this" dentro del onclick será la propia imagen clicada
    imagenes[i].onclick = function () {
      permutarSeleccion(this); // alterna la clase "seleccionado"
    };
  }
});


/***************************************************************
 * 2) BORRAR SELECCIONADOS
 * - Busca todas las imágenes con la clase "seleccionado"
 * - Las elimina del DOM
 ***************************************************************/
function borrarSeleccionados() {

  // OJO: getElementsByClassName devuelve una HTMLCollection "viva"
  // (se actualiza conforme vas borrando elementos)
  const seleccionados = document.getElementsByClassName("seleccionado");

  // En esta versión se recorre hacia delante.
  // (Con colecciones "vivas" lo más seguro suele ser recorrer hacia atrás,
  //  pero este ejercicio lo lleva así; según el HTML puede funcionar sin problema.)
  for (let i = 0; i < seleccionados.length; i++) {
    seleccionados[i].remove(); // elimina el nodo (la imagen) del DOM
  }

  // Versión más segura (comentada en tu código original):
  // for (let i = seleccionados.length - 1; i >= 0; i--) {
  //   seleccionados[i].remove();
  // }
}


/***************************************************************
 * 3) PERMUTAR (TOGGLE) LA SELECCIÓN DE UNA IMAGEN
 * - Si ya estaba seleccionada => se desmarca
 * - Si no estaba => se marca
 ***************************************************************/
function permutarSeleccion(img) {

  // classList.contains comprueba si tiene esa clase
  if (img.classList.contains("seleccionado")) {
    // Si la tenía: se la quitamos
    img.classList.remove("seleccionado");
  } else {
    // Si no la tenía: se la ponemos
    img.classList.add("seleccionado");
  }
}


/***************************************************************
 * 4) APLICAR SELECCIÓN
 * Hace lo que pide el enunciado al pulsar btnAplicar:
 * - Lee destino (contenedor), lugar (primero/último) y si clonar
 * - Coge todas las imágenes seleccionadas
 * - Si clonar: crea copias (clones) y las inserta en destino
 * - Si NO clonar: mueve las imágenes originales al destino
 * - Coloca las imágenes en primer lugar (después del título) o en último lugar
 * - Al final: quita la selección a todo (originales y copias)
 ***************************************************************/
function aplicarSeleccion() {

  /***********************
   * 4.1) Leer controles
   ***********************/

  // destino: valor del radio name="sitio" que esté marcado (checked)
  // Ejemplo: "cont1", "cont2", "cont3" (según tu HTML)
  const destino = document.querySelector("[name='sitio']:checked").value;

  // lugar: valor del radio name="lugar" marcado (first / last)
  const lugar = document.querySelector("[name='lugar']:checked").value;

  // clonar: true si el checkbox name="clonar" está marcado
  const clonar = document.querySelector("[name='clonar']").checked;

  // contenedorDestino: el div/section destino, por su id
  const contenedorDestino = document.getElementById(destino);

  // seleccionados: NodeList estático de TODO lo que tenga .seleccionado
  // (da igual si están en cont1, cont2 o cont3: los pilla todos)
  const seleccionados = document.querySelectorAll(".seleccionado");

  // variable para ir guardando el nodo a insertar (original o copia)
  let nodo;


  /***********************
   * 4.2) Recorrer seleccionados e insertar
   ***********************/
  for (let i = 0; i < seleccionados.length; i++) {

    // Si se marcó CLONAR:
    if (clonar) {

      // cloneNode() sin parámetros = false => clona SOLO la etiqueta <img>,
      // con sus atributos, pero sin hijos (img no suele tener hijos, así que perfecto)
      nodo = seleccionados[i].cloneNode();

      // Muy importante: a la COPIA hay que volver a ponerle el onclick
      // porque los eventos no se clonan automáticamente
      nodo.onclick = function () {
        permutarSeleccion(this);
      };

    } else {
      // Si NO se clona, movemos el mismo nodo (la imagen original)
      // append/insertBefore lo “saca” del sitio antiguo y lo coloca en el nuevo
      nodo = seleccionados[i];
    }


    /***********************
     * 4.3) Colocar en "primer lugar" o "último lugar"
     ***********************/

    // En el enunciado: “Primer lugar” significa:
    // justo detrás del TÍTULO del contenedor (por ejemplo un <h2>Contenedor 1</h2>)
    //
    // Esto se consigue insertando antes del primer elemento "imagen" del contenedor,
    // pero NO antes del título.
    //
    // La plantilla que tú tienes asume que:
    // - contenedorDestino.children[0] es el título
    // - contenedorDestino.children[1] sería la primera imagen (si existe)
    //
    // Si lugar == "first" y hay más de 1 hijo (título + al menos algo más),
    // se inserta justo antes de children[i + 1]
    // (para que al meter varias, mantenga el orden y vaya colocándolas detrás del título)
    if (lugar == "first" && contenedorDestino.children.length > 1) {
      contenedorDestino.insertBefore(nodo, contenedorDestino.children[i + 1]);
    } else {
      // Si es "last" o si sólo está el título (no hay imágenes),
      // se añade al final (si solo hay título, “final” sigue siendo después del título)
      contenedorDestino.append(nodo);
    }

    // Tras insertar cada nodo, quitamos la selección a todo
    // (así el borde rojo desaparece y no quedan “marcadas”)
    quitarSeleccion();
  }
}


/***************************************************************
 * 5) QUITAR SELECCIÓN A TODAS
 * - Busca todos los elementos con la clase "seleccionado"
 * - Se la elimina
 ***************************************************************/
function quitarSeleccion() {

  // NodeList estático de todos los .seleccionado que existan en este momento
  let seleccionados = document.querySelectorAll(".seleccionado");

  for (let i = 0; i < seleccionados.length; i++) {
    seleccionados[i].classList.remove("seleccionado");
  }
}
