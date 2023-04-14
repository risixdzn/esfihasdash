import { createContext, useContext, useState, useCallback} from "react";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({children})=>{
    const [pedidoStage, setPedidoStage ] = useState(1);
    const [pedido, setPedido] = useState({
        id: Math.random().toString(36).substr(2, 9), // hash (react crypto)
        date: Date.now(), // current timestamp
        clientes: [],
    });

    const updatePedido = useCallback((newPedido) => {
        setPedido((prevPedido) => ({
            ...prevPedido,
            ...newPedido,
        }));
    }, []);

    return (
        <PedidoContext.Provider value={{ pedido, updatePedido, pedidoStage, setPedidoStage }}>
            {children}
        </PedidoContext.Provider>
    );
};

export const usePedido = () => useContext(PedidoContext);