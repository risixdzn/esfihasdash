import React from 'react'
import Welcome from '../components/Welcome/welcome'
import { useEffect } from 'react';
//import { UserAuth } from '../../../../context/AuthContext';

import { usePedido } from '../../../../context/PedidoContext';

const PedidosList = () => {
  //const { user } = UserAuth();
  const { pedido , updatePedido } = usePedido();
  
  const cliente = {    
      nome: "NOME_EXEMPLO1",
      itens: {},  
  }
  
  function handleClienteChange(){
    console.log(pedido)
    updatePedido({ clientes: [cliente] });    
  }

  useEffect(() => {
    console.log(pedido);
  }, [pedido]);
 
  return (
    <div>
        <Welcome action="fez" data="pedido(s)." create='Novo pedido' type='pedidos'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Pedidos</h1>
        <button className='entrarBtn' onClick={handleClienteChange}>Teste</button>       
    </div>
  )
}

export default PedidosList