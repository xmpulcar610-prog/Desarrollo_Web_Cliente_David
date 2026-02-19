import { useState } from "react";
import "./App.css";

interface Alumno {
  id: number;
  nombre: string;
  edad: number;
  curso: string;
}

function App() {

  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [curso, setCurso] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // 🔹 CREATE
  const crearAlumno = () => {

    if (!nombre || !curso || Number(edad) <= 0) {
      alert("Completa todos los campos correctamente");
      return;
    }

    const nuevoAlumno: Alumno = {
      id: Date.now(),
      nombre,
      edad: Number(edad),
      curso
    };


    setAlumnos(prev => [...prev, nuevoAlumno]);
    limpiarFormulario();
  };

  // 🔹 DELETE
  const eliminarAlumno = (id: number) => {
    setAlumnos(prev => prev.filter(alumno => alumno.id !== id));
  };

  // 🔹 EDITAR
  const editarAlumno = (alumno: Alumno) => {
    setNombre(alumno.nombre);
    setEdad(String(alumno.edad));
    setCurso(alumno.curso);
    setEditandoId(alumno.id);
  };

  // 🔹 UPDATE
  const actualizarAlumno = () => {

  if (editandoId === null) return;

  const nuevaLista: Alumno[] = [];

  for (let i = 0; i < alumnos.length; i++) {
    if (alumnos[i].id === editandoId) {
      nuevaLista.push({
        id: editandoId,
        nombre: nombre,
        edad: Number(edad),
        curso: curso
      });
    } else {
      nuevaLista.push(alumnos[i]);
    }
  }

  setAlumnos(nuevaLista);

  setEditandoId(null);
  limpiarFormulario();
};


  // 🔹 LIMPIAR
  const limpiarFormulario = () => {
    setNombre("");
    setEdad("");
    setCurso("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Colegio</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />

        <input
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />

        {editandoId !== null ? (
          <button onClick={actualizarAlumno}>
            Actualizar
          </button>
        ) : (
          <button onClick={crearAlumno}>
            Crear
          </button>
        )}
      </div>

      <hr />

      <h2>Lista de alumnos</h2>

      {alumnos.length === 0 && <p>No hay alumnos todavía.</p>}

      {alumnos.map((alumno) => (
        <div key={alumno.id} style={{ marginBottom: "10px" }}>
          {alumno.nombre} - {alumno.edad} años - {alumno.curso}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => editarAlumno(alumno)}
          >
            Editar
          </button>

          <button
            style={{ marginLeft: "5px" }}
            onClick={() => eliminarAlumno(alumno.id)}
          >
            Eliminar
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
