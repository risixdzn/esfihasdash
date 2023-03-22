import React from 'react'
import Welcome from '../components/Welcome/welcome'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DisplayPessoas from '../../../../db/DisplayPessoas/DisplayPessoas';

const PessoasList = () => {
  return (
    <div>
        <Welcome action="cadastrou" data="pessoa(s)." create='Nova pessoa' type='pessoas'/>          
        {/* <DisplayPessoas/> */}
        <ToastContainer theme='dark' limit='2'/>     
    </div>
  )
}

export default PessoasList