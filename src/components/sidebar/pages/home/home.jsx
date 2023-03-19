import React from 'react'
import Welcome from '../components/Welcome/welcome'

function Home () {    
  return (
    <div>
        <Welcome/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Home</h1>        
    </div>
  )
}

export default Home