# PASOS PARA CREAR UN PROYECTO RÍA - 2 COMPONENTE

** CREAMOS EL LABORATORIO **
  # 1. Creamos el proyecto
    npm create vite@latest 'nombre-proyecto' -- --template react-ts

  # 2. Accedemos al proyecto
    cd 'nombre-proyecto'

  # 3. Instalamos 'npm'
    npm install

  # 4. Runemaos el programa
    npm run dev

  # 5. Limpiamos y dejamos App.tsx asi:
    function App() {return <h1>Tienda de Libros</h1>;}

    export default App;

** CREAMOS EL MODELO (types/Libro.ts) **
  # 1. Creamos una carpeta types/ dentro de src/
    src/
      types/

  # 2. Creamos el archivo Libros.ts:
    src/
      types/
        Libros.ts

  # 3. Definmos el modelo (Libros.ts)
    export interface Libro {
      id: number;
      titulo: string;
      autor: string;
      precio: number;
    }

** EMPEZAMOS A PROGRAMAR (App.tsx) **
  # 1. Importamos lo necesario
    import { useState } from "react";
    import type { Libro } from "./types/Libro";
    import LibroForm from "./components/LibroForm";
    import LibroList from "./components/LibroList";

  # 2. Creamos los estados principales
    const [libros, setLibros] = useState<Libro[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [libroEditando, setLibroEditando] = useState<Libro | null>(null);


  # 3. CREATE (crear libro)
    const crearLibro = (nuevoLibro: Libro) => {
      setLibros(prev => [...prev, nuevoLibro]);
    };

  # 4. DELETE (eliminar libro)
    const eliminarLibro = (id: number) => {
      setLibros(libros.filter(libro => libro.id !== id));
    };

  # 5. UPDATE (actualizar libro)
    const actualizarLibro = (libroActualizado: Libro) => {
      setLibros(
        libros.map(libro =>
          libro.id === libroActualizado.id ? libroActualizado : libro
        )
      );
      setEditandoId(null);
      setLibroEditando(null);
    };

  # 6. Función EDITAR
    const editarLibro = (libro: Libro) => {
      setLibroEditando(libro);
      setEditandoId(libro.id);
    };

  # 7. Función cancelar edición
    const cancelarEdicion = () => {
      setLibroEditando(null);
      setEditandoId(null);
    };

  # 8. El render final
    return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Tienda de Libros</h1>

      <LibroForm
        crearLibro={crearLibro}
        actualizarLibro={actualizarLibro}
        libroEditando={libroEditando}
        editandoId={editandoId}
        cancelarEdicion={cancelarEdicion}
      />

      <hr />

      <LibroList
        libros={libros}
        eliminarLibro={eliminarLibro}
        editarLibro={editarLibro}
      />
    </div>
  );

** EMPEZAMOS A CREAR COMPONENTES **
  # 1. Creamos una carpeta components/ dentro de src/
    src/
      components/
  
  # 2. Creamos los archivos de componentes:
    LibroForm.tsx 
    LibroList.tsx

** EDITAMOS EL PRIMER COMPONENTE (LibroForm.tsx)**
  # 1. Importamos :
    import { useState, useEffect } from "react";
    import type { Libro } from "../types/Libro";


  # 2. Creamos Pops:
    interface Props {
      crearLibro: (libro: Libro) => void;
      actualizarLibro: (libro: Libro) => void;
      libroEditando: Libro | null;
      editandoId: number | null;
      cancelarEdicion: () => void;
    }


  # 3. Estado del formulario:
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [precio, setPrecio] = useState<number>(0);


  # 4. useEffect para cargar datos si estamos editando
      useEffect(() => {
        if (libroEditando) {
          setTitulo(libroEditando.titulo);
          setAutor(libroEditando.autor);
          setPrecio(libroEditando.precio);
        }
      }, [libroEditando]);


  # 5. Función limpiarFormulario
    const limpiarFormulario = () => {
      setTitulo("");
      setAutor("");
      setPrecio(0);
    };

  
  # 6. Creamos el CREATE
    const handleCrear = () => {
        if (!titulo || !autor || precio <= 0) return;

        const nuevoLibro: Libro = {
          id: Date.now(),
          titulo,
          autor,
          precio
        };

        crearLibro(nuevoLibro);
        limpiarFormulario();
      };


  # 7. Creamos el UPDATE
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


  # 8. JSX del formulario
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

        {editandoId !== null ? (
          <>
            <button onClick={handleActualizar}>Actualizar</button>
            <button onClick={cancelarEdicion}>Cancelar</button>
          </>
        ) : (
          <button onClick={handleCrear}>Crear</button>
        )}
      </div>
    );


  # 9. Exportar
    export default LibroForm;


** EDITAMOS EL SEGUNDO COMPONENTE (LibroForm.tsx)**
  # 1. Importar
    import type { Libro } from "../types/Libro";


  # 2. Props
    interface Props {
      libros: Libro[];
      eliminarLibro: (id: number) => void;
      editarLibro: (libro: Libro) => void;
    }


  # 3. JSX
    return (
      <div>
        <h2>Lista de Libros</h2>

        {libros.length === 0 && <p>No hay libros todavía.</p>}

        {libros.map((libro) => (
          <div key={libro.id}>
            {libro.titulo} - {libro.autor} - {libro.precio}€

            <button onClick={() => editarLibro(libro)}>
              Editar
            </button>

            <button onClick={() => eliminarLibro(libro.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    );


  # 4. JSX
    export default LibroList;
