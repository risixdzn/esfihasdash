/*eslint-disable*/

import React, { useEffect, useState } from 'react'
import "../../css/modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUser, faImage, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../../../../../firebase-config';
import { UserAuth } from '../../../../../context/AuthContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';

function ModalProdutos({ show, setShowModal, selectedProduto, selectedModal, selectedPFP }) {
    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ displayErr, setDisplayErr ] = useState(false)
   
    //fecharmodal
    const handleCloseModal = () =>{
        setShowModal(false);
        setDisplayErr(false);
    }
    
    const { user } = UserAuth();    
    const navigate = useNavigate();

    // criarproduto
    const [ produtoName, setProdutoName] = useState("");
    const [ produtoPic, setProdutoPic] = useState("");
    
    async function criarProduto(e) {
        e.preventDefault();
        setIsLoading(true);
        
        const criaProduto = await setDoc(doc(db, "users", user.uid, "produtos", produtoName),{
          pedidos: 0,
          foto: produtoPic,   
          nome: produtoName,   
        });  
        navigate("/produtos/list");                
        // await new Promise(resolve => setTimeout(resolve, 1000)); // aguarda 1 segundo para a página recarregar completamente       
        setIsLoading(false);    
        localStorage.setItem("createdProduto", produtoName); // Armazena o nome da produto deletada no Local Storage 
        window.location.reload();
      }
    
      useEffect(()=>{
        const createdProduto = localStorage.getItem("createdProduto");//puxa o item do localstorage
        if (createdProduto) {
            toast.success("Produto " + createdProduto + " criado.");
            localStorage.removeItem("createdProduto"); // Remove a informação da notificação do Local Storage
        }
      },[user.uid])

    // deletarproduto
    async function deleteSelectedProduto(){
        //alert(deletingProduto);
        await deleteDoc(doc(db, "users", user.uid, "produtos", selectedProduto));           
        handleCloseModal();  
        localStorage.setItem("deletedProduto", selectedProduto); // Armazena o nome da produto deletada no Local Storage
        window.location.reload(true);  
    }       
    useEffect(()=>{
        const deletedProduto = localStorage.getItem("deletedProduto");//puxa o item do localstorage
        if (deletedProduto) {
            toast.success("Produto " + deletedProduto + " deletado.");
            localStorage.removeItem("deletedProduto"); // Remove a informação da notificação do Local Storage
        }
    },[user.uid])    

    //editar produto
    const [ newProdutoName , setNewProdutoName ] = useState("");
    const [ newProdutoPFP , setNewProdutoPFP ] = useState("");    
        
    async function editSelectedProduto(e){
        e.preventDefault();
        setIsLoading(true);   
        if (newProdutoName !== ""){
            setDisplayErr(false);
            await deleteDoc(doc(db, "users", user.uid, "produtos", selectedProduto));      
            const criaProduto = await setDoc(doc(db, "users", user.uid, "produtos", newProdutoName),{
                pedidos: 0,
                foto: (newProdutoPFP !== "" ? newProdutoPFP : selectedPFP),
                nome: (newProdutoName !== "" ? newProdutoName : selectedProduto),
            });     
            handleCloseModal();            
            localStorage.setItem("editedProduto", selectedProduto); // Armazena o nome da produto deletada no Local Storage
            window.location.reload(true);  
        } else{
            setDisplayErr(true)
        }          
    }
    useEffect(()=>{
        const editedProduto = localStorage.getItem("editedProduto");//puxa o item do localstorage
        if (editedProduto) {
            toast.success("Produto " + editedProduto + " editado.");
            localStorage.removeItem("editedProduto"); // Remove a informação da notificação do Local Storage
        }
    },[user.uid])  

    //switch para retornar o modal selecionado
    switch (selectedModal) {        
        //modal de deletar
        case "delete":
            return (
                <div className='modalcpn' style={ show ?{display:"flex"} : {display:"none"}}>
                    <div className="modal">
                        <h1 className='title'>Você está deletando: <br></br><span className='pessoaname'>{selectedProduto}</span></h1>
                        <div className="divisoria"></div>
                        <p className='desc'>Deletar uma produto é uma ação irreversível e exclui todos os dados relacionados a mesma.</p>
                        <h2 className='question'>Deseja continuar?</h2>
                        <div className='actions'>
                            <button className='cancelbtn' onClick={handleCloseModal}>Cancelar</button>
                            <button className='acceptbtn' onClick={deleteSelectedProduto}>Excluir <FontAwesomeIcon icon={faTrash}/></button>
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
                        <h1 className='title'>Você está editando: <br></br><span className='pessoaname'>{selectedProduto}</span></h1>
                        <div className="divisoria"></div>                         
                        <div className='imgplaceholder'>
                            <img src={selectedPFP !== "" ? selectedPFP : "../assets/img/user.png"} alt=''></img>
                        </div>
                        <div className='editform'>
                            <div className='inputcontainer' style={{marginTop:"30px"}}>              
                                <input type="text" id="text" name="text" placeholder='Nome*' autoFocus={false} 
                                    onChange={(event) =>{
                                    setNewProdutoName(event.target.value)
                                }}>       
                                </input>
                                <label className='control-label' htmlFor="text"><FontAwesomeIcon icon={faUser}/></label>
                            </div>   
                            <div className='inputcontainer'>              
                                <input type="url" id="url" name="url" placeholder='URL da foto' autoFocus={false} 
                                    onChange={(event) =>{
                                    setNewProdutoPFP(event.target.value);
                                }}>       
                                </input>
                                <label className='control-label' htmlFor="url"><FontAwesomeIcon icon={faImage}/></label>
                            </div>  
                            <span className='displayerr' style={displayErr ? {display:"block"}: {display:"none"}}>O campo "nome" é obrigatório.</span> 
                        </div>  
                                             
                        <div className='actions' style={{marginTop:"45px"}}>
                            <button className='cancelbtn' onClick={handleCloseModal}>Voltar</button>
                            <button className='acceptbtn orange' onClick={editSelectedProduto}>Salvar <FontAwesomeIcon icon={faFloppyDisk}/></button>
                        </div>
                    </div>
                </div>
            )
            break;    
        default:
            break;
    }
}

export default ModalProdutos