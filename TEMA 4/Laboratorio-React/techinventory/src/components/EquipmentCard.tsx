import type { Equipment } from "../types/Equipment";

interface Props {
  equipo: Equipment;
  eliminarEquipo: (id: string) => void;
}

function EquipmentCard({ equipo, eliminarEquipo }: Props) {

  const colorEstado = () => {
    if (equipo.estado === "disponible") return "green";
    if (equipo.estado === "asignado") return "blue";
    return "red";
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
      <h3>{equipo.nombre}</h3>
      <p>Tipo: {equipo.tipo}</p>

      <p>
        Estado:
        <span
          style={{
            backgroundColor: colorEstado(),
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            marginLeft: "10px"
          }}
        >
          {equipo.estado}
        </span>
      </p>

      <button onClick={() => eliminarEquipo(equipo.id)}>
        🗑 Eliminar
      </button>
    </div>
  );
}

export default EquipmentCard;
