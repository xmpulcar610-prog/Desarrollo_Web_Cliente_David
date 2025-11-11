let techcare = new ServicioTecnico();

datosIniciales();

function datosIniciales(){
  techcare.altaCliente(new Cliente("11111111A","Lucía Gómez","600111111","lucia@mail.com"));
  techcare.altaCliente(new Cliente("22222222B","Pedro Ruiz","600222222","pedro@mail.com"));

  techcare.registrarDispositivo(new Dispositivo("SN-A1","Apple","iPhone 13",true));
  techcare.registrarDispositivo(new Dispositivo("SN-S1","Samsung","Galaxy S22",false));
  techcare.registrarDispositivo(new Dispositivo("SN-L1","Lenovo","Yoga 7",true));

  techcare.abrirReparacion("SN-A1","11111111A");
  techcare.asignarTecnico(1,"Marta");
  techcare.actualizarEstado(1,"en_proceso");

  techcare.abrirReparacion("SN-L1","22222222B");
}

function gestionFormularios(id){
  ocultarTodos();
  switch(id){
    case "frmAltaCliente": frmAltaCliente.style.display="block"; break;
    case "frmRegistrarDispositivo": frmRegistrarDispositivo.style.display="block"; break;
    case "frmAbrirReparacion": frmAbrirReparacion.style.display="block"; break;
    case "frmActualizarEstado": frmActualizarEstado.style.display="block"; break;
    case "frmListadoEstado": frmListadoEstado.style.display="block"; break;
    case "TotalGarantia": alert("Reparaciones en garantía abiertas: " + techcare.totalReparacionesEnGarantia()); break;
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
  const email = frmAltaCliente.txtEmail.value.trim();
  if(!dni || !nombre || !tel || !email){ alert("Completa todos los campos"); return; }
  const ok = techcare.altaCliente(new Cliente(dni, nombre, tel, email));
  alert(ok? "Cliente registrado OK" : "Cliente ya existe");
  if(ok){ frmAltaCliente.reset(); frmAltaCliente.style.display="none"; }
}

// Registrar dispositivo
function aceptarRegistrarDispositivo(){
  const serie = frmRegistrarDispositivo.txtSerie.value.trim();
  const marca = frmRegistrarDispositivo.txtMarca.value.trim();
  const modelo = frmRegistrarDispositivo.txtModelo.value.trim();
  const garantia = frmRegistrarDispositivo.rbtGarantia.value === "S";
  if(!serie || !marca || !modelo){ alert("Completa todos los campos"); return; }
  const ok = techcare.registrarDispositivo(new Dispositivo(serie, marca, modelo, garantia));
  alert(ok? "Dispositivo registrado OK" : "El nº de serie ya existe");
  if(ok){ frmRegistrarDispositivo.reset(); frmRegistrarDispositivo.style.display="none"; }
}

// Abrir reparación
function aceptarAbrirReparacion(){
  const serie = frmAbrirReparacion.txtSerieRep.value.trim();
  const dni = frmAbrirReparacion.txtDNIRep.value.trim();
  if(!serie || !dni){ alert("Completa todos los campos"); return; }
  const msg = techcare.abrirReparacion(serie, dni);
  alert(msg);
  if(msg.includes("Reparación abierta")){ frmAbrirReparacion.reset(); frmAbrirReparacion.style.display="none"; }
}

// Actualizar estado / técnico / cierre
function aceptarActualizarEstado(){
  const cod = parseInt(frmActualizarEstado.txtCodRep.value.trim());
  const est = frmActualizarEstado.selEstado.value;
  const tec = frmActualizarEstado.txtTecnico.value.trim();
  const coste = parseFloat(frmActualizarEstado.txtCoste.value.trim());

  if(isNaN(cod)){ alert("Código inválido"); return; }
  if(tec){ alert(techcare.asignarTecnico(cod, tec)); }
  alert(techcare.actualizarEstado(cod, est));
  if(est === "cerrada"){
    const msg = techcare.cerrarReparacion(cod, isNaN(coste)?0:coste);
    alert(msg);
  }
  frmActualizarEstado.reset(); frmActualizarEstado.style.display="none";
}

// Listado por estado
function aceptarListadoEstado(){
  const est = frmListadoEstado.selEstadoListado.value;
  const html = techcare.listadoPorEstado(est);
  const w = open("","_blank","");
  w.document.open();
  w.document.write(`<h1>Listado de reparaciones – Estado: ${est}</h1>`);
  w.document.write(html);
  w.document.close();
  w.document.title = "Listado reparaciones";
}
