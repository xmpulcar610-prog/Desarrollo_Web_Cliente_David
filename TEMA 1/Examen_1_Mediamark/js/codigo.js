let tienda = new MediaMarkt();

datosIniciales();

function datosIniciales() {
  tienda.altaProducto(new Televisor(tienda.siguienteCodigo(), "Samsung QLED 55", 799, 55, true));
  tienda.altaProducto(new Televisor(tienda.siguienteCodigo(), "LG OLED 65", 1499, 65, true));
  tienda.altaProducto(new Televisor(tienda.siguienteCodigo(), "Hisense 50", 399, 50, false));
  tienda.altaProducto(new Portatil(tienda.siguienteCodigo(), "HP Pavilion 15", 899, 16, "Intel i7"));
  tienda.altaProducto(new Portatil(tienda.siguienteCodigo(), "Lenovo IdeaPad 3", 499, 8, "Intel i5"));
  tienda.altaProducto(new Smartphone(tienda.siguienteCodigo(), "Xiaomi 12 Lite", 349, 128, true));
  tienda.altaProducto(new Smartphone(tienda.siguienteCodigo(), "iPhone 14", 999, 128, true));
  tienda.altaProducto(new Portatil(tienda.siguienteCodigo(), "MacBook Air", 1199, 8, "M2"));
  tienda.altaProducto(new Televisor(tienda.siguienteCodigo(), "Sony Bravia 75", 1899, 75, true));
}

// Gestión de formularios (mismo patrón que el examen original)
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();
  switch (sFormularioVisible) {
    case "frmAltaProducto":
      frmAltaProducto.style.display = "block"; break;
    case "frmActualizarPrecio":
      frmActualizarPrecio.style.display = "block"; break;
    case "frmListadoTelevisores":
      frmListadoTelevisores.style.display = "block"; break;
    case "frmListadoPortatiles":
      frmListadoPortatiles.style.display = "block"; break;
    case "TotalPromocion":
      alert("Hay " + tienda.totalProductosPromocion() + " productos en promoción");
      break;
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");
  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

// Alta producto
function aceptarAltaProducto() {
  let sNombre = frmAltaProducto.txtNombre.value.trim();
  let fPrecio = parseFloat(frmAltaProducto.txtPrecio.value.trim());
  let sTipo = frmAltaProducto.rbtTipo.value;
  let oProd;

  if (sNombre.length === 0 || isNaN(fPrecio) || fPrecio <= 0) {
    alert("Faltan datos por rellenar o precio inválido");
    return;
  }

  let codigo = tienda.siguienteCodigo();

  if (sTipo === "televisor") {
    let pulgadas = parseInt(frmAltaProducto.txtPulgadas.value.trim());
    let smart = frmAltaProducto.rbtSmart.value === "S";
    if (isNaN(pulgadas)) { alert("Indique pulgadas válidas"); return; }
    oProd = new Televisor(codigo, sNombre, fPrecio, pulgadas, smart);
  } else if (sTipo === "portatil") {
    let ram = parseInt(frmAltaProducto.txtRAM.value.trim());
    let cpu = frmAltaProducto.txtCPU.value.trim();
    if (isNaN(ram) || cpu.length === 0) { alert("Complete RAM y procesador"); return; }
    oProd = new Portatil(codigo, sNombre, fPrecio, ram, cpu);
  } else {
    let almacen = parseInt(frmAltaProducto.txtAlmacenamiento.value.trim());
    let cincoG = frmAltaProducto.rbt5G.value === "S";
    if (isNaN(almacen)) { alert("Indique almacenamiento válido"); return; }
    oProd = new Smartphone(codigo, sNombre, fPrecio, almacen, cincoG);
  }

    if (tienda.altaProducto(oProd)) {
      alert("Producto registrado OK");
      frmAltaProducto.reset();
      frmAltaProducto.style.display = "none";
    } else {
      alert("Producto registrado previamente");
    }
}

// Actualizar precio
function aceptarActualizarPrecio() {
  let iCodigo = parseInt(frmActualizarPrecio.txtCodigoActualizar.value.trim());
  let fPrecio = parseFloat(frmActualizarPrecio.txtNuevoPrecio.value.trim());

  if (isNaN(iCodigo) || isNaN(fPrecio)) {
    alert("Faltan datos por rellenar");
    return;
  }
  let msg = tienda.actualizarPrecio(iCodigo, fPrecio);
  alert(msg);
  if (msg.startsWith("Correcto")) {
    frmActualizarPrecio.reset();
    frmActualizarPrecio.style.display = "none";
  }
}

// Listado televisores
function aceptarListadoTelevisores() {
  let minPulgadas = parseInt(frmListadoTelevisores.txtPulgadasMinimas.value.trim());
  if (isNaN(minPulgadas)) { alert("Indique un número de pulgadas"); return; }

  let listado = tienda.listadoTelevisores(minPulgadas);
  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write(`<h1>Listado de televisores de al menos ${minPulgadas}"</h1>`);
  oVentana.document.write(listado);
  oVentana.document.close();
  oVentana.document.title = "Listado televisores";
  frmListadoTelevisores.reset();
  frmListadoTelevisores.style.display = "none";
}

// Listado portátiles
function aceptarListadoPortatiles() {
  let minRAM = parseInt(frmListadoPortatiles.txtRamMinima.value.trim());
  if (isNaN(minRAM)) { alert("Indique una RAM mínima"); return; }

  let listado = tienda.listadoPortatiles(minRAM);
  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write(`<h1>Listado de portátiles con al menos ${minRAM} GB de RAM</h1>`);
  oVentana.document.write(listado);
  oVentana.document.close();
  oVentana.document.title = "Listado portátiles";
  frmListadoPortatiles.reset();
  frmListadoPortatiles.style.display = "none";
}
