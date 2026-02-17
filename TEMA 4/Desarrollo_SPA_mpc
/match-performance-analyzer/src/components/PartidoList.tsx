import type { Partido } from "../types/types";
import PartidoCard from "./PartidoCard";

type Props = {
  partidos: Partido[];
};

export default function PartidoList({ partidos }: Props) {
  if (partidos.length === 0) {
    return <p style={{color:"white"}}>No hay partidos todavía ⚽</p>;
  }

  return (
    <div>
      {partidos.map((p, index) => (
        <PartidoCard key={index} partido={p} />
      ))}
    </div>
  );
}
