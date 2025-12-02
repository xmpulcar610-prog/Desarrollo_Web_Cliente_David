window.addEventListener("DOMContentLoaded", function () {
  const capa = document.getElementById("capa");
  const resultado = document.getElementById("resultado");
  recorrerNodo(capa, resultado);
});

function recorrerNodo(nodo, contenedor) {
  const bloque = document.createElement("div");

  const sep = document.createElement("p");
  sep.appendChild(document.createTextNode("-------------------------"));
  bloque.appendChild(sep);

  function linea(etq, val) {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(etq + " = " + val));
    bloque.appendChild(p);
  }

  const clase = nodo.constructor && nodo.constructor.name ? nodo.constructor.name : "Desconocida";
  linea("NodeType", nodo.nodeType);
  linea("Nombre de la clase", clase);
  linea("NodeName", nodo.nodeName);
  linea("NodeValue", nodo.nodeValue === null ? "null" : nodo.nodeValue);

  let inner = "null";
  if (nodo.nodeType === Node.ELEMENT_NODE) inner = nodo.innerHTML;
  linea("innerHTML", inner);

  contenedor.appendChild(bloque);

  const hijos = nodo.childNodes;
  for (let i = 0; i < hijos.length; i++) {
    recorrerNodo(hijos[i], contenedor);
  }
}
