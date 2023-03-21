import React, { useState } from 'react'
import './NovaPessoa.css'
import { faUser, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function NovaPessoa() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='wrapper'>      
      <form>
        <h1 className='title'>Nova pessoa</h1>
        <div className='inputcontainer'>              
          <input disabled={isLoading? true : false} type="name" id="name" name="Name" placeholder='Nome *' autoFocus={false}></input>
          <label className='control-label' htmlFor="email"><FontAwesomeIcon icon={faUser}/></label>
        </div>     

        <div className='inputcontainer'>              
          <input disabled={isLoading? true : false} type="Foto" id="Foto" name="Foto" placeholder='URL da foto (opcional)' autoFocus={false}></input>
          <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faImage}/></label>
         </div>    

        <button className="entrarBtn" type='submit'>{isLoading ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}}></img> : "Entrar"}</button>   

        <p><Link to='/pessoas/list' className='linkbtn'>Voltar</Link></p>
      </form>
    </div>
  )
}

export default NovaPessoa