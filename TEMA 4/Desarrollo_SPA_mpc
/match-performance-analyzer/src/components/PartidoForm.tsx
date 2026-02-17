import { useState } from "react";
import type { Resultado, Partido } from "../types/types";

const RESULTADOS: Resultado[] = ["Victoria", "Empate", "Derrota"];

type Props = {
  onCreate: (partido: Partido) => void;
};

export default function PartidoForm({ onCreate }: Props) {
  const [form, setForm] = useState({
    rival: "",
    golesFavor: 0,
    golesContra: 0,
    resultado: "Victoria" as Resultado,
    posesion: 50,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "golesFavor" ||
        name === "golesContra" ||
        name === "posesion"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.rival.trim()) {
      alert("Introduce el nombre del rival ⚽");
      return;
    }

    const nuevoPartido: Partido = {
      ...form,
      createdAt: Date.now(),
    };

    onCreate(nuevoPartido);

    setForm({
      rival: "",
      golesFavor: 0,
      golesContra: 0,
      resultado: "Victoria",
      posesion: 50,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Registrar Partido</h2>

      <input
        name="rival"
        placeholder="Rival"
        value={form.rival}
        onChange={handleChange}
      />

      <input
        type="number"
        name="golesFavor"
        placeholder="Goles a favor"
        value={form.golesFavor}
        onChange={handleChange}
      />

      <input
        type="number"
        name="golesContra"
        placeholder="Goles en contra"
        value={form.golesContra}
        onChange={handleChange}
      />

      <select
        name="resultado"
        value={form.resultado}
        onChange={handleChange}
      >
        {RESULTADOS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="posesion"
        placeholder="Posesión (%)"
        value={form.posesion}
        onChange={handleChange}
        min={0}
        max={100}
      />

      <button type="submit">Añadir Partido</button>
    </form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: "#1f2937",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
};
