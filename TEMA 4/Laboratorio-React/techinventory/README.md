# PASOS PARA CREAR UN PROYECTO RÍA - EJEMPLO GUIADO PROFESOR

** CREAMOS EL LABORATORIO **
  # 1. Creamos el proyecto
    npm create vite@latest 'nombre-proyecto' -- --template react-ts

  # 2. Accedemos al proyecto
    cd 'nombre-proyecto'

  # 3. Instalamos 'npm'
    npm install

  # 4. Runemaos el programa
    npm run dev

  # 5. Limpiamos y dejamos App.tsx asi:
    function App() {return <h1>TechInventory - DevCorp</h1>;}
    export default App;

  # 6. Instalamos Firebase:
    npm install firebase


** CONFIGURAMOS FIREBASE **
  # 1. Creamos archivo .env en la raíz
    src/
      .env
  
  # 2. En el archivo de .env escribimos
    VITE_FIREBASE_API_KEY=xxxxx
    VITE_FIREBASE_AUTH_DOMAIN=xxxxx
    VITE_FIREBASE_PROJECT_ID=xxxxx
    VITE_FIREBASE_STORAGE_BUCKET=xxxxx
    VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxx
    VITE_FIREBASE_APP_ID=xxxxx

    *** Donde xxxx habra que cambiarlo haciendo esto:
        1. Entra en: https://console.firebase.google.com
        2. Entra en tu proyecto
        3. Ve a: ⚙️ Configuración del proyecto
        4. --> General
        5. --> Tus aplicaciones
        6. Bajas hacia abajo --> Web App
        7. Veras algo como:
            const firebaseConfig = {
              apiKey: "AIzaSyA....",
              authDomain: "techinventory-123.firebaseapp.com",
              projectId: "techinventory-123",
              storageBucket: "techinventory-123.appspot.com",
              messagingSenderId: "123456789",
              appId: "1:123456:web:abc123"
            };

  # 3. Creamos archivo firebase.ts en la raíz
    src/
      firebase.ts

  # 4. En el archivo de firebase.ts escribimos:
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);


** CREAMOS EL MODELO (types/Libro.ts) **
  # 1. Creamos una carpeta types/ dentro de src/
    src/
      types/

  # 2. Creamos archivo Equipment.ts
    src/
      types/
        Equipment.ts

  # 3. Definimos el modelo (Equipment.ts)
    export interface Equipment {
      id: string;
      nombre: string;
      tipo: 'portatil' | 'monitor' | 'teclado';
      estado: 'disponible' | 'asignado' | 'averiado';
    }

** CREAMOS MOCK DATA **
  # 1. Creamos archivo mockData.ts en la raíz
    src/
      mockData.ts

  # 2. En el archivo de mockData.ts escribimos
    import type { Equipment } from "./types/Equipment";

    export const mockData: Equipment[] = [
      {
        id: "1",
        nombre: "MacBook Air M2",
        tipo: "portatil",
        estado: "asignado"
      },
      {
        id: "2",
        nombre: "Dell UltraSharp 27",
        tipo: "monitor",
        estado: "disponible"
      },
      {
        id: "3",
        nombre: "Logitech MX Keys",
        tipo: "teclado",
        estado: "averiado"
      }
    ];

** CREAMOS COMPONENTES **
  # 1. Creamos carpeta:
    src/
      components/

  # 2. Creamos los archivos de los componentes:
    EquipmentForm.tsx
    EquipmentList.tsx
    EquipmentCard.tsx

** EDITAMOS EquipmentCard.tsx **
  # 1. Importamos:
    import type { Equipment } from "../types/Equipment";

  # 2. Props:
    interface Props {
      equipo: Equipment;
      eliminarEquipo: (id: string) => void;
    }

  # 3. Funcion:
    function EquipmentCard({ equipo, eliminarEquipo }: Props)

  # 4. ColorEstado
     const colorEstado = () => {
        if (equipo.estado === "disponible") return "green";
        if (equipo.estado === "asignado") return "blue";
        return "red";
      };
  
  # 5. JSX:
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

  # 6. EXPORT:
    export default EquipmentCard;

** EDITAMOS EquipmentList.tsx**
  # 1. Importamos:
    import type { Equipment } from "../types/Equipment";
    import EquipmentCard from "./EquipmentCard";

  # 2. Props
    interface Props {
      equipos: Equipment[];
      eliminarEquipo: (id: string) => void;
    }

  # 3. Funcion y JSX
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

  # 4. EXPORT
    export default EquipmentList;

** EDITAMOS EquipmentForm.tsx **
  # 1. Importamos:
    import { useState } from "react";
    import type { Equipment } from "../types/Equipment";

  # 2. Props:
    interface Props {
      crearEquipo: (equipo: Equipment) => void;
    }

  # 3. Función:
    function EquipmentForm({ crearEquipo }: Props)

  # 4. Estados
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState<'portatil' | 'monitor' | 'teclado'>("portatil");
    const [estado, setEstado] = useState<'disponible' | 'asignado' | 'averiado'>("disponible");

  # 5. handleGuardar 
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

  # 6. JSX
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

  # 7. EXPORT
    export default EquipmentForm;


** EMPEZAMOS A PROGRAMAR (App.tsx) **
  # 1. Importamos
    import { useEffect, useState } from "react";
    import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
    import { db } from "./firebase";
    import type { Equipment } from "./types/Equipment";
    import EquipmentForm from "./components/EquipmentForm";
    import EquipmentList from "./components/EquipmentList";

  # 2. Creamos estados
    const [equipos, setEquipos] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const equiposRef = collection(db, "equipos");

  # 3. useEffect
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

  # 4. CREATE
    const crearEquipo = async (equipo: Equipment) => {
      const docRef = await addDoc(equiposRef, {
        nombre: equipo.nombre,
        tipo: equipo.tipo,
        estado: equipo.estado
      });
      
      setEquipos(prev => [...prev, { ...equipo, id: docRef.id }]);
    };

  # 5. DELETE
    const eliminarEquipo = async (id: string) => {
      await deleteDoc(doc(db, "equipos", id));
      setEquipos(prev => prev.filter(e => e.id !== id));
    };

  # 6. Render
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

  # 7. EXPORT
    export default App;