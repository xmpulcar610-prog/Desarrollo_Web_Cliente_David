# PASOS PARA CREAR UN PROYECTO RÍA - 1 COMPONENTE

** CREAMOS EL LABORATORIO **
  # 1. Creamos el proyecto
    npm create vite@latest 'nombre-proyecto' -- --template react-ts

  # 2. Accedemos al proyecto
    cd 'nombre-proyecto'

  # 3. Instalamos 'npm'
    npm install

  # 4. Runemaos el programa
    npm run dev


** EMPEZAMOS A PROGRAMAR (App.tsx) **
  # 1. Creamos la interface:
    import './App.css'

    interface Alumno {
      id: number;
      nombre: string;
      edad: number;
      curso: string;
    }

    function App() {
      return (
        <div>
          <h1>CRUD Colegio</h1>
        </div>
      )
    }

    export default App


  # 2. Creamos los Estados:
    import { useState } from "react";  
    
    const [alumnos, setAlumnos] = useState<Alumno[]>([]); 
      const [nombre, setNombre] = useState("");  
      const [edad, setEdad] = useState("");
      const [curso, setCurso] = useState(""); 
      const [editandoId, setEditandoId] = useState<number | null>(null);

  # 3. Crear el formulario controlado:
    return (
        <div style={{ padding: "20px" }}> 
          <h1>CRUD Colegio</h1>

          {/* FORMULARIO */}
          <div>
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
              onChange={(e) => setEdad(Number(e.target.value))}
            />

            <input
              type="text"
              placeholder="Curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
            />
          </div>

        </div>
      );

  # 4. CREATE (Crear alumno):
    ## 4.1 CREAR LA FUNCIÓN CREAR
      const crearAlumno = () => {

      if (!nombre || !curso || edad <= 0) {
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

    ## 4.2 CREAR LA FUNCIÓN LIMPIAR FORMULARIO
      const limpiarFormulario = () => {
      setNombre("");
      setEdad(0);
      setCurso("");
      };

    ## 4.3 AÑADIMOS EL BOTÓN DE CREAR
      <button onClick={crearAlumno}>
        Crear
      </button>


  # 5. READ (Mostrar la lista de alumnos):
    <hr />

    <h2>Lista de alumnos</h2>

    {alumnos.length === 0 && <p>No hay alumnos todavía.</p>}

    {alumnos.map((alumno) => (
      <div key={alumno.id}>
        {alumno.nombre} - {alumno.edad} años - {alumno.curso}
      </div>
    ))}


  # 6. DELETE (Eliminar alumno)
    ## 6.1 CREAMOS LA FUNCIÓN ELIMINAR
      const eliminarAlumno = (id: number) => {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      };

    ## 6.2 AÑADIMOS EL BOTÓN DE ELIMINAR
      <button onClick={() => eliminarAlumno(alumno.id)}>
        Eliminar
      </button>


  # 7. UPDATE (Editar y actualizar alumno).
    ## 7.1 CREAMOS EL ESTADO EDITANDOLD (junto a todos los const)
      const [editandoId, setEditandoId] = useState<number | null>(null);

    ## 7.2. CREAMOS LA FUNCIÓN EDITAR
      const editarAlumno = (alumno: Alumno) => {
        setNombre(alumno.nombre);
        setEdad(alumno.edad);
        setCurso(alumno.curso);
        setEditandoId(alumno.id);
      };

    ## 7.3. CREAMOS LA FUNCIÓN ACTUALIZAR
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


    ## 7.4 CAMBIAMOS EL BOTÓN CREAR POR LA CONDICIONAL
      {editandoId !== null ? (
        <button onClick={actualizarAlumno}>
          Actualizar
        </button>
      ) : (
        <button onClick={crearAlumno}>
          Crear
        </button>
      )}

    ## 7.5 AÑADIMOS EL BOTÓN EDITAR AL LISTADO
      <button onClick={() => editarAlumno(alumno)}>
        Editar
      </button>