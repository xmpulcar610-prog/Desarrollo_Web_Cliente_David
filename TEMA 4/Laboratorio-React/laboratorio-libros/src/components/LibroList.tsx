import type { Libro } from "../types/Libro";

/* =========================
   1️⃣ PROPS
========================= */
interface Props {
  libros: Libro[];
  eliminarLibro: (id: number) => void;
  editarLibro: (libro: Libro) => void;
}

/* =========================
   2️⃣ COMPONENTE
========================= */
function LibroList({ libros, eliminarLibro, editarLibro }: Props) {

  /* =========================
     3️⃣ JSX
  ========================= */
  return (
    <div>
      <h2>Lista de Libros</h2>

      {/* Si no hay libros */}
      {libros.length === 0 && (
        <p>No hay libros todavía.</p>
      )}

      {/* Si hay libros */}
      {libros.map((libro) => (
        <div key={libro.id} style={{ marginBottom: "10px" }}>
          <strong>{libro.titulo}</strong> - {libro.autor} - {libro.precio}€

          <br />

          <button onClick={() => editarLibro(libro)}>
            Editar
          </button>

          <button
            onClick={() => eliminarLibro(libro.id)}
            style={{ marginLeft: "10px" }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default LibroList;

