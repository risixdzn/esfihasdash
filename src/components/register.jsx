
import '../App.css';
import './css/loginreg.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope , faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'
import { motion } from 'framer-motion';

import { UserAuth } from '../context/AuthContext';

import { ToastContainer } from 'react-toastify';

function Registrar() {

  const[registerEmail, setRegisterEmail] = useState("")
  const[registerPassword, setRegisterPassword] = useState("")
  const[displayName, setRegisterDisplayName] = useState("")
  const[buttonLoad, setButtonLoad] = useState(false);
  
  const { register } = UserAuth(); 
  const { criarDb } = UserAuth();  

  const navigate = useNavigate(); 

  const handleRegister = async (e) => {    
    setButtonLoad(true);
    try {      
      await register(registerEmail, registerPassword, displayName);     
      const user = UserAuth().currentUser;              
    } catch (error) {
      console.log(error.message);
      setButtonLoad(false);
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
                <input type="text" id="exibicaonome" required name="exibicaonome" placeholder='Nome de exibição' autoFocus={false} 
                  onChange={(event) =>{
                  setRegisterDisplayName(event.target.value)}}>       
                </input>
                <label className='control-label' htmlFor="exibicaonome"><FontAwesomeIcon icon={faUser}/></label>
              </div>     

              <div className='inputcontainer'>              
                <input type="email" id="email" name="email" required placeholder='Email' autoFocus={false}
                  onChange={(event) =>{
                  setRegisterEmail(event.target.value)}}>       
                </input>
                <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faEnvelope}/></label>
              </div>   

              <div className='inputcontainer'>              
                <input type="password" id="password" name="password" placeholder='Senha' required autoFocus={false} 
                  onChange={(event) =>{
                  setRegisterPassword(event.target.value)}}>       
                </input>
                <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faLock}/></label>
              </div>  

            <button className="entrarBtn" type='submit' onClick={handleRegister}>{buttonLoad ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}}></img> : "Registre-se"}</button>   

            <p>Ja tem uma conta? <Link to='/login' className='linkbtn'>Entrar</Link></p>
          </div>
        </motion.div>
        <motion.div className="leftcontentregister" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }}>
          <img src="../assets/svg/esfihasdash-logo.svg"/>
          <h1>Registre-se<br></br>na plataforma.</h1>
        </motion.div>
      </div>
      <ToastContainer theme='dark' limit='2'/> 
    </div>
  );
}

export default Registrar;
