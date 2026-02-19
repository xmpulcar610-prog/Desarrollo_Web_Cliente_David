import type { Equipment } from "../types/Equipment";
import EquipmentCard from "./EquipmentCard";

interface Props {
  equipos: Equipment[];
  eliminarEquipo: (id: string) => void;
}

function EquipmentList({ equipos, eliminarEquipo }: Props) {
  return (
    <div>
      {equipos.map((equipo) => (
        <EquipmentCard
          key={equipo.id}
          equipo={equipo}
          eliminarEquipo={eliminarEquipo}
        />
      ))}
    </div>
  );
}

export default EquipmentList;
