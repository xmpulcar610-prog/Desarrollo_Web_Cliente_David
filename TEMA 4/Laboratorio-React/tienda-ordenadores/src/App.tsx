import { useState } from "react";
import type { Ordenador } from "./types/Ordenador";
import OrdenadorForm from "./components/OrdenadorForm.tsx";
import OrdenadorList from "./components/OrdenadorList.tsx";


function App() {
  const [ordenadores, setOrdenadores] = useState<Ordenador[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [ordenadorEditando, setOrdenadorEditando] = useState<Ordenador | null>(null);

  const crearOrdenador = (nuevoOrdenador: Ordenador) => {
    setOrdenadores(prev => [...prev, nuevoOrdenador]);
  };

  const eliminarOrdenador = (id: number) => {
    setOrdenadores(ordenadores.filter(o => o.id !== id));
  };

  const actualizarOrdenador = (ordenadorActualizado: Ordenador) => {
    setOrdenadores(
      ordenadores.map(o =>
        o.id === ordenadorActualizado.id ? ordenadorActualizado : o
      )
    );
    setEditandoId(null);
    setOrdenadorEditando(null);
  };

  const editarOrdenador = (ordenador: Ordenador) => {
    setOrdenadorEditando(ordenador);
    setEditandoId(ordenador.id);
  };

  const cancelarEdicion = () => {
    setOrdenadorEditando(null);
    setEditandoId(null);
  };

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

}

export default App;
