import React from 'react'
import Welcome from '../components/Welcome/welcome'

const Pedidos = () => {
  return (
    <div>
        <Welcome action="fez" data="pedido(s)." create='Novo pedido' type='pedidos'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Pedidos</h1>
    </div>
  )
}

export default Pedidos