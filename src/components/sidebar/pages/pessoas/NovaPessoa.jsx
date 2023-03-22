import React, { useContext, useState } from 'react'
import './NovaPessoa.css'
import { faUser, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, usehistor } from 'react-router-dom';

import { UserAuth } from '../../../../context/AuthContext';

import { db } from '../../../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updatePessoasCount } from '../../../../db/FetchPessoas';

function NovaPessoa() {

  const { user } = UserAuth();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ pessoaName, setPessoaName] = useState("");
  const [ pessoaPic, setPessoaPic] = useState("");
  const [ pessoas, setPessoas ] = useState(0);

  const navigate = useNavigate();

  async function criarPessoa(e) {
    e.preventDefault();
    setIsLoading(true);
    
    const criaPessoa = await setDoc(doc(db, "users", user.uid, "pessoas", pessoaName),{
      pedidos: 0,
      foto: pessoaPic,      
    });  
    navigate("/pessoas/list");                
    // await new Promise(resolve => setTimeout(resolve, 1000)); // aguarda 1 segundo para a página recarregar completamente       
    setIsLoading(false);     
  }

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

        <button className="entrarBtn" type='submit'>{isLoading ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}}></img> : "Cadastrar"}</button>   

        <p><Link to='/pessoas/list' className='linkbtn'>Voltar</Link></p>
      </form>      
    </div>
  )
}

export default NovaPessoa