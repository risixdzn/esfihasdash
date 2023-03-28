import React, { useState } from 'react'
import "./modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUser, faImage, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../../../../firebase-config';
import { UserAuth } from '../../../../../context/AuthContext';

function ModalDeletePessoas({ show, setShowModal, selectedPessoa, selectedModal, selectedPFP }) {
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [displayErr, setDisplayErr] = useState(false)

    const handleCloseModal = () =>{
        setShowModal(false);
        setDisplayErr(false);
    }
    
    const { user } = UserAuth();    

    async function deleteSelectedPessoa(){
        //alert(deletingPessoa);
        await deleteDoc(doc(db, "users", user.uid, "pessoas", selectedPessoa));           
        handleCloseModal();            
        window.location.reload();
    }    

    const [ newPessoaName , setNewPessoaName ] = useState("");
    const [ newPessoaPFP , setNewPessoaPFP ] = useState("");
    
    
    async function editSelectedPessoa(e){
        e.preventDefault();
        setIsLoading(true);   
        if (newPessoaName !== ""){
            setDisplayErr(false);
            await deleteDoc(doc(db, "users", user.uid, "pessoas", selectedPessoa));      
            const criaPessoa = await setDoc(doc(db, "users", user.uid, "pessoas", newPessoaName),{
                pedidos: 0,
                foto: (newPessoaPFP !== "" ? newPessoaPFP : selectedPFP),
                nome: (newPessoaName !== "" ? newPessoaName : selectedPessoa),
            });     
            handleCloseModal();            
            window.location.reload();  
        } else{
            setDisplayErr(true)
        }
          
    }
    
    //switch para retornar o modal selecionado
    switch (selectedModal) {
        case "delete":
            return (
                <div className='modalcpn' style={ show ?{display:"flex"} : {display:"none"}}>
                    <div className="modal">
                        <h1 className='title'>Você está deletando: <br></br><span className='pessoaname'>{selectedPessoa}</span></h1>
                        <div className="divisoria"></div>
                        <p className='desc'>Deletar uma pessoa é uma ação irreversível e exclui todos os dados relacionados a mesma.</p>
                        <h2 className='question'>Deseja continuar?</h2>
                        <div className='actions'>
                            <button className='cancelbtn' onClick={handleCloseModal}>Cancelar</button>
                            <button className='acceptbtn' onClick={deleteSelectedPessoa}>Excluir <FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </div>
                </div>
            )
            break;  
        case "edit":
            return (
                <div className='modalcpn' style={ show ?{display:"flex"} : {display:"none"}}>
                    <div className="modal">
                        <h1 className='title'>Você está editando: <br></br><span className='pessoaname'>{selectedPessoa}</span></h1>
                        <div className="divisoria"></div>                         
                        <div className='imgplaceholder'>
                            <img src={selectedPFP !== "" ? selectedPFP : "../assets/img/user.png"}></img>
                        </div>
                        <div className='editform'>
                            <div className='inputcontainer' style={{marginTop:"30px"}}>              
                                <input type="text" id="text" name="text" placeholder='Nome*' autoFocus={false} 
                                    onChange={(event) =>{
                                    setNewPessoaName(event.target.value)
                                }}>       
                                </input>
                                <label className='control-label' htmlFor="text"><FontAwesomeIcon icon={faUser}/></label>
                            </div>   
                            <div className='inputcontainer'>              
                                <input type="url" id="url" name="url" placeholder='URL da foto' autoFocus={false} 
                                    onChange={(event) =>{
                                    setNewPessoaPFP(event.target.value);
                                }}>       
                                </input>
                                <label className='control-label' htmlFor="url"><FontAwesomeIcon icon={faImage}/></label>
                            </div>  
                            <span className='displayerr' style={displayErr ? {display:"block"}: {display:"none"}}>O campo "nome" é obrigatório.</span> 
                        </div>  
                                             
                        <div className='actions' style={{marginTop:"45px"}}>
                            <button className='cancelbtn' onClick={handleCloseModal}>Voltar</button>
                            <button className='acceptbtn orange' onClick={editSelectedPessoa}>Salvar <FontAwesomeIcon icon={faFloppyDisk}/></button>
                        </div>
                    </div>
                </div>
            )
            break;    
        default:
            break;
    }
}

export default ModalDeletePessoas