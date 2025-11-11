class Articulo{
  #codigo; 
  #nombre; 
  #marca; 
  #precio; 
  #stock;
  constructor(codigo, nombre, marca, precio, stock){
    this.#codigo=codigo; 
    this.#nombre=nombre; 
    this.#marca=marca; 
    this.#precio=precio; 
    this.#stock=stock;
  }
  get codigo(){return this.#codigo;}
  get nombre(){return this.#nombre;}
  get marca(){return this.#marca;}
  get precio(){return this.#precio;} 
    set precio(v){this.#precio=v;}
  get stock(){return this.#stock;} 
    set stock(v){this.#stock=v;}

  toHTMLRow(extraCols=""){
    return `<tr><td>${this.codigo}</td>
                <td>${this.nombre}</td>
                <td>${this.marca}</td>
                <td>${this.precio.toFixed(2)} €</td>
                <td>${this.stock}</td>${extraCols}</tr>`;
  }
}

class Electrodomestico extends Articulo{
  #claseEnergetica; 
  #garantiaMeses;
  constructor(codigo, nombre, marca, precio, stock, claseEnergetica, garantiaMeses)
  {
    super(codigo, nombre, marca, precio, stock);
    this.#claseEnergetica=claseEnergetica; 
    this.#garantiaMeses=garantiaMeses;
  }
  get claseEnergetica(){return this.#claseEnergetica;}
  get garantiaMeses(){return this.#garantiaMeses;}

  toHTMLRow(){
    const extra = `<td>${this.claseEnergetica}</td><td>${this.garantiaMeses}</td>`;
    return super.toHTMLRow(extra);
  }
}

class Gadget extends Articulo{
  #compatibilidad; 
  #bateriaMah;
  constructor(codigo, nombre, marca, precio, stock, compatibilidad, bateriaMah){
    super(codigo, nombre, marca, precio, stock);
    this.#compatibilidad=compatibilidad; 
    this.#bateriaMah=bateriaMah;
  }
  get compatibilidad(){return this.#compatibilidad;}
  get bateriaMah(){return this.#bateriaMah;}

  toHTMLRow(){
    const extra = `<td>${this.compatibilidad}</td><td>${this.bateriaMah} mAh</td>`;
    return super.toHTMLRow(extra);
  }
}

class Cliente{
  #dni; 
  #nombre; 
  #telefono;
  constructor(dni, nombre, telefono)
  { 
    this.#dni=dni; 
    this.#nombre=nombre; 
    this.#telefono=telefono; 
  }
  get dni(){return this.#dni;} 
  get nombre(){return this.#nombre;} 
  get telefono(){return this.#telefono;}
}

class Tienda{
  #articulos; 
  #clientes; 
  #pedidos; 
  #sigArt; 
  #sigPed;
  constructor()
  { 
    this.#articulos=[]; 
    this.#clientes=[]; 
    this.#pedidos=[]; 
    this.#sigArt=1; 
    this.#sigPed=1; 
  }
  get articulos(){return this.#articulos;} 
  get clientes(){return this.#clientes;} 
  get pedidos(){return this.#pedidos;}

  altaCliente(c){
    if(this.clientes.some(x=>x.dni===c.dni)) return false; this.clientes.push(c); return true;
  }
  altaArticulo(a){
    if(this.articulos.some(x=>x.nombre===a.nombre && x.marca===a.marca)) return false;
    this.articulos.push(a); return true;
  }
  siguienteCodigoArticulo(){ return this.#sigArt++; }
  siguienteCodigoPedido(){ return this.#sigPed++; }

  crearPedido(dni){
    if(!this.clientes.some(c=>c.dni===dni)) return "Cliente no registrado";
    const codigo = this.siguienteCodigoPedido();
    this.pedidos.push({codigo, dni, lineas:[], cupon:null, estado:"abierto", total:0});
    return "Pedido creado con código " + codigo;
  }
  addLineaPedido(codPedido, codArticulo, unidades){
    const p = this.pedidos.find(p=>p.codigo==codPedido);
    if(!p) return "Pedido no encontrado";
    if(p.estado!=="abierto") return "El pedido no está abierto";
    const a = this.articulos.find(a=>a.codigo==codArticulo);
    if(!a) return "Artículo no encontrado";
    if(isNaN(unidades)||unidades<=0) return "Unidades inválidas";
    if(a.stock < unidades) return "Stock insuficiente";

    a.stock -= unidades;
    const importe = a.precio * unidades;
    p.lineas.push({codigoArticulo:a.codigo, nombre:a.nombre, unidades, pvp:a.precio, importe});
    return "Línea añadida";
  }
  aplicarCupon(codPedido, cupon){
    const p = this.pedidos.find(p=>p.codigo==codPedido);
    if(!p) return "Pedido no encontrado";
    if(p.estado!=="abierto") return "El pedido no está abierto";
    p.cupon = cupon.toUpperCase();
    return "Cupón aplicado";
  }
  cerrarPedido(codPedido){
    const p = this.pedidos.find(p=>p.codigo==codPedido);
    if(!p) return "Pedido no encontrado";
    if(p.estado!=="abierto") return "El pedido no está abierto";
    let base = p.lineas.reduce((s,l)=>s+l.importe,0);
    // IVA 21%
    let total = base * 1.21;

    // Cupones: AHUMOR10 (-10%), ELECTRO20 (-20% solo gadgets), ENVIOFREE (-5€ si total>100)
    if(p.cupon==="AHUMOR10"){
      total *= 0.9;
    }else if(p.cupon==="ELECTRO20"){
      const totalGadgets = p.lineas.reduce((s,l)=>{
        const art = this.articulos.find(a=>a.codigo==l.codigoArticulo);
        return (art instanceof Gadget) ? s + l.importe*1.21 : s;
      },0);
      total -= totalGadgets * 0.2;
    }else if(p.cupon==="ENVIOFREE" && total>100){
      total -= 5;
    }

    p.total = parseFloat(total.toFixed(2));
    p.estado = "cerrado";
    return "Pedido cerrado. Total: " + p.total.toFixed(2) + " €";
  }
  listadoStockBajo(umbral){
    const lista = this.articulos.filter(a=>a.stock <= umbral);
    let head = "<thead><tr><th>Código</th><th>Nombre</th><th>Marca</th><th>Precio</th><th>Stock</th><th>Extra1</th><th>Extra2</th></tr></thead><tbody>";
    let out = "<table border='1'>"+head;
    for(const a of lista){ out += a.toHTMLRow(); }
    out += "</tbody></table>"; return out;
  }
  buscarPorMarca(marca){
    const lista = this.articulos.filter(a=>a.marca.toLowerCase()===marca.toLowerCase());
    let head = "<thead><tr><th>Código</th><th>Nombre</th><th>Marca</th><th>Precio</th><th>Stock</th><th>Extra1</th><th>Extra2</th></tr></thead><tbody>";
    let out = "<table border='1'>"+head;
    for(const a of lista){ out += a.toHTMLRow(); }
    out += "</tbody></table>"; return out;
  }
  totalPedidosCerrados(){
    return this.pedidos.filter(p=>p.estado==="cerrado").length;
  }
}