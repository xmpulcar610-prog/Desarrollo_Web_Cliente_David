// =====================
//   CLASE: CLIENTE
// =====================
class Cliente {
  #dniCliente;
  #nombre;
  #apellido1;
  #apellido2;
  #usuario;

  constructor(dniCliente, nombre, apellido1, apellido2) {
    this.#dniCliente = String(dniCliente).trim();
    this.#nombre = String(nombre).trim();
    this.#apellido1 = String(apellido1).trim();
    this.#apellido2 = String(apellido2).trim();
    this.#usuario = this.#generarUsuario();
  }

  #generarUsuario() {
    // inicial nombre + 3 primeras ap1 + 3 primeras ap2 + 3 últimos dígitos del DNI (todo minúsculas)
    const ini = (this.#nombre[0] || "").toLowerCase();
    const a1 = (this.#apellido1.slice(0, 3) || "").toLowerCase();
    const a2 = (this.#apellido2.slice(0, 3) || "").toLowerCase();
    const ult3 = (this.#dniCliente.replace(/\D/g, "") || "").slice(-3);
    return `${ini}${a1}${a2}${ult3}`;
  }

  get dniCliente() { return this.#dniCliente; }
  get nombre() { return this.#nombre; }
  get apellido1() { return this.#apellido1; }
  get apellido2() { return this.#apellido2; }
  get usuario() { return this.#usuario; }

  set nombre(v) { this.#nombre = String(v).trim(); this.#usuario = this.#generarUsuario(); }
  set apellido1(v) { this.#apellido1 = String(v).trim(); this.#usuario = this.#generarUsuario(); }
  set apellido2(v) { this.#apellido2 = String(v).trim(); this.#usuario = this.#generarUsuario(); }

  toHTMLRow() {
    return `<tr>
      <td>${this.dniCliente}</td>
      <td>${this.nombre} ${this.apellido1} ${this.apellido2}</td>
      <td>${this.usuario}</td>
    </tr>`;
  }
}

// =====================
//   ALOJAMIENTO (PADRE)
// =====================
class Alojamiento {
  #idAlojamiento;
  #numPersonas;

  constructor(idAlojamiento, numPersonas) {
    const id = Number(idAlojamiento);
    const plazas = Number(numPersonas);
    if (!Number.isFinite(id) || id <= 0) throw new Error("idAlojamiento inválido.");
    if (!Number.isFinite(plazas) || plazas <= 0) throw new Error("numPersonas inválido.");

    this.#idAlojamiento = id;
    this.#numPersonas = plazas;
  }

  get idAlojamiento() { return this.#idAlojamiento; }
  get numPersonas() { return this.#numPersonas; }
  set numPersonas(v) {
    const n = Number(v);
    if (!Number.isFinite(n) || n <= 0) throw new Error("numPersonas inválido.");
    this.#numPersonas = n;
  }

  // Tipo, desayuno, aparcamiento y dormitorios los añaden las hijas
  toHTMLRow() {
    return `<tr>
      <td>${this.idAlojamiento}</td>
      <td>${this.numPersonas}</td>`;
  }
}

// =====================
//   HABITACIÓN DE HOTEL
// =====================
class HabitacionHotel extends Alojamiento {
  #desayunoIncluido;
  constructor(idAlojamiento, numPersonas, desayunoIncluido = false) {
    super(idAlojamiento, numPersonas);
    this.#desayunoIncluido = Boolean(desayunoIncluido);
  }
  get desayunoIncluido() { return this.#desayunoIncluido; }
  set desayunoIncluido(v) { this.#desayunoIncluido = Boolean(v); }

  toHTMLRow() {
    let base = super.toHTMLRow();
    base += `
      <td>Hotel</td>
      <td>${siNo(this.desayunoIncluido)}</td>
      <td>-</td>
      <td>-</td>
    </tr>`;
    return base;
  }
}

// =====================
//      APARTAMENTO
// =====================
class Apartamento extends Alojamiento {
  #aparcamiento;
  #numDormitorios;

  constructor(idAlojamiento, numPersonas, aparcamiento = false, numDormitorios = 1) {
    super(idAlojamiento, numPersonas);
    this.#aparcamiento = Boolean(aparcamiento);
    const nd = Number(numDormitorios);
    if (!Number.isFinite(nd) || nd <= 0) throw new Error("numDormitorios inválido.");
    this.#numDormitorios = nd;
  }

  get aparcamiento() { return this.#aparcamiento; }
  get numDormitorios() { return this.#numDormitorios; }

  set aparcamiento(v) { this.#aparcamiento = Boolean(v); }
  set numDormitorios(v) {
    const n = Number(v);
    if (!Number.isFinite(n) || n <= 0) throw new Error("numDormitorios inválido.");
    this.#numDormitorios = n;
  }

  toHTMLRow() {
    let base = super.toHTMLRow();
    base += `
      <td>Apartamento</td>
      <td>-</td>
      <td>${siNo(this.aparcamiento)}</td>
      <td>${this.numDormitorios}</td>
    </tr>`;
    return base;
  }
}

// =====================
//        RESERVA
// =====================
class Reserva {
  #idReserva;
  #cliente;        // Cliente
  #fechaInicio;    // Date
  #fechaFin;       // Date
  #alojamientos;   // Alojamiento[]

  constructor(idReserva, cliente, fechaInicio, fechaFin) {
    const id = Number(idReserva);
    if (!Number.isFinite(id) || id <= 0) throw new Error("idReserva inválido.");
    if (!(cliente instanceof Cliente)) throw new Error("cliente debe ser instancia de Cliente.");

    const ini = parseFecha(fechaInicio);
    const fin = parseFecha(fechaFin);
    if (!(ini instanceof Date) || isNaN(ini)) throw new Error("fechaInicio inválida.");
    if (!(fin instanceof Date) || isNaN(fin)) throw new Error("fechaFin inválida.");
    if (fin < ini) throw new Error("La fecha de fin no puede ser anterior a la de inicio.");

    this.#idReserva = id;
    this.#cliente = cliente;
    this.#fechaInicio = ini;
    this.#fechaFin = fin;
    this.#alojamientos = [];
  }

  get idReserva() { return this.#idReserva; }
  get cliente() { return this.#cliente; }
  get fechaInicio() { return this.#fechaInicio; }
  get fechaFin() { return this.#fechaFin; }
  get alojamientos() { return this.#alojamientos; }

  set fechaInicio(v) {
    const f = parseFecha(v);
    if (this.#fechaFin && f > this.#fechaFin) throw new Error("Inicio no puede ser posterior a fin.");
    this.#fechaInicio = f;
  }
  set fechaFin(v) {
    const f = parseFecha(v);
    if (this.#fechaInicio && f < this.#fechaInicio) throw new Error("Fin no puede ser anterior a inicio.");
    this.#fechaFin = f;
  }

  agregarAlojamiento(alojamiento) {
    if (!(alojamiento instanceof Alojamiento)) throw new Error("Debes añadir un Alojamiento válido.");
    // evita duplicar el mismo alojamiento dentro de la misma reserva
    if (this.#alojamientos.some(a => a.idAlojamiento === alojamiento.idAlojamiento)) return false;
    this.#alojamientos.push(alojamiento);
    return true;
  }

  toHTMLRow() {
    const listaIds = this.alojamientos.map(a => a.idAlojamiento).join(", ");
    return `<tr>
      <td>${this.idReserva}</td>
      <td>${this.cliente.dniCliente}</td>
      <td>${this.cliente.nombre} ${this.cliente.apellido1}</td>
      <td>${this.fechaInicio.toISOString().slice(0,10)}</td>
      <td>${this.fechaFin.toISOString().slice(0,10)}</td>
      <td>${listaIds || "-"}</td>
    </tr>`;
  }
}

// =====================
//     AGENCIA VIAJES
// =====================
class AgenciaViajes {
  #clientes;      // Cliente[]
  #alojamientos;  // Alojamiento[]
  #reservas;      // Reserva[]

  constructor() {
    this.#clientes = [];
    this.#alojamientos = [];
    this.#reservas = [];
  }

  get clientes() { return this.#clientes; }
  get alojamientos() { return this.#alojamientos; }
  get reservas() { return this.#reservas; }

  // -------- ALTAS --------
  altaCliente(cliente) {
    if (!(cliente instanceof Cliente)) return "Objeto Cliente inválido.";
    if (this.#clientes.some(c => c.dniCliente === cliente.dniCliente)) return "Ya existe un cliente con ese DNI.";
    this.#clientes.push(cliente);
    return "Cliente dado de alta.";
  }

  altaAlojamiento(alojamiento) {
    if (!(alojamiento instanceof Alojamiento)) return "Objeto Alojamiento inválido.";
    if (this.#alojamientos.some(a => a.idAlojamiento === alojamiento.idAlojamiento)) return "Ya existe un alojamiento con ese id.";
    this.#alojamientos.push(alojamiento);
    return "Alojamiento dado de alta.";
  }

  altaReserva(reserva) {
    if (!(reserva instanceof Reserva)) return "Objeto Reserva inválido.";

    // Fechas no pueden ser anteriores a hoy
    const hoy = hoySinHoras();
    if (reserva.fechaInicio < hoy || reserva.fechaFin < hoy) {
      return "Fechas inválidas: no se permiten reservas con inicio/fin anteriores al día en curso.";
    }

    // Disponibilidad: ningún alojamiento de la reserva puede estar ocupado en el rango
    for (const aloj of reserva.alojamientos) {
      const ocupado = this.#reservas.some(r =>
        r.alojamientos.some(a => a.idAlojamiento === aloj.idAlojamiento) &&
        haySolape(r.fechaInicio, r.fechaFin, reserva.fechaInicio, reserva.fechaFin)
      );
      if (ocupado) return `El alojamiento ${aloj.idAlojamiento} ya está reservado en esas fechas.`;
    }

    this.#reservas.push(reserva);
    return "Reserva registrada correctamente.";
  }

  // -------- BÚSQUEDAS --------
  buscarCliente(dniCliente) {
    return this.#clientes.find(c => c.dniCliente === String(dniCliente)) ?? null;
  }

  buscarAlojamiento(id) {
    const n = Number(id);
    return this.#alojamientos.find(a => a.idAlojamiento === n) ?? null;
  }

  // -------- LISTADOS (tablas HTML) --------
  listadoClientes() {
    let out = `<table class="table table-striped" border="1">
      <thead><tr><th>DNI</th><th>Nombre completo</th><th>Usuario</th></tr></thead><tbody>`;
    for (const c of this.#clientes) out += c.toHTMLRow();
    out += `</tbody></table>`;
    return out;
  }

  listadoAlojamientos() {
    let out = `<table class="table table-striped" border="1">
      <thead>
        <tr><th>ID</th><th>Plazas</th><th>Tipo</th><th>Desayuno</th><th>Aparcamiento</th><th>Dormitorios</th></tr>
      </thead><tbody>`;
    for (const a of this.#alojamientos) out += a.toHTMLRow();
    out += `</tbody></table>`;
    return out;
  }

  listadoReservasCliente(dniCliente) {
    const lista = this.#reservas.filter(r => r.cliente.dniCliente === String(dniCliente));
    let out = `<table class="table table-striped" border="1">
      <thead>
        <tr><th>ID Reserva</th><th>DNI Cliente</th><th>Nombre</th><th>Inicio</th><th>Fin</th><th>Alojamientos</th></tr>
      </thead><tbody>`;
    for (const r of lista) out += r.toHTMLRow();
    out += `</tbody></table>`;
    return out;
  }

  listadoReservasEntreFechas(fechaIni, fechaFin) {
    const ini = parseFecha(fechaIni);
    const fin = parseFecha(fechaFin);
    const lista = this.#reservas.filter(r => haySolape(r.fechaInicio, r.fechaFin, ini, fin));
    let out = `<table class="table table-striped" border="1">
      <thead>
        <tr><th>ID Reserva</th><th>ID Cliente</th><th>Nombre</th><th>Inicio</th><th>Fin</th><th>Alojamientos</th></tr>
      </thead><tbody>`;
    for (const r of lista) out += r.toHTMLRow();
    out += `</tbody></table>`;
    return out;
  }

  listadoHotelesConDesayuno() {
    const hoteles = this.#alojamientos
      .filter(a => a instanceof HabitacionHotel && a.desayunoIncluido)
      .sort((h1, h2) => {
        // numPersonas DESC, idAlojamiento ASC si empatan
        if (h2.numPersonas !== h1.numPersonas) return h2.numPersonas - h1.numPersonas;
        return h1.idAlojamiento - h2.idAlojamiento;
      });

    let out = `<table class="table table-striped" border="1">
      <thead><tr><th>ID</th><th>Plazas</th><th>Tipo</th><th>Desayuno</th><th>Aparcamiento</th><th>Dormitorios</th></tr></thead>
      <tbody>`;
    for (const h of hoteles) out += h.toHTMLRow();
    out += `</tbody></table>`;
    return out;
  }
}