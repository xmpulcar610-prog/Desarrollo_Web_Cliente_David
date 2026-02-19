import { useState } from "react";
import type { Libro } from "./types/Libro";
import LibroForm from "./components/LibroForm";
import LibroList from "./components/LibroList";


/* =========================
   2️⃣ COMPONENTE PRINCIPAL
========================= */
function App() {

  /* =========================
     3️⃣ ESTADOS
  ========================= */

  const [libros, setLibros] = useState<Libro[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [libroEditando, setLibroEditando] = useState<Libro | null>(null);


  /* =========================
     4️⃣ CREATE
  ========================= */
  const crearLibro = (nuevoLibro: Libro) => {
    setLibros(prev => [...prev, nuevoLibro]);
  };


  /* =========================
     5️⃣ DELETE
  ========================= */
  const eliminarLibro = (id: number) => {
    setLibros(libros.filter(libro => libro.id !== id));
  };


  /* =========================
     6️⃣ EDITAR (Seleccionar libro)
  ========================= */
  const editarLibro = (libro: Libro) => {
    setLibroEditando(libro);
    setEditandoId(libro.id);
  };


  /* =========================
     7️⃣ UPDATE
  ========================= */
  const actualizarLibro = (libroActualizado: Libro) => {
    setLibros(
      libros.map(libro =>
        libro.id === libroActualizado.id ? libroActualizado : libro
      )
    );

    setEditandoId(null);
    setLibroEditando(null);
  };


  /* =========================
     8️⃣ CANCELAR EDICIÓN
  ========================= */
  const cancelarEdicion = () => {
    setEditandoId(null);
    setLibroEditando(null);
  };


  /* =========================
     9️⃣ RENDER FINAL
  ========================= */
  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Tienda de Libros</h1>

      {/* FORMULARIO */}
      <LibroForm
        crearLibro={crearLibro}
        actualizarLibro={actualizarLibro}
        libroEditando={libroEditando}
        editandoId={editandoId}
        cancelarEdicion={cancelarEdicion}
      />

      <hr />

      {/* LISTADO */}
      <LibroList
        libros={libros}
        eliminarLibro={eliminarLibro}
        editarLibro={editarLibro}
      />
    </div>
  );
}

export default App;
