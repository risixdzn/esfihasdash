import React from 'react'
import './newpedido.css'

import { usePedido } from '../../../../../context/PedidoContext'

import SelectPessoas from './SelectPessoas/SelectPessoas';
import SelectProdutos from './SelectProdutos/SelectProdutos';

function NewPedido() {
  const { pedidoStage } = usePedido();

  switch (pedidoStage) {
    case 1:  
      return (
        <div className='newpedidocontainer'>
          <SelectPessoas/>
        </div>
      )           
    case 2:
      return (
        <div className='newpedidocontainer'>
          <SelectProdutos/>
        </div>        
      )
    default:
      break;
  }
  
}

export default NewPedido