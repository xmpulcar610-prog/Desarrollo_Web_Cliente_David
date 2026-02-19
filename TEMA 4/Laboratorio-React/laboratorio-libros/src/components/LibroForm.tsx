import { useState, useEffect } from "react";
import type { Libro } from "../types/Libro";



/* =========================
   1️⃣ PROPS
========================= */
interface Props {
  crearLibro: (libro: Libro) => void;
  actualizarLibro: (libro: Libro) => void;
  libroEditando: Libro | null;
  editandoId: number | null;
  cancelarEdicion: () => void;
}

/* =========================
   2️⃣ COMPONENTE
========================= */
function LibroForm({
  crearLibro,
  actualizarLibro,
  libroEditando,
  editandoId,
  cancelarEdicion
}: Props) {

  /* =========================
     3️⃣ ESTADOS DEL FORMULARIO
  ========================= */
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [precio, setPrecio] = useState<number>(0);

  /* =========================
     4️⃣ RELLENAR FORMULARIO SI EDITAMOS
  ========================= */
  useEffect(() => {
    if (libroEditando) {
      setTitulo(libroEditando.titulo);
      setAutor(libroEditando.autor);
      setPrecio(libroEditando.precio);
    }
  }, [libroEditando]);

  /* =========================
     5️⃣ LIMPIAR FORMULARIO
  ========================= */
  const limpiarFormulario = () => {
    setTitulo("");
    setAutor("");
    setPrecio(0);
  };

  /* =========================
     6️⃣ CREATE
  ========================= */
  const handleCrear = () => {

    if (!titulo || !autor || precio <= 0) {
      alert("Completa todos los campos correctamente");
      return;
    }

    const nuevoLibro: Libro = {
      id: Date.now(),
      titulo,
      autor,
      precio
    };

    crearLibro(nuevoLibro);
    limpiarFormulario();
  };

  /* =========================
     7️⃣ UPDATE
  ========================= */
  const handleActualizar = () => {

    if (editandoId === null) return;

    const libroActualizado: Libro = {
      id: editandoId,
      titulo,
      autor,
      precio
    };

    actualizarLibro(libroActualizado);
    limpiarFormulario();
  };

  /* =========================
     8️⃣ JSX
  ========================= */
  return (
    <div>
      <h2>{editandoId !== null ? "Editar Libro" : "Crear Libro"}</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
      />

      <br /><br />

      {editandoId !== null ? (
        <>
          <button onClick={handleActualizar}>
            Actualizar
          </button>

          <button onClick={cancelarEdicion}>
            Cancelar
          </button>
        </>
      ) : (
        <button onClick={handleCrear}>
          Crear
        </button>
      )}
    </div>
  );
}

export default LibroForm;
