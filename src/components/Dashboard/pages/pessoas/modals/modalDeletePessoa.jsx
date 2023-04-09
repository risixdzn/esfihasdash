/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import "./modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUser, faImage, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../../../../firebase-config';
import { UserAuth } from '../../../../../context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

function ModalDeletePessoas({ show, setShowModal, selectedPessoa, selectedModal, selectedPFP }) {
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ displayErr, setDisplayErr ] = useState(false)

    //fecharmodal
    const handleCloseModal = () =>{
        setShowModal(false);
        setDisplayErr(false);
    }
    
    const { user } = UserAuth();    
    const navigate = useNavigate();

    // criarpessoa
    const [ pessoaName, setPessoaName] = useState("");
    const [ pessoaPic, setPessoaPic] = useState("");
    
    async function criarPessoa(e) {
        e.preventDefault();
        setIsLoading(true);
        
        const criaPessoa = await setDoc(doc(db, "users", user.uid, "pessoas", pessoaName),{
          pedidos: 0,
          foto: pessoaPic,   
          nome: pessoaName,   
        });  
        navigate("/pessoas/list");                
        // await new Promise(resolve => setTimeout(resolve, 1000)); // aguarda 1 segundo para a página recarregar completamente       
        setIsLoading(false);    
        localStorage.setItem("createdPessoa", pessoaName); // Armazena o nome da pessoa deletada no Local Storage 
        window.location.reload();
      }
    
      useEffect(()=>{
        const createdPessoa = localStorage.getItem("createdPessoa");//puxa o item do localstorage
        if (createdPessoa) {
            toast.success("Pessoa " + createdPessoa + " criada.");
            localStorage.removeItem("createdPessoa"); // Remove a informação da notificação do Local Storage
        }
      },[user.uid])

    // deletarpessoa
    async function deleteSelectedPessoa(){
        //alert(deletingPessoa);
        await deleteDoc(doc(db, "users", user.uid, "pessoas", selectedPessoa));           
        handleCloseModal();  
        localStorage.setItem("deletedPessoa", selectedPessoa); // Armazena o nome da pessoa deletada no Local Storage
        window.location.reload(true);  
    }       
    useEffect(()=>{
        const deletedPessoa = localStorage.getItem("deletedPessoa");//puxa o item do localstorage
        if (deletedPessoa) {
            toast.success("Pessoa " + deletedPessoa + " deletada.");
            localStorage.removeItem("deletedPessoa"); // Remove a informação da notificação do Local Storage
        }
    },[user.uid])    

    //editar pessoa
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
            localStorage.setItem("editedPessoa", selectedPessoa); // Armazena o nome da pessoa deletada no Local Storage
            window.location.reload(true);  
        } else{
            setDisplayErr(true)
        }          
    }
    useEffect(()=>{
        const editedPessoa = localStorage.getItem("editedPessoa");//puxa o item do localstorage
        if (editedPessoa) {
            toast.success("Pessoa " + editedPessoa + " editada.");
            localStorage.removeItem("editedPessoa"); // Remove a informação da notificação do Local Storage
        }
    },[user.uid])  

    //switch para retornar o modal selecionado
    switch (selectedModal) {
        case "cadastrou":
            return(
                <div className='modalcpn' style={ show ?{display:"flex"} : {display:"none"}}>
                    <div className="modal">
                        <h1 className='title'>Nova pessoa</h1>
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
        //modal de deletar
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
        //modal de editar
        case "edit":
            return (
                <div className='modalcpn' style={ show ?{display:"flex"} : {display:"none"}}>
                    <div className="modal">
                        <h1 className='title'>Você está editando: <br></br><span className='pessoaname'>{selectedPessoa}</span></h1>
                        <div className="divisoria"></div>                         
                        <div className='imgplaceholder'>
                            <img src={selectedPFP !== "" ? selectedPFP : "../assets/img/user.png"} alt=''></img>
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