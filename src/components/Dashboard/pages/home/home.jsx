import React from 'react'
import Welcome from '../components/Welcome/welcome'
import './home.css'

function Home () {    
  return (
    <div>
        <Welcome action="fez" data="pedido(s)." create='Novo pedido' type='pedidos'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Home</h1>      
        <div className="bigdiv">
          <h1>Ainda não há nada aqui.</h1>  
        </div>        
    </div>
  )
}

export default Home