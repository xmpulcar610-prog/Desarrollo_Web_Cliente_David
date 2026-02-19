import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import type { Equipment } from "./types/Equipment";
import EquipmentForm from "./components/EquipmentForm.tsx";
import EquipmentList from "./components/EquipmentList.tsx";

function App() {

  const [equipos, setEquipos] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const equiposRef = collection(db, "equipos");

  useEffect(() => {
    const cargarEquipos = async () => {
      const data = await getDocs(equiposRef);

      const lista: Equipment[] = data.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Equipment, "id">)
      }));

      setEquipos(lista);
      setIsLoading(false);
    };

    cargarEquipos();
  }, []);

  const crearEquipo = async (equipo: Equipment) => {
    const docRef = await addDoc(equiposRef, {
      nombre: equipo.nombre,
      tipo: equipo.tipo,
      estado: equipo.estado
    });

    setEquipos(prev => [...prev, { ...equipo, id: docRef.id }]);
  };

  const eliminarEquipo = async (id: string) => {
    await deleteDoc(doc(db, "equipos", id));
    setEquipos(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>TechInventory - DevCorp</h1>

      <EquipmentForm crearEquipo={crearEquipo} />

      {isLoading ? (
        <p>Cargando inventario...</p>
      ) : (
        <EquipmentList
          equipos={equipos}
          eliminarEquipo={eliminarEquipo}
        />
      )}
    </div>
  );
}

export default App;
