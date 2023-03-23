import React from 'react'
import "./modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ModalDeletePessoas({ show, setShowModal, deletingPessoa }) {
    
    const handleCloseModal = () =>{
        setShowModal(false);
    }
    
    return (
        <div className='modalcpn' style={ show ?{display:"flex"} : {display:"none"}}>
            <div className="modal">
                <h1 className='title'>Você está deletando: <br></br><span className='pessoaname'>{deletingPessoa}</span></h1>
                <div className="divisoria"></div>
                <p className='desc'>Deletar uma pessoa é uma ação irreversível e exclui todos os dados relacionados a mesma.</p>
                <h2 className='question'>Deseja continuar?</h2>
                <div className='actions'>
                    <button className='cancelbtn' onClick={handleCloseModal}>Cancelar</button>
                    <button className='acceptbtn'>Excluir <FontAwesomeIcon icon={faTrash}/></button>
                </div>
            </div>
        </div>
  )
}

export default ModalDeletePessoas