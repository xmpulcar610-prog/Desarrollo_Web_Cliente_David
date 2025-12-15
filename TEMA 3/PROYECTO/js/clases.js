const panelClientes = document.getElementById("clientes");
const panelPedido = document.getElementById("pedido");

const frmComercial = document.forms.frmComercial;
const selComerciales = frmComercial.elements.comerciales;

const frmControles = document.forms.frmControles;
const selCategorias = frmControles.elements.categorias;
const selProductos = frmControles.elements.productos;

let zonaClientes = null;

function inicio() {
  cargaDatosIniciales();

  zonaClientes = document.createElement("div");
  panelClientes.appendChild(zonaClientes);

  pintaSelectComerciales();
  pintaSelectCategorias();

  gestor.setComercialActual(0);
  gestor.setClienteActual(0);

  pintaClientes();
  pintaProductos();
  pintaPedido();

  selComerciales.onchange = cambiaComercial;
  selCategorias.onchange = cambiaCategoria;
}

function pintaSelectComerciales() {
  selComerciales.innerHTML = "";
  for (let i = 0; i < comerciales.length; i++) {
    let op = document.createElement("option");
    op.value = i;
    op.textContent = comerciales[i];
    selComerciales.appendChild(op);
  }
}

function pintaSelectCategorias() {
  selCategorias.innerHTML = "";
  for (let i = 0; i < categorias.length; i++) {
    let op = document.createElement("option");
    op.value = i;
    op.textContent = categorias[i];
    selCategorias.appendChild(op);
  }
  selCategorias.value = 0;
}

function pintaClientes() {
  zonaClientes.innerHTML = "";

  const cartera = gestor.clientes[gestor.comercialActual];

  for (let i = 0; i < cartera.length; i++) {
    const c = cartera[i];

    const div = document.createElement("div");
    div.className = "cliente " + (c.cuentaAbierta ? "pendiente" : "pagado");
    div.textContent = c.nombre;
    div.dataset.indice = i;

    div.onclick = function () {
      gestor.setClienteActual(this.dataset.indice);
      pintaClientes();
      pintaPedido();
    };

    zonaClientes.appendChild(div);
  }
}

function pintaProductos() {
  selProductos.innerHTML = "";
  const idCat = Number(selCategorias.value);
  const lista = catalogo.getProductosPorCategoria(idCat);

  for (let p of lista) {
    let op = document.createElement("option");
    op.value = p.idProducto;
    op.textContent = p.nombreProducto;
    selProductos.appendChild(op);
  }
}

function pintaPedido() {
  panelPedido.innerHTML = "";

  const cliente = gestor.getClienteActual();
  const pedido = gestor.getPedidoActual();

  if (!cliente.cuentaAbierta || pedido.length === 0) {
    const h = document.createElement("h2");
    h.textContent = "Pedido de: " + cliente.nombre;
    panelPedido.appendChild(h);
    return;
  }

  const h = document.createElement("h2");
  h.textContent = "Pedido de: " + cliente.nombre;
  panelPedido.appendChild(h);

  const tabla = document.createElement("table");

  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  ["Unid.", "+", "-", "Producto", "Importe"].forEach((t) => {
    const th = document.createElement("th");
    th.textContent = t;
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (let linea of pedido) {
    const prod = catalogo.getProductoPorId(linea.idProducto);

    const tr = document.createElement("tr");

    const tdU = document.createElement("td");
    tdU.textContent = linea.unidades;

    const tdMas = document.createElement("td");
    const bMas = document.createElement("input");
    bMas.type = "button";
    bMas.value = "+";
    bMas.className = "modificador";
    bMas.onclick = function () {
      gestor.incrementarProducto(linea.idProducto);
      gestor.actualizaEstadoClienteActual();
      pintaClientes();
      pintaPedido();
    };
    tdMas.appendChild(bMas);

    const tdMenos = document.createElement("td");
    const bMenos = document.createElement("input");
    bMenos.type = "button";
    bMenos.value = "-";
    bMenos.className = "modificador";
    bMenos.onclick = function () {
      if (linea.unidades === 1) {
        if (!confirm("¿Eliminar la línea del pedido?")) return;
      }
      gestor.decrementarProducto(linea.idProducto);
      gestor.actualizaEstadoClienteActual();
      pintaClientes();
      pintaPedido();
    };
    tdMenos.appendChild(bMenos);

    const tdP = document.createElement("td");
    tdP.textContent = prod ? prod.nombreProducto : linea.idProducto;

    const tdI = document.createElement("td");
    const importe = prod ? prod.precioUnidad * linea.unidades : 0;
    tdI.textContent = importe.toFixed(2);

    tr.appendChild(tdU);
    tr.appendChild(tdMas);
    tr.appendChild(tdMenos);
    tr.appendChild(tdP);
    tr.appendChild(tdI);

    tbody.appendChild(tr);
  }

  tabla.appendChild(tbody);
  panelPedido.appendChild(tabla);

  const total = document.createElement("h3");
  total.textContent = "TOTAL: " + gestor.totalPedidoActual(catalogo).toFixed(2);
  panelPedido.appendChild(total);

  const btn = document.createElement("input");
  btn.type = "button";
  btn.value = "PEDIDO ENVIADO Y COBRADO";
  btn.className = "boton";
  btn.onclick = function () {
    gestor.finalizarPedidoActual();
    pintaClientes();
    pintaPedido();
  };
  panelPedido.appendChild(btn);
}

function cambiaComercial() {
  gestor.setComercialActual(selComerciales.value);
  pintaClientes();
  pintaPedido();
}

function cambiaCategoria() {
  pintaProductos();
}

window.onload = inicio;
