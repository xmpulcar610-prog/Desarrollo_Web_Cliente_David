let shop = new Tienda();

datosIniciales();

function datosIniciales(){
  // Clientes
  shop.altaCliente(new Cliente("55555555E","María Ramos","600555555"));
  shop.altaCliente(new Cliente("66666666F","Juan Torres","600666666"));

  // Artículos
  let c;
  c = shop.siguienteCodigoArticulo();
  shop.altaArticulo(new Electrodomestico(c, "Lavadora 8kg", "Bosch", 399, 4, "A++", 36));
  c = shop.siguienteCodigoArticulo();
  shop.altaArticulo(new Electrodomestico(c, "Frigorífico Combi", "Balay", 529, 3, "A+", 24));
  c = shop.siguienteCodigoArticulo();
  shop.altaArticulo(new Gadget(c, "Auriculares BT", "Sony", 59, 20, "Android/iOS", 1200));
  c = shop.siguienteCodigoArticulo();
  shop.altaArticulo(new Gadget(c, "PowerBank 20k", "Xiaomi", 29, 50, "Universal", 20000));
}

function gestionFormularios(id){
  ocultarTodos();
  switch(id){
    case "frmAltaCliente": frmAltaCliente.style.display="block"; break;
    case "frmAltaArticulo": frmAltaArticulo.style.display="block"; break;
    case "frmCrearPedido": frmCrearPedido.style.display="block"; break;
    case "frmAddLinea": frmAddLinea.style.display="block"; break;
    case "frmAplicarCupon": frmAplicarCupon.style.display="block"; break;
    case "frmCerrarPedido": frmCerrarPedido.style.display="block"; break;
    case "frmListadoStock": frmListadoStock.style.display="block"; break;
    case "frmBuscarMarca": frmBuscarMarca.style.display="block"; break;
    case "TotalPedidosCerrados": alert("Pedidos cerrados: " + shop.totalPedidosCerrados()); break;
  }
}
function ocultarTodos(){
  const forms = document.querySelectorAll("form");
  for(const f of forms){ f.style.display="none"; }
}

// Alta cliente
function aceptarAltaCliente(){
  const dni = frmAltaCliente.txtDNI.value.trim();
  const nombre = frmAltaCliente.txtNombre.value.trim();
  const tel = frmAltaCliente.txtTelefono.value.trim();
  if(!dni || !nombre || !tel){ alert("Completa todos los campos"); return; }
  const ok = shop.altaCliente(new Cliente(dni, nombre, tel));
  alert(ok? "Cliente registrado OK" : "El cliente ya existe");
  if(ok){ frmAltaCliente.reset(); frmAltaCliente.style.display="none"; }
}

// Alta artículo
function aceptarAltaArticulo(){
  const nombre = frmAltaArticulo.txtNombreArt.value.trim();
  const marca = frmAltaArticulo.txtMarca.value.trim();
  const precio = parseFloat(frmAltaArticulo.txtPrecio.value.trim());
  const stock = parseInt(frmAltaArticulo.txtStock.value.trim());
  const tipo = frmAltaArticulo.rbtTipo.value;
  if(!nombre||!marca||isNaN(precio)||precio<=0||isNaN(stock)||stock<0){
    alert("Datos inválidos"); return;
  }
  const codigo = shop.siguienteCodigoArticulo();
  let art;
  if(tipo==="electrodomestico"){
    const energia = frmAltaArticulo.txtEnergia.value.trim();
    const garantia = parseInt(frmAltaArticulo.txtGarantia.value.trim());
    if(!energia || isNaN(garantia)){ alert("Completa clase energética y garantía"); return; }
    art = new Electrodomestico(codigo, nombre, marca, precio, stock, energia, garantia);
  }else{
    const compat = frmAltaArticulo.txtCompat.value.trim();
    const bat = parseInt(frmAltaArticulo.txtBateria.value.trim());
    if(!compat || isNaN(bat)){ alert("Completa compatibilidad y batería"); return; }
    art = new Gadget(codigo, nombre, marca, precio, stock, compat, bat);
  }
  const ok = shop.altaArticulo(art);
  alert(ok? "Artículo registrado OK (código "+codigo+")" : "Ya existe un artículo con ese nombre y marca");
  if(ok){ frmAltaArticulo.reset(); frmAltaArticulo.style.display="none"; }
}

// Crear pedido
function aceptarCrearPedido(){
  const dni = frmCrearPedido.txtDNIPedido.value.trim();
  if(!dni){ alert("Indica un DNI"); return; }
  const msg = shop.crearPedido(dni);
  alert(msg);
  if(msg.startsWith("Pedido creado")){ frmCrearPedido.reset(); frmCrearPedido.style.display="none"; }
}

// Añadir línea
function aceptarAddLinea(){
  const codP = parseInt(frmAddLinea.txtCodPedido.value.trim());
  const codA = parseInt(frmAddLinea.txtCodArticulo.value.trim());
  const uds = parseInt(frmAddLinea.txtUnidades.value.trim());
  if(isNaN(codP)||isNaN(codA)||isNaN(uds)){ alert("Revisa los datos"); return; }
  const msg = shop.addLineaPedido(codP, codA, uds);
  alert(msg);
  if(msg==="Línea añadida"){ frmAddLinea.reset(); frmAddLinea.style.display="none"; }
}

// Aplicar cupón
function aceptarAplicarCupon(){
  const codP = parseInt(frmAplicarCupon.txtCodPedidoCupon.value.trim());
  const cup = frmAplicarCupon.txtCupon.value.trim();
  if(isNaN(codP) || !cup){ alert("Completa los datos"); return; }
  const msg = shop.aplicarCupon(codP, cup);
  alert(msg);
  if(msg==="Cupón aplicado"){ frmAplicarCupon.reset(); frmAplicarCupon.style.display="none"; }
}

// Cerrar pedido
function aceptarCerrarPedido(){
  const codP = parseInt(frmCerrarPedido.txtCodPedidoCerrar.value.trim());
  if(isNaN(codP)){ alert("Código inválido"); return; }
  const msg = shop.cerrarPedido(codP);
  alert(msg);
  if(msg.startsWith("Pedido cerrado")){ frmCerrarPedido.reset(); frmCerrarPedido.style.display="none"; }
}

// Listado stock bajo
function aceptarListadoStock(){
  const umbral = parseInt(frmListadoStock.txtUmbral.value.trim());
  if(isNaN(umbral)){ alert("Indica un umbral"); return; }
  const html = shop.listadoStockBajo(umbral);
  const w = open("", "_blank", "");
  w.document.open();
  w.document.write(`<h1>Artículos con stock &le; ${umbral}</h1>`);
  w.document.write(html);
  w.document.close();
  w.document.title = "Stock bajo";
}

// Buscar por marca
function aceptarBuscarMarca(){
  const marca = frmBuscarMarca.txtMarcaBuscar.value.trim();
  if(!marca){ alert("Indica una marca"); return; }
  const html = shop.buscarPorMarca(marca);
  const w = open("", "_blank", "");
  w.document.open();
  w.document.write(`<h1>Artículos de la marca: ${marca}</h1>`);
  w.document.write(html);
  w.document.close();
  w.document.title = "Buscar por marca";
}
