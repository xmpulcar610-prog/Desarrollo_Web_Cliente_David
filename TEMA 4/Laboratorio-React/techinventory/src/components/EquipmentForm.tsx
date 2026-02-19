import { useState } from "react";
import type { Equipment } from "../types/Equipment";

interface Props {
  crearEquipo: (equipo: Equipment) => void;
}

function EquipmentForm({ crearEquipo }: Props) {

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<'portatil' | 'monitor' | 'teclado'>("portatil");
  const [estado, setEstado] = useState<'disponible' | 'asignado' | 'averiado'>("disponible");

  const handleGuardar = () => {
    if (!nombre) return;

    const nuevoEquipo: Equipment = {
      id: crypto.randomUUID(),
      nombre,
      tipo,
      estado
    };

    crearEquipo(nuevoEquipo);
    setNombre("");
  };

  return (
    <div>
      <h2>Nuevo Equipo</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
        <option value="portatil">Portátil</option>
        <option value="monitor">Monitor</option>
        <option value="teclado">Teclado</option>
      </select>

      <select value={estado} onChange={(e) => setEstado(e.target.value as any)}>
        <option value="disponible">Disponible</option>
        <option value="asignado">Asignado</option>
        <option value="averiado">Averiado</option>
      </select>

      <button disabled={!nombre} onClick={handleGuardar}>
        Guardar
      </button>
    </div>
  );
}

export default EquipmentForm;
