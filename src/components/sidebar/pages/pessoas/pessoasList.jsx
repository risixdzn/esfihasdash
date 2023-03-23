import React, { useEffect } from 'react'
import Welcome from '../components/Welcome/welcome'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DisplayPessoas from '../../../../db/DisplayPessoas/DisplayPessoas';
import ModalDeletePessoas from './modals/modalDeletePessoa';

import { useState, createContext, useContext } from 'react';

import { useModal } from './modals/ModalProvider';

const PessoasList = () => {
  const { showModal, setShowModal } = useModal(false);
  const [deletingPessoa, setDeletingPessoa] = useState();

  return (
    <div style={showModal? {Y:"hidden"}:{Y:"scroll"}}>
        <ModalDeletePessoas show={showModal} setShowModal={setShowModal} deletingPessoa={deletingPessoa}/>
        <Welcome action="cadastrou" data="pessoa(s)." create='Nova pessoa' type='pessoas'/>          
        <DisplayPessoas setShowModal={setShowModal} setDeletingPessoa={setDeletingPessoa}/>
        <ToastContainer theme='dark' limit='2'/>          
    </div>
  )
}

export default PessoasList