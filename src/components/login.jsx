
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt , faLock, faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect, createContext} from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, getAuth } from 'firebase/auth';
import { auth } from '../firebase-config'
import { motion } from 'framer-motion';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import { UserAuth } from '../context/AuthContext';

import { ErrPTBR } from '../context/FirebaseErrorContext';

function Login() { 

  const[loginEmail, setLoginEmail] = useState("")
  const[loginPassword, setLoginPassword] = useState("")
  const { login } = UserAuth();  

  const[user, setUser] = useState({});

  //check if user is connected
  const auth = getAuth();  

  const navigate = useNavigate();

  const firebaseErrors = ErrPTBR();

  const handleLogin = async (e) => {    
    e.preventDefault();    
    try {
      await login(loginEmail, loginPassword)             
    } catch (error) {      
    }    
  };  
   
  const logout = async () =>{
    await signOut(auth);       
  }

  const notify = () =>{
    toast("teste notificação",{
      theme:"dark",
    });
  }

  return (
    <div className="App">
      <div className='eyecatch'>
        <p>Desenvolvido por Ricardo Amorim.</p>
      </div>
      <nav className='navbar' style={{boxShadow:'0px 4px 38px 2px rgba(244,106,40,0.25)'}}>            
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
      <div className="bodyWrap">        
        <motion.div className="leftcontent" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }}>
          <img src="../assets/svg/esfihasdash-logo.svg"/>
          <h1>Faça seu login<br></br>na plataforma.</h1>
        </motion.div>
        <motion.div className="rightcontent" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }}>
          <form onSubmit={handleLogin}>
            <div className='inputcontainer'>              
              <input type="email" id="email" name="Name" placeholder='Email' autoFocus={false} 
                onChange={(event) =>{
                setLoginEmail(event.target.value)}}>       
              </input>
              <label className='control-label' htmlFor="email"><FontAwesomeIcon icon={faEnvelope}/></label>
            </div>     

            <div className='inputcontainer'>              
              <input type="password" id="password" name="password" placeholder='Senha' autoFocus={false}
                onChange={(event) =>{
                setLoginPassword(event.target.value)}}>       
              </input>
              <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faLock}/></label>
            </div>    

            <button className="entrarBtn" type='submit'>Entrar</button>   

            <p>Ainda não tem uma conta? <Link to='/register' className='linkbtn'>Registre-se</Link></p>
          </form>
        </motion.div>
      </div>
      <ToastContainer theme='dark' limit='2'/> 
    </div>
  );
}

export default Login;


