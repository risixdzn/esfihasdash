import { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

// Crie um componente de provedor para envolver o componente em que o estado está sendo usado
export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [ selectedModal , setSelectedModal ] = useState("");

  return (
    // Forneça o valor do estado para o provedor de contexto
    <ModalContext.Provider value={{ showModal, setShowModal , selectedModal , setSelectedModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Crie um gancho personalizado para acessar o valor do estado dentro de outros componentes
export const useModal = () => useContext(ModalContext);