class Producto {
  #codigo;
  #nombre;
  #precio;
  constructor(codigo, nombre, precio) {
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#precio = precio;
  }
  get codigo() { return this.#codigo; }
  set codigo(v) { this.#codigo = v; }

  get nombre() { return this.#nombre; }
  set nombre(v) { this.#nombre = v; }

  get precio() { return this.#precio; }
  set precio(v) { this.#precio = v; }

  toHTMLRow() {
    return `<tr><td>${this.codigo}</td>
                <td>${this.nombre}</td>
                <td>${this.precio.toFixed(2)} €</td>`;
  }
}

class Televisor extends Producto {
  #pulgadas;
  #smartTV;
  constructor(codigo, nombre, precio, pulgadas, smartTV) {
    super(codigo, nombre, precio);
    this.#pulgadas = pulgadas;
    this.#smartTV = smartTV;
  }
  get pulgadas() { return this.#pulgadas; }
  set pulgadas(v) { this.#pulgadas = v; }
  get smartTV() { return this.#smartTV; }
  set smartTV(v) { this.#smartTV = v; }

  toHTMLRow() {
    let fila = super.toHTMLRow();
    fila += `<td>${this.pulgadas}"</td><td>${this.smartTV ? "Sí" : "No"}</td></tr>`;
    return fila;
  }
}

class Portatil extends Producto {
  #ramGB;
  #procesador;
  constructor(codigo, nombre, precio, ramGB, procesador) {
    super(codigo, nombre, precio);
    this.#ramGB = ramGB;
    this.#procesador = procesador;
  }
  get ramGB() { return this.#ramGB; }
  set ramGB(v) { this.#ramGB = v; }
  get procesador() { return this.#procesador; }
  set procesador(v) { this.#procesador = v; }

  toHTMLRow() {
    let fila = super.toHTMLRow();
    fila += `<td>${this.ramGB} GB</td><td>${this.procesador}</td></tr>`;
    return fila;
  }
}

class Smartphone extends Producto {
  #almacenamientoGB;
  #cincoG;
  constructor(codigo, nombre, precio, almacenamientoGB, cincoG) {
    super(codigo, nombre, precio);
    this.#almacenamientoGB = almacenamientoGB;
    this.#cincoG = cincoG;
  }
  get almacenamientoGB() { return this.#almacenamientoGB; }
  set almacenamientoGB(v) { this.#almacenamientoGB = v; }
  get cincoG() { return this.#cincoG; }
  set cincoG(v) { this.#cincoG = v; }

  toHTMLRow() {
    let fila = super.toHTMLRow();
    fila += `<td>${this.almacenamientoGB} GB</td><td>${this.cincoG ? "Sí" : "No"}</td></tr>`;
    return fila;
  }
}

class MediaMarkt {
  #productos;
  constructor() {
    this.#productos = [];
  }

  get productos() { return this.#productos; }
  set productos(v) { this.#productos = v; }

  altaProducto(prod) {
    const existe = this.productos.some(p => p.codigo === prod.codigo);
    if (!existe) {
      this.productos.push(prod);
      return true;
    }
    return false;
  }

  buscarProducto(codigo) {
    return this.productos.findIndex(p => p.codigo === codigo);
  }

  actualizarPrecio(codigo, nuevoPrecio) {
    const i = this.buscarProducto(codigo);
    if (i < 0) return "Producto no registrado";
    if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) return "Precio inválido";
    const anterior = this.productos[i].precio;
    this.productos[i].precio = nuevoPrecio;
    return `Correcto, precio actualizado de ${anterior.toFixed(2)} € a ${nuevoPrecio.toFixed(2)} €`;
  }

  listadoTelevisores(minPulgadas) {
    const lista = this.productos
      .filter(p => p instanceof Televisor && p.pulgadas >= minPulgadas)
      .sort((a, b) => b.pulgadas - a.pulgadas);

    let out = "<table border='1'><thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Pulgadas</th><th>Smart TV</th></tr></thead><tbody>";
    for (const tv of lista) { out += tv.toHTMLRow(); }
    out += "</tbody></table>";
    return out;
  }

  listadoPortatiles(minRAM) {
    const lista = this.productos
      .filter(p => p instanceof Portatil && p.ramGB >= minRAM)
      .sort((a, b) => b.ramGB - a.ramGB);

    let out = "<table border='1'><thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>RAM</th><th>Procesador</th></tr></thead><tbody>";
    for (const pt of lista) { out += pt.toHTMLRow(); }
    out += "</tbody></table>";
    return out;
  }

  totalProductosPromocion() {
    let contador = 0;
    for (const p of this.productos) {
      if (p instanceof Televisor && p.smartTV && p.pulgadas >= 55 && p.precio < 900) {
        contador++;
      } else if (p instanceof Portatil && p.ramGB >= 16 && p.precio < 1200) {
        contador++;
      } else if (p instanceof Smartphone && p.cincoG && p.almacenamientoGB >= 128 && p.precio < 800) {
        contador++;
      }
    }
    return contador;
  }

  siguienteCodigo() {
    if (this.productos.length === 0) return 1;
    return this.productos[this.productos.length - 1].codigo + 1;
  }
}
