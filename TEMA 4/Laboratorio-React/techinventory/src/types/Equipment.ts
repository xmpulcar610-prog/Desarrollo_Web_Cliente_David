export interface Equipment {
  id: string;
  nombre: string;
  tipo: 'portatil' | 'monitor' | 'teclado';
  estado: 'disponible' | 'asignado' | 'averiado';
}
