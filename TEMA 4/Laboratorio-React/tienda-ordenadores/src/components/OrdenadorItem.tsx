import type { Ordenador } from "../types/Ordenador";

interface Props {
  ordenador: Ordenador;
  eliminarOrdenador: (id: number) => void;
  editarOrdenador: (ordenador: Ordenador) => void;
}
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

export default OrdenadorItem;
