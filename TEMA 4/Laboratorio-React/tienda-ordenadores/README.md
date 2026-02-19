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
    function App() {return <h1>Tienda de Ordenadores</h1>;}
    export default App;


** CREAMOS EL MODELO (types/Ordenador.ts) **
  # 1. Creamos carpeta types dentro de src
    src/
      types/

  # 2. Creamos archivo Ordenador.ts
    src/
      types/
        Ordenador.ts

  # 3. Definimos el modelo (Ordenador.ts)
    export interface Ordenador {
      id: number;
      marca: string;
      modelo: string;
      precio: number;
    }


** EMPEZAMOS A PROGRAMAR (App.tsx) **
  # 1. Importamos lo necesario
    import { useState } from "react";
    import type { Ordenador } from "./types/Ordenador";
    import OrdenadorForm from "./components/OrdenadorForm";
    import OrdenadorList from "./components/OrdenadorList";

  # 2. Creamos los estados 
    const [ordenadores, setOrdenadores] = useState<Ordenador[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [ordenadorEditando, setOrdenadorEditando] = useState<Ordenador | null>(null);

  # 3. CREATE (crear ordenador)
    const crearOrdenador = (nuevoOrdenador: Ordenador) => {
      setOrdenadores(prev => [...prev, nuevoOrdenador]);
    };

  # 4. DELETE (eliminar ordenador)
    const eliminarOrdenador = (id: number) => {
      setOrdenadores(ordenadores.filter(o => o.id !== id));
    };

  # 5. UPDATE (actualizar ordenador)
    const actualizarOrdenador = (ordenadorActualizado: Ordenador) => {
      setOrdenadores(
        ordenadores.map(o =>
          o.id === ordenadorActualizado.id ? ordenadorActualizado : o
        )
      );
      setEditandoId(null);
      setOrdenadorEditando(null);
    };

  # 6. Función EDITAR
    const editarOrdenador = (ordenador: Ordenador) => {
      setOrdenadorEditando(ordenador);
      setEditandoId(ordenador.id);
    };

  # 7. Función cancelar edición
    const cancelarEdicion = () => {
      setOrdenadorEditando(null);
      setEditandoId(null);
    };

  # 8. Render final
    return (
      <div style={{ padding: "20px" }}>
        <h1>CRUD Tienda de Ordenadores</h1>

        <OrdenadorForm
          crearOrdenador={crearOrdenador}
          actualizarOrdenador={actualizarOrdenador}
          ordenadorEditando={ordenadorEditando}
          editandoId={editandoId}
          cancelarEdicion={cancelarEdicion}
        />

        <hr />

        <OrdenadorList
          ordenadores={ordenadores}
          eliminarOrdenador={eliminarOrdenador}
          editarOrdenador={editarOrdenador}
        />
      </div>
    );


** EMPEZAMOS A CREAR COMPONENTES **
  # 1. Creamos carpeta components dentro de src
    src/
      components/

  # 2. Creamos los archivos:
    OrdenadorForm.tsx
    OrdenadorList.tsx
    OrdenadorItem.tsx


** EDITAMOS EL PRIMER COMPONENTE (OrdenadorForm.tsx)**
  # 1. Importamos
    import { useState, useEffect } from "react";
    import type { Ordenador } from "../types/Ordenador";

  # 2. Creamos Props
    interface Props {
      crearOrdenador: (ordenador: Ordenador) => void;
      actualizarOrdenador: (ordenador: Ordenador) => void;
      ordenadorEditando: Ordenador | null;
      editandoId: number | null;
      cancelarEdicion: () => void;
    }

  # 3. Creamos la función
    function OrdenadorForm({
      crearOrdenador,
      actualizarOrdenador,
      ordenadorEditando,
      editandoId,
      cancelarEdicion
    }: Props) 

  # 3. Estado del formulario
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [precio, setPrecio] = useState<number>(0);

  # 4. useEffect para cargar datos si estamos editando
    useEffect(() => {
      if (ordenadorEditando) {
        setMarca(ordenadorEditando.marca);
        setModelo(ordenadorEditando.modelo);
        setPrecio(ordenadorEditando.precio);
      }
    }, [ordenadorEditando]);

  # 5. Función limpiarFormulario
    const limpiarFormulario = () => {
      setMarca("");
      setModelo("");
      setPrecio(0);
    };

  # 6. CREATE
    const handleCrear = () => {
      if (!marca || !modelo || precio <= 0) return;

      const nuevoOrdenador: Ordenador = {
        id: Date.now(),
        marca,
        modelo,
        precio
      };

      crearOrdenador(nuevoOrdenador);
      limpiarFormulario();
    };

  # 7. UPDATE
    const handleActualizar = () => {
      if (editandoId === null) return;

      const ordenadorActualizado: Ordenador = {
        id: editandoId,
        marca,
        modelo,
        precio
      };

      actualizarOrdenador(ordenadorActualizado);
      limpiarFormulario();
    };

  # 8. JSX del formulario
    return (
      <div>
        <h2>{editandoId !== null ? "Editar Ordenador" : "Crear Ordenador"}</h2>

        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
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
    export default OrdenadorForm;


** EDITAMOS EL SEGUNDO COMPONENTE (OrdenadorList.tsx)**
  # 1. Importar
    import type { Ordenador } from "../types/Ordenador";
    import OrdenadorItem from "./OrdenadorItem";

  # 2. Props
    interface Props {
      ordenadores: Ordenador[];
      eliminarOrdenador: (id: number) => void;
      editarOrdenador: (ordenador: Ordenador) => void;
    }

  # 3. JSX
    function OrdenadorList({ ordenadores, eliminarOrdenador, editarOrdenador }: Props) {
    return (
      <div>
        <h2>Lista de Ordenadores</h2>

        {ordenadores.length === 0 && <p>No hay ordenadores todavía.</p>}

        {ordenadores.map((ordenador) => (
          <OrdenadorItem
            key={ordenador.id}
            ordenador={ordenador}
            eliminarOrdenador={eliminarOrdenador}
            editarOrdenador={editarOrdenador}
          />
        ))}
      </div>
    );
    }

  # 4. Exportar
    export default OrdenadorList;


** EDITAMOS EL TERCER COMPONENTE (OrdenadorItem.tsx)**
  # 1. Importar
    import type { Ordenador } from "../types/Ordenador";

  # 2. Props
    interface Props {
      ordenador: Ordenador;
      eliminarOrdenador: (id: number) => void;
      editarOrdenador: (ordenador: Ordenador) => void;
    }

  # 3. JSX
    function OrdenadorItem({ ordenador, eliminarOrdenador, editarOrdenador }: Props) {
    return (
      <div>
        {ordenador.marca} - {ordenador.modelo} - {ordenador.precio}€

        <button onClick={() => editarOrdenador(ordenador)}>
          Editar
        </button>

        <button onClick={() => eliminarOrdenador(ordenador.id)}>
          Eliminar
        </button>
      </div>
    );
    }

  # 4. Exportar
    export default OrdenadorItem;
