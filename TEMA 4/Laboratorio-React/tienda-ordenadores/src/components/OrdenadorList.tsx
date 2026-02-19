import type { Ordenador } from "../types/Ordenador";
import OrdenadorItem from "./OrdenadorItem";

interface Props {
  ordenadores: Ordenador[];
  eliminarOrdenador: (id: number) => void;
  editarOrdenador: (ordenador: Ordenador) => void;
}

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

export default OrdenadorList;

