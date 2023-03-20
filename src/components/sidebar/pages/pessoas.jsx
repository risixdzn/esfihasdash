import React from 'react'
import Welcome from './components/Welcome/welcome'

const Pessoas = () => {
  return (
    <div>
        <Welcome action="cadastrou" data="pessoa(s)." create='Nova pessoa' type='pessoas'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Pessoas</h1>
        
    </div>
  )
}

export default Pessoas