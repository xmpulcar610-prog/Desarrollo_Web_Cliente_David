import type { Partido } from "../types/types";

type Props = {
  partido: Partido;
};

export default function PartidoCard({ partido }: Props) {
  return (
    <div style={cardStyle}>
      <h3>{partido.rival}</h3>
      <p>⚽ {partido.golesFavor} - {partido.golesContra}</p>
      <p>Resultado: {partido.resultado}</p>
      <p>Posesión: {partido.posesion}%</p>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#1f2937",
  color: "white",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "10px"
};
