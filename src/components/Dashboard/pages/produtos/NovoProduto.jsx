import React, {  useState, useEffect } from 'react'
import '../css/NovoItem.css'
import { faPizzaSlice, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import { UserAuth } from '../../../../context/AuthContext';

import { db } from '../../../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function NovoProduto() {
  const { user } = UserAuth();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ produtoName, setProdutoName] = useState("");
  const [ produtoPic, setProdutoPic] = useState("");

  const navigate = useNavigate();

  async function criarProduto(e) {
    e.preventDefault();
    setIsLoading(true);
    
    //criaproduto
    await setDoc(doc(db, "users", user.uid, "produtos", produtoName),{
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

  return (
    <div className='wrapper'>      
      <form className='novoitem' onSubmit={criarProduto}>
        <h1 className='title'>Novo produto</h1>
        <div className='inputcontainer'>              
          <input required={true} disabled={isLoading? true : false} type="text" id="name" name="Name" placeholder='Nome do produto (*)' autoFocus={false}
            onChange={(event) =>{
            setProdutoName(event.target.value)}}>    
          </input>
          <label className='control-label' htmlFor="email"><FontAwesomeIcon icon={faPizzaSlice}/></label>
        </div>     

        <div className='inputcontainer'>              
          <input required={false} disabled={isLoading? true : false} type="url" id="Foto" name="Foto" placeholder='URL da foto (opcional)' autoFocus={false}
            onChange={(event) =>{
            setProdutoPic(event.target.value)}}>    
          </input>
          <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faImage}/></label>
         </div>    

        <button className="entrarBtn" type='submit'>{isLoading ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}}alt=''></img> : "Cadastrar"}</button>   

        <p><Link to='/produtos/list' className='linkbtn'>Voltar</Link></p>
      </form>      
    </div>
  )
}

export default NovoProduto