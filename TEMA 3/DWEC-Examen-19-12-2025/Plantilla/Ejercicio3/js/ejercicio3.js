"use strict";

const formulario = document.forms["formularioStock"];
const salida = document.getElementById("mensajes");

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(event) {
  salida.innerHTML = "";

  const fabricante = formulario.fabricante.value.trim();
  const producto = formulario.producto.value.trim();
  const fecha = formulario.fecha.value.trim();
  const categoria = formulario.categoria.value;
  const referencia = formulario.referencia.value.trim();
  const ubicacion = formulario.ubicacion.value.trim();

  const vacios = [];
  const errores = [];

  const regExpNombre = /^[A-ZÑÁÉÍÓÚ][A-Za-zÑÁÉÍÓÚñáéíóú]*$/;
  const regExpFecha = /^\d{4}-\d{2}-\d{2}$/;
  const regExpUbicacion = /^[A-Z]-\d{2}$/;

  const regExpReferenciaPorCategoria = {
    electronica: /^EL-\d{3}[A-Z]$/,
    hogar: /^[A-Z]{3}-\d{4}$/,
    alimentacion: /^AL\d{4}EXP$/,
  };

  if (fabricante.length === 0) vacios.push("Fabricante");
  if (producto.length === 0) vacios.push("Producto");
  if (fecha.length === 0) vacios.push("Fecha Entrada");
  if (referencia.length === 0) vacios.push("Cód. Referencia");
  if (ubicacion.length === 0) vacios.push("Ubicación Pasillo");

  if (fabricante.length > 0 && !regExpNombre.test(fabricante)) errores.push("Fabricante");
  if (producto.length > 0 && !regExpNombre.test(producto)) errores.push("Producto");

  if (fecha.length > 0) {
    if (!regExpFecha.test(fecha) || !esFechaValida(fecha)) errores.push("Fecha Entrada");
  }

  if (referencia.length > 0) {
    const regExpRef = regExpReferenciaPorCategoria[categoria];
    if (!regExpRef.test(referencia)) errores.push("Cód. Referencia");
  }

  if (ubicacion.length > 0 && !regExpUbicacion.test(ubicacion)) errores.push("Ubicación Pasillo");

  if (vacios.length > 0 || errores.length > 0) {
    event.preventDefault();

    if (vacios.length > 0) {
      const divVacios = document.createElement("div");
      divVacios.className = "empty-list";
      divVacios.innerHTML = construirLista("CAMPOS VACÍOS", vacios);
      salida.appendChild(divVacios);
    }

    if (errores.length > 0) {
      const divErrores = document.createElement("div");
      divErrores.className = "error-list";
      divErrores.innerHTML = construirLista("CAMPOS CON ERRORES", errores);
      salida.appendChild(divErrores);
    }
  }
}

function construirLista(titulo, items) {
  let html = `<h3>${titulo}:</h3><ul>`;
  for (const it of items) html += `<li>${it}</li>`;
  html += `</ul>`;
  return html;
}

function esFechaValida(fechaStr) {
  const partes = fechaStr.split("-");
  if (partes.length !== 3) return false;

  const year = Number(partes[0]);
  const month = Number(partes[1]);
  const day = Number(partes[2]);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12) return false;

  const d = new Date(year, month - 1, day);
  return (
    d.getFullYear() === year &&
    d.getMonth() === month - 1 &&
    d.getDate() === day
  );
}
