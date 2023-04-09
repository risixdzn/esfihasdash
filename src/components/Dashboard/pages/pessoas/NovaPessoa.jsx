import React, {  useState, useEffect } from 'react'
import './NovaPessoa.css'
import { faUser, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import { UserAuth } from '../../../../context/AuthContext';

import { db } from '../../../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function NovaPessoa() {

  const { user } = UserAuth();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ pessoaName, setPessoaName] = useState("");
  const [ pessoaPic, setPessoaPic] = useState("");

  const navigate = useNavigate();

  async function criarPessoa(e) {
    e.preventDefault();
    setIsLoading(true);
    
    //criapessoa
    await setDoc(doc(db, "users", user.uid, "pessoas", pessoaName),{
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

  return (
    <div className='wrapper'>      
      <form className='novapessoa' onSubmit={criarPessoa}>
        <h1 className='title'>Nova pessoa</h1>
        <div className='inputcontainer'>              
          <input required={true} disabled={isLoading? true : false} type="text" id="name" name="Name" placeholder='Nome *' autoFocus={false}
            onChange={(event) =>{
            setPessoaName(event.target.value)}}>    
          </input>
          <label className='control-label' htmlFor="email"><FontAwesomeIcon icon={faUser}/></label>
        </div>     

        <div className='inputcontainer'>              
          <input required={false} disabled={isLoading? true : false} type="url" id="Foto" name="Foto" placeholder='URL da foto (opcional)' autoFocus={false}
            onChange={(event) =>{
            setPessoaPic(event.target.value)}}>    
          </input>
          <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faImage}/></label>
         </div>    

        <button className="entrarBtn" type='submit'>{isLoading ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}}alt=''></img> : "Cadastrar"}</button>   

        <p><Link to='/pessoas/list' className='linkbtn'>Voltar</Link></p>
      </form>      
    </div>
  )
}

export default NovaPessoa