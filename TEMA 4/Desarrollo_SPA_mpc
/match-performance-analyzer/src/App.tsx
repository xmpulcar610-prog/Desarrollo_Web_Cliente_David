import { useState } from "react";
import Navbar from "./components/Navbar";
import PartidoForm from "./components/PartidoForm";
import PartidoList from "./components/PartidoList";
import type { Partido } from "./types/types";

export default function App() {
  const [partidos, setPartidos] = useState<Partido[]>([]);

  const handleCreate = (nuevo: Partido) => {
    setPartidos((prev) => [nuevo, ...prev]);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
        <div style={{ width: "350px" }}>
          <PartidoForm onCreate={handleCreate} />
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{color:"white"}}>Partidos Registrados</h2>
          <PartidoList partidos={partidos} />
        </div>
      </div>
    </>
  );
}
