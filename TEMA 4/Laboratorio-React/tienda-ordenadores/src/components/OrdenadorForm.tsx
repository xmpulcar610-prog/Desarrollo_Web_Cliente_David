import { useState, useEffect } from "react";
import type { Ordenador } from "../types/Ordenador";

interface Props {
  crearOrdenador: (ordenador: Ordenador) => void;
  actualizarOrdenador: (ordenador: Ordenador) => void;
  ordenadorEditando: Ordenador | null;
  editandoId: number | null;
  cancelarEdicion: () => void;
}

function OrdenadorForm({
  crearOrdenador,
  actualizarOrdenador,
  ordenadorEditando,
  editandoId,
  cancelarEdicion
}: Props) {

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [precio, setPrecio] = useState<number>(0);

  useEffect(() => {
    if (ordenadorEditando) {
      setMarca(ordenadorEditando.marca);
      setModelo(ordenadorEditando.modelo);
      setPrecio(ordenadorEditando.precio);
    }
  }, [ordenadorEditando]);

  const limpiarFormulario = () => {
    setMarca("");
    setModelo("");
    setPrecio(0);
  };

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
}

export default OrdenadorForm;
