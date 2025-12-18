class Producto {
  constructor(idProducto, nombreProducto, precioUnidad, idCategoria) 
  {
    this.idProducto = idProducto;
    this.nombreProducto = nombreProducto;
    this.precioUnidad = precioUnidad;
    this.idCategoria = idCategoria;
  }
}

class Catalogo {
  constructor() {
    this.productos = [];
  }

  addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) 
  {
    const p = new Producto(idProducto, nombreProducto, precioUnidad,idCategoria);
    this.productos.push(p);
  }
}

class LineaPedido {
  constructor(unidades, idProducto) 
    {
      this.unidades = unidades;
      this.idProducto = idProducto;
    }
  }

class Cliente {
  constructor(nombre) 
    {
      this.nombre = nombre;
      this.cuentaAbierta = false;
    }
  }

class Gestor {
  constructor() {
    this.categorias = [];
    this.comerciales = [];
    this.clientes = [];
    this.comercialActual = 0;
    this.clienteActual = 0;
    this.pedidos = [];
  }
}

