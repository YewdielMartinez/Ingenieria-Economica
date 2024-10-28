// src/contexts/HistoryContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo de operación en el historial
interface Operation {
  id: number;
  type: string;
  result: string;
}

// Crear el contexto
const HistoryContext = createContext<{
  history: Operation[];
  addOperation: (type: string, result: string) => void;
}>({
  history: [],
  addOperation: () => {},
});

// Proveedor del contexto
export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<Operation[]>([]);
  const [nextId, setNextId] = useState(1);

  const addOperation = (type: string, result: string) => {
    setHistory((prev) => [...prev, { id: nextId, type, result }]);
    setNextId((prev) => prev + 1); // Incrementar el ID para la próxima operación
  };

  return (
    <HistoryContext.Provider value={{ history, addOperation }}>
      {children}
    </HistoryContext.Provider>
  );
};

// Hook para usar el contexto
export const useHistory = () => useContext(HistoryContext);
