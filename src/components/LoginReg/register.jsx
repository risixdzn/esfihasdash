
import '../../App.css';
import './loginreg.css'
import '../../reset.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope , faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState } from "react";
import { motion } from 'framer-motion';

import { UserAuth } from '../../context/AuthContext';
import { ToastContainer } from 'react-toastify';

function Registrar() {

  const[registerEmail, setRegisterEmail] = useState("")
  const[registerPassword, setRegisterPassword] = useState("")
  const[displayName, setRegisterDisplayName] = useState("")
  const[isLoading, setIsLoading] = useState(false);
  
  const { register } = UserAuth(); 

  const handleRegister = async (e) => {    
    setIsLoading(true);
    try {      
      await register(registerEmail, registerPassword, displayName);       
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    } finally{
      setIsLoading(false);
    }       
  };  
  
  return (
    <div className="App">
      <div className='eyecatchregister'>
          <p>Desenvolvido por Ricardo Amorim.</p>
        </div>
        <nav className='navbarregister orangeshadow'>            
          <motion.div className='logo' initial={{ x: -25 , opacity: 0 }} whileInView={{ x: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.5}}>
            <a href='/'><img src='../assets/svg/minimal-esfihasdash-logo.svg' alt='ashd'></img></a>
          </motion.div>
        <div className='links'>
            <ul>
              <motion.a className='link' href='/#hero' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>Home</motion.a>
              <motion.a className='link' href='/#funcoes' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>Funções</motion.a>
              <motion.a className='link' href='/#tech' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>Desenvolvimento</motion.a>
            </ul>
          </div>
          <motion.div className='buttons' initial={{ x: 25 , opacity: 0 }} whileInView={{ x: 0, opacity: 1}} viewport={{ once: true }} transition={{delay: 0.5}}>
              <Link to="/" className='loginbtn'>
              Home</Link>             
          </motion.div>
        </nav>
      <div className="bodyWrapRegister">      
          <motion.div className="rightcontentregister" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }}>
            <div className='form'>
              <div className='inputcontainer'>              
                <input disabled={isLoading? true : false} type="text" id="exibicaonome" required name="exibicaonome" placeholder='Nome de exibição' autoFocus={false} 
                  onChange={(event) =>{
                  setRegisterDisplayName(event.target.value)}}>       
                </input>
                <label className='control-label' htmlFor="exibicaonome"><FontAwesomeIcon icon={faUser}/></label>
              </div>     

              <div className='inputcontainer'>              
                <input disabled={isLoading? true : false} type="email" id="email" name="email" required placeholder='Email' autoFocus={false}
                  onChange={(event) =>{
                  setRegisterEmail(event.target.value)}}>       
                </input>
                <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faEnvelope}/></label>
              </div>   

              <div className='inputcontainer'>              
                <input disabled={isLoading? true : false} type="password" id="password" name="password" placeholder='Senha' required autoFocus={false} 
                  onChange={(event) =>{
                  setRegisterPassword(event.target.value)}}>       
                </input>
                <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faLock}/></label>
              </div>  

            <button className="entrarBtn" type='submit' onClick={handleRegister}>{isLoading ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}} alt=''></img> : "Registre-se"}</button>   

            <p>Ja tem uma conta? <Link to='/login' className='linkbtn'>Entrar</Link></p>
          </div>
        </motion.div>
        <motion.div className="leftcontentregister" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }}>
          <img src="../assets/svg/esfihasdash-logo.svg" alt=''/>
          <h1>Registre-se<br></br>na plataforma.</h1>
        </motion.div>
      </div>
      <ToastContainer theme="colored" limit="2"/>
    </div>
  );
}

export default Registrar;
