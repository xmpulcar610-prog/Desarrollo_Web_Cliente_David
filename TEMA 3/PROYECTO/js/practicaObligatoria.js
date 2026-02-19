const comerciales = [
  "Carmen Gómez",
  "Lucía Gil",
  "Andrés Martínez",
  "Antonio Salinas",
];

const clientes = [
  [
    "Alimentación Daniel",
    "Cash El Puerto",
    "Ultramarinos Claudia",
    "Supermercado Nazareno",
    "Alimentación Guzmán",
    "Supermercado Superprecio",
    "Kiosko La Espera",
    "M&B Alimentación",
    "Ultramarinos Vistabella",
  ],
  [
    "Ultramarinos La Delicia",
    "Supermercado La Esquinita",
    "Alimentación Gómez",
    "Supermercado El Veloz",
    "Kiosko 24h Desavío",
    "Tienda La Manchega",
    "Ultramarinos Tajo",
    "Alimentación Víctor",
  ],
  [
    "Alimentación Millán",
    "Supermercado La Guinda",
    "Kiosko Callejón",
    "Tienda Cantero",
    "Ultramarinos Mérida",
    "Alimentación Moreno",
    "Cash El Hostelero",
  ],
  [
    "Kiosko La Lumbre",
    "Tienda Abad",
    "Ultramarinos Hernández",
    "Alimentación Cervantes",
    "Cash El Panal",
    "CyR Alimentación",
    "Supermercado Los Mosqueteros",
    "Alimentación Carpanta",
    "Supermercado El Percebe",
  ],
];

const categorias = ["Aceite", "Encurtidos", "Salsas"];

const catalogo = new Catalogo();
const gestor = new Gestor();

function cargaDatosIniciales() {
  catalogo.addProducto(1, "Aceite Oliva Virgen Extra 1l (Caja 20)", 178.15, 0);
  catalogo.addProducto(2, "Aceite Oliva Virgen Extra 700ml (Caja 30)", 208.5, 0);
  catalogo.addProducto(3, "Aceite Oliva Virgen Extra 5l (Caja 6)", 247.5, 0);
  catalogo.addProducto(4, "Aceite Oliva 1l (Caja 20)", 109.25, 0);

  catalogo.addProducto(5, "Aceituna Gordal 340gr (Caja de 50)", 180.75, 1);
  catalogo.addProducto(6, "Aceituna Gordal deshuesada 350gr (Caja de 50)", 205.45, 1);
  catalogo.addProducto(7, "Aceituna Manzanilla 250 gr (Caja de 50)", 124.85, 1);
  catalogo.addProducto(8, "Aceituna Manzanilla deshuesada 250 gr (Caja de 50)", 141.35, 1);
  catalogo.addProducto(9, "Aceituna Negra 350gr (Caja de 50)", 87.5, 1);
  catalogo.addProducto(10, "Aceituna Negra deshuesada 350gr (Caja de 50)", 99.35, 1);

  catalogo.addProducto(11, "Mayonesa 350gr (Caja de 50)", 124.45, 2);
  catalogo.addProducto(12, "Mayonesa 1Kg (Caja de 30)", 178.65, 2);
  catalogo.addProducto(13, "Salsa Cocktail 350gr (Caja de 50)", 99.65, 2);
  catalogo.addProducto(14, "Salsa Gaucha 350gr (Caja de 50)", 124.85, 2);
  catalogo.addProducto(15, "Salsa Alioli 350 gr (Caja de 50)", 113.75, 2);
  catalogo.addProducto(16, "Salsa Barbacoa 500gr (Caja de 30)", 67.5, 2);
}

document.addEventListener("DOMContentLoaded", inicio);

function inicio() {
  cargaDatosIniciales();
  inicializarGestor();
  prepararUI();
  pintarClientes();
  cargarSelectCategorias();
  cargarSelectProductosPorCategoria();
  pintarPedido();
}

function inicializarGestor() {
  gestor.categorias = categorias.slice();
  gestor.comerciales = comerciales.slice();

  gestor.clientes = clientes.map((cartera) => cartera.map((nombre) => new Cliente(nombre)));
  gestor.pedidos = clientes.map((cartera) => cartera.map(() => []));

  gestor.comercialActual = 0;
  gestor.clienteActual = 0;
}

function prepararUI() {
  const selComerciales = document.forms.frmComercial.comerciales;
  const selCategorias = document.forms.frmControles.categorias;
  const selProductos = document.forms.frmControles.productos;

  cargarSelect(selComerciales, gestor.comerciales, (i) => i, (txt) => txt);
  selComerciales.selectedIndex = gestor.comercialActual;

  cargarSelect(selCategorias, gestor.categorias, (_, idx) => idx, (txt) => txt);
  selCategorias.selectedIndex = 0;

  selComerciales.onchange = function () {
    gestor.comercialActual = this.selectedIndex;
    gestor.clienteActual = 0;
    pintarClientes();
    cargarSelectProductosPorCategoria();
    pintarPedido();
  };

  selCategorias.onchange = function () {
    cargarSelectProductosPorCategoria();
    pintarPedido();
  };

  selProductos.onchange = function () {
    pintarPedido();
  };

  prepararTeclado();

  document.addEventListener("keydown", function (e) {
    if (e.key >= "1" && e.key <= "9") {
      insertarProductoEnPedido(Number(e.key));
    }
  });
}

function prepararTeclado() {
  const teclado = document.getElementById("teclado");
  const teclas = teclado.getElementsByClassName("tecla");

  for (let i = 0; i < teclas.length; i++) {
    teclas[i].onclick = function () {
      const uds = Number(this.value);
      insertarProductoEnPedido(uds);
    };
  }
}

function cargarSelectCategorias() {
  document.forms.frmControles.categorias.selectedIndex = 0;
}

function cargarSelectProductosPorCategoria() {
  const selCategorias = document.forms.frmControles.categorias;
  const selProductos = document.forms.frmControles.productos;
  const idCat = Number(selCategorias.value);

  const productosCat = catalogo.productos.filter((p) => p.idCategoria === idCat);

  cargarSelect(selProductos, productosCat, (p) => p.idProducto, (p) => p.nombreProducto);
  selProductos.selectedIndex = 0;
}

function cargarSelect(select, array, fnValue, fnText) {
  while (select.options.length > 0) select.remove(0);

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const opt = document.createElement("option");
    opt.value = fnValue(item, i);
    opt.textContent = fnText(item, i);
    select.appendChild(opt);
  }
}

function pintarClientes() {
  const panel = document.getElementById("clientes");

  const existentes = panel.querySelectorAll(".cliente");
  for (let i = 0; i < existentes.length; i++) existentes[i].remove();

  const cartera = gestor.clientes[gestor.comercialActual];

  for (let i = 0; i < cartera.length; i++) {
    const c = cartera[i];

    const tienePedido = gestor.pedidos[gestor.comercialActual][i].length > 0;
    c.cuentaAbierta = tienePedido;

    const div = document.createElement("div");
    div.classList.add("cliente");
    div.classList.add(c.cuentaAbierta ? "pendiente" : "pagado");
    div.textContent = c.nombre;

    div.onclick = function () {
      gestor.clienteActual = i;
      pintarPedido();
    };

    panel.appendChild(div);
  }
}

function pintarPedido() {
  const panel = document.getElementById("pedido");
  while (panel.firstChild) panel.removeChild(panel.firstChild);

  const cliente = getClienteActual();
  const lineas = getLineasPedidoActual();

  lineas.sort((a, b) => a.idProducto - b.idProducto);

  const h1 = document.createElement("h1");
  h1.textContent = "Pedido";
  panel.appendChild(h1);

  const hCliente = document.createElement("h3");
  hCliente.textContent = "Cliente " + cliente.nombre;
  panel.appendChild(hCliente);

  const total = calcularTotalPedido(lineas);
  const hTotal = document.createElement("h3");
  hTotal.textContent = "TOTAL: " + total.toFixed(2) + "€";
  panel.appendChild(hTotal);

  const btnCobrado = document.createElement("button");
  btnCobrado.textContent = "PEDIDO ENVIADO Y COBRADO";
  btnCobrado.disabled = lineas.length === 0;
  btnCobrado.onclick = function () {
    vaciarPedidoActual();
  };
  panel.appendChild(btnCobrado);

  const tabla = document.createElement("table");
  const thead = document.createElement("thead");
  const trh = document.createElement("tr");

  const th0 = document.createElement("th"); th0.textContent = "Modificar";
  const th1 = document.createElement("th"); th1.textContent = "Uds.";
  const th2 = document.createElement("th"); th2.textContent = "Id.";
  const th3 = document.createElement("th"); th3.textContent = "Producto";
  const th4 = document.createElement("th"); th4.textContent = "Precio";

  trh.appendChild(th0);
  trh.appendChild(th1);
  trh.appendChild(th2);
  trh.appendChild(th3);
  trh.appendChild(th4);

  thead.appendChild(trh);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (let i = 0; i < lineas.length; i++) {
    const lp = lineas[i];
    const prod = catalogo.productos.find((p) => p.idProducto === lp.idProducto);

    const tr = document.createElement("tr");

    const tdMod = document.createElement("td");

    const btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.onclick = function () {
      lp.unidades += 1;
      actualizarEstadoClienteActual();
      pintarClientes();
      pintarPedido();
    };

    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.onclick = function () {
      lp.unidades -= 1;

      if (lp.unidades <= 0) {
        lineas.splice(i, 1);
      }

      actualizarEstadoClienteActual();
      pintarClientes();
      pintarPedido();
    };

    tdMod.appendChild(btnMas);
    tdMod.appendChild(btnMenos);

    const tdUds = document.createElement("td");
    tdUds.textContent = String(lp.unidades);

    const tdId = document.createElement("td");
    tdId.textContent = String(lp.idProducto);

    const tdProd = document.createElement("td");
    if (prod) {
      tdProd.textContent =
        prod.nombreProducto + " (ud: " + prod.precioUnidad.toFixed(2) + "€)";
    } else {
      tdProd.textContent = "Producto no encontrado";
    }

    const tdPrecio = document.createElement("td");
    const subtotal = prod ? lp.unidades * prod.precioUnidad : 0;
    tdPrecio.textContent = subtotal.toFixed(2);

    tr.appendChild(tdMod);
    tr.appendChild(tdUds);
    tr.appendChild(tdId);
    tr.appendChild(tdProd);
    tr.appendChild(tdPrecio);

    tbody.appendChild(tr);
  }

  tabla.appendChild(tbody);
  panel.appendChild(tabla);
}

function insertarProductoEnPedido(unidades) {
  if (!unidades || unidades <= 0) return;

  const selProductos = document.forms.frmControles.productos;
  if (!selProductos || selProductos.selectedIndex < 0) return;

  const idProducto = Number(selProductos.value);
  const lineas = getLineasPedidoActual();

  let encontrada = false;

  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i].idProducto === idProducto) {
      lineas[i].unidades += unidades;
      encontrada = true;
      break;
    }
  }

  if (!encontrada) {
    lineas.push(new LineaPedido(unidades, idProducto));
  }

  actualizarEstadoClienteActual();
  pintarClientes();
  pintarPedido();
}

function actualizarEstadoClienteActual() {
  const cliente = getClienteActual();
  const lineas = getLineasPedidoActual();
  cliente.cuentaAbierta = lineas.length > 0;
}

function getLineasPedidoActual() {
  return gestor.pedidos[gestor.comercialActual][gestor.clienteActual];
}

function getClienteActual() {
  return gestor.clientes[gestor.comercialActual][gestor.clienteActual];
}

function calcularTotalPedido(lineas) {
  let total = 0;

  for (let i = 0; i < lineas.length; i++) {
    const lp = lineas[i];
    const prod = catalogo.productos.find((p) => p.idProducto === lp.idProducto);
    if (prod) total += lp.unidades * prod.precioUnidad;
  }

  return total;
}

function vaciarPedidoActual() {
  const lineas = getLineasPedidoActual();
  lineas.splice(0, lineas.length);

  actualizarEstadoClienteActual();
  pintarClientes();
  pintarPedido();
}
