import React from 'react'
import Welcome from '../components/Welcome/welcome'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const PessoasList = () => {
  return (
    <div>
        <Welcome action="cadastrou" data="pessoa(s)." create='Nova pessoa' type='pessoas'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Pessoas</h1>     
        <ToastContainer theme='dark' limit='2'/>     
    </div>
  )
}

export default PessoasList