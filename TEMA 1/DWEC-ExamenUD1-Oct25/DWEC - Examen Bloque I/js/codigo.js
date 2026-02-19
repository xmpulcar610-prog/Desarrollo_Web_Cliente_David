let tienda = new Almacen();

datosIniciales();

function datosIniciales() {}  

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaCatalogo":
      frmAltaCatalogo.style.display = "block";
      break;
    case "frmEntradaStock":
      frmEntradaStock.style.display = "block";
      break;
    case "frmSalidaStock":
      frmSalidaStock.style.display = "block";
      break;
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

function aceptarAltaCatalogo() 
  {
      sNombre = frmAltaCatalogo.txtNombre.value.trim();
      fPrecio = parseFloat(frmAltaCatalogo.txtPrecio.value.trim());
      sTipo = frmAltaCatalogo.rbtElectrodomestico.value;
      let oProd;

      if (sNombre.length === 0 || isNaN(fPrecio) || fPrecio <= 0) 
        {
          alert("Faltan datos por rellenar o precio inválido");
          return;
        }

      if (sTipo === "TV") 
        {
            let pulgadas = parseInt(frmAltaCatalogo.txtPulgadas.value.trim());
            let fullHD = frmAltaProducto.rbtFullHD.value === "S";
            if (isNaN(pulgadas)) 
              { 
                alert("Indique pulgadas válidas"); 
                return; 
              }
            oProd = new Televisor(sNombre, fPrecio, pulgadas, fullHD);
        } 
      
      else
        {
            let carga = parseInt(frmAltaCatalogo.txtCarga.value.trim());
            if (isNaN(carga)) 
              { 
                alert("Indique la carga válida"); 
                return; 
              }
            oProd = new Lavadora(sNombre, fPrecio, carga);
        }
      
      if (tienda.altaProducto(oProd)) 
        {
          alert("Electrodoméstico registrado correctamente");
          frmAltaCatalogo.reset();
          frmAltaCatalogo.style.display = "none";
        } 
      else 
        {
          alert("NO se pudo registrar este electrodomestico");
        }
    }

function aceptarEntradaStock() 
  {
      sNombre = frmEntradaStock.txtNombre.value.trim();
      sUnidades = parseInt(frmEntradaStock.txtUnidades.value);
      let oProd;

      if (sNombre.length === 0 || isNaN(sUnidades) || sUnidades <= 0) 
        {
          alert("Faltan datos por rellenar o precio inválido");
          return;
        }
      
      if (tienda.altaProducto(oProd)) 
        {
          alert("Se han añadido las unidades del electrodomestico correctamente");
          frmEntradaStock.reset();
          frmEntradaStock.style.display = "none";
        } 
      else 
        {
          alert("Unidades de electrodomestico NO añadidas");
        }
  }

function aceptarSalidaStock() 
  {
      sNombre = frmSalidaStock.txtNombre.value.trim();
      sUnidades = parseInt(frmSalidaStock.txtUnidades.value);
      let oProd;

      if (sNombre.length === 0 || isNaN(sUnidades) || sUnidades <= 0) 
        {
          alert("Faltan datos por rellenar o precio inválido");
          return;
        }
        
      if (tienda.altaProducto(oProd)) 
        {
          alert("Eliminado las unidades de electrodomestico correctamente");
          frmSalidaStock.reset();
          frmSalidaStock.style.display = "none";
        } 
      else 
        {
          alert("Unidades de electrodomestico NO eliminadas");
        }
  }

function mostrarListadoCatalogo() 
{
  // Añadir código
}

function mostrarListadoStock() {
  // Añadir código
}

function mostrarTotales() {
  // Añadir código
}
