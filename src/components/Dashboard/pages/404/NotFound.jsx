import React from 'react'
import './notfound.css'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='notfoundcontainer'>
        <img className='logo' src='./assets/svg/minimal-esfihasdash-logo.svg' alt=''/>       
        <img className='_404' src="./assets/img/404.png" alt="" /> 
        <h2>A pagina que você encontrou não existe...</h2>
        <p>Tente voltar para o início</p>
        <Link to='/home' className='voltar'>Voltar</Link>
    </div>
  )
}

export default NotFound