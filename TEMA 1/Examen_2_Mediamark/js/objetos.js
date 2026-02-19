class Persona 
{
  #dni; #nombre; #telefono;
  constructor(dni, nombre, telefono)
    {
      this.#dni = dni; this.#nombre = nombre; this.#telefono = telefono;
    }
      get dni(){ return this.#dni; } set dni(v){ this.#dni = v; }
      get nombre(){ return this.#nombre; } set nombre(v){ this.#nombre = v; }
      get telefono(){ return this.#telefono; } set telefono(v){ this.#telefono = v; }
}

class Cliente extends Persona{
  #email;
  constructor(dni, nombre, telefono, email){
    super(dni, nombre, telefono); this.#email = email;
  }
  get email(){ return this.#email; } set email(v){ this.#email = v; }
}

class Dispositivo{
  #serie; #marca; #modelo; #garantia;
  constructor(serie, marca, modelo, garantia){
    this.#serie = serie; this.#marca = marca; this.#modelo = modelo; this.#garantia = garantia;
  }
  get serie(){ return this.#serie; } set serie(v){ this.#serie = v; }
  get marca(){ return this.#marca; } set marca(v){ this.#marca = v; }
  get modelo(){ return this.#modelo; } set modelo(v){ this.#modelo = v; }
  get garantia(){ return this.#garantia; } set garantia(v){ this.#garantia = v; }

  toHTMLRow(){
    return `<tr><td>${this.serie}</td><td>${this.marca}</td><td>${this.modelo}</td><td>${this.garantia ? "Sí":"No"}</td></tr>`;
  }
}

class Reparacion{
  #codigo; #serie; #dniCliente; #fechaEntrada; #estado; #tecnico; #coste;
  constructor(codigo, serie, dniCliente, fechaEntrada){
    this.#codigo = codigo; this.#serie = serie; this.#dniCliente = dniCliente;
    this.#fechaEntrada = fechaEntrada; this.#estado = "abierta"; this.#tecnico = ""; this.#coste = 0;
  }
  get codigo(){ return this.#codigo; }
  get serie(){ return this.#serie; }
  get dniCliente(){ return this.#dniCliente; }
  get fechaEntrada(){ return this.#fechaEntrada; }
  get estado(){ return this.#estado; } set estado(v){ this.#estado = v; }
  get tecnico(){ return this.#tecnico; } set tecnico(v){ this.#tecnico = v; }
  get coste(){ return this.#coste; } set coste(v){ this.#coste = v; }

  toHTMLRow(){
    return `<tr><td>${this.codigo}</td><td>${this.serie}</td><td>${this.dniCliente}</td><td>${this.fechaEntrada}</td><td>${this.estado}</td><td>${this.tecnico||"-"}</td><td>${this.coste.toFixed(2)} €</td></tr>`;
  }
}

class ServicioTecnico{
  #clientes; #dispositivos; #reparaciones;
  constructor(){ this.#clientes = []; this.#dispositivos = []; this.#reparaciones = []; }
  get clientes(){ return this.#clientes; }
  get dispositivos(){ return this.#dispositivos; }
  get reparaciones(){ return this.#reparaciones; }

  altaCliente(cliente){
    const existe = this.clientes.some(c => c.dni === cliente.dni);
    if(existe) return false; this.clientes.push(cliente); return true;
  }
  registrarDispositivo(disp){
    const existe = this.dispositivos.some(d => d.serie === disp.serie);
    if(existe) return false; this.dispositivos.push(disp); return true;
  }
  abrirReparacion(serie, dniCliente){
    const okSerie = this.dispositivos.some(d => d.serie === serie);
    const okCliente = this.clientes.some(c => c.dni === dniCliente);
    if(!okSerie) return "Dispositivo no registrado";
    if(!okCliente) return "Cliente no registrado";
    const codigo = this.siguienteCodigo();
    const rep = new Reparacion(codigo, serie, dniCliente, new Date().toISOString().slice(0,10));
    this.reparaciones.push(rep);
    return "Reparación abierta con código " + codigo;
  }
  asignarTecnico(codigo, tecnico){
    const i = this.reparaciones.findIndex(r => r.codigo == codigo);
    if(i<0) return "Reparación no encontrada";
    this.reparaciones[i].tecnico = tecnico;
    if(this.reparaciones[i].estado === "abierta") this.reparaciones[i].estado = "diagnostico";
    return "Técnico asignado";
  }
  actualizarEstado(codigo, nuevoEstado){
    const i = this.reparaciones.findIndex(r => r.codigo == codigo);
    if(i<0) return "Reparación no encontrada";
    this.reparaciones[i].estado = nuevoEstado;
    return "Estado actualizado";
  }
  cerrarReparacion(codigo, coste){
    const i = this.reparaciones.findIndex(r => r.codigo == codigo);
    if(i<0) return "Reparación no encontrada";
    this.reparaciones[i].estado = "cerrada";
    this.reparaciones[i].coste = coste||0;
    return "Reparación cerrada";
  }
  listadoPorEstado(estado){
    const lista = this.reparaciones.filter(r => r.estado === estado);
    let html = "<table border='1'><thead><tr><th>Código</th><th>Serie</th><th>DNI Cliente</th><th>Fecha</th><th>Estado</th><th>Técnico</th><th>Coste</th></tr></thead><tbody>";
    for(const r of lista){ html += r.toHTMLRow(); }
    html += "</tbody></table>"; return html;
  }
  totalReparacionesEnGarantia(){
    let count = 0;
    for(const r of this.reparaciones){
      const disp = this.dispositivos.find(d => d.serie === r.serie);
      if(disp && disp.garantia && r.estado !== "cerrada"){ count++; }
    }
    return count;
  }
  siguienteCodigo(){
    if(this.reparaciones.length===0) return 1;
    return this.reparaciones[this.reparaciones.length-1].codigo + 1;
  }
}
