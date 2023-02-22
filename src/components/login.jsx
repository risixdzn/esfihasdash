
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt , faLock, faUser} from '@fortawesome/free-solid-svg-icons'
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
      <div className="bodyWrap">
        <div className="content">
          <div className="heroSec">
            <motion.img src='../assets/svg/esfihasdash-logo.svg' alt='logo'
              animate={{opacity:1, scale:1}}
              initial={{opacity:0, scale:1}}
              transition={{duration:0.5}}
            ></motion.img>            
            <h1 className="heroText">O que acontece <b>aqui</b>,<br></br><b>fica</b> aqui.</h1>
            <p className="heroDesc">Conecte-se ao sistema para continuar.</p>
          </div> 
          <div className="loginSec">
            <div className="wrapper">
              <img src='../assets/svg/esfihasdash-logo.svg' alt='logo'></img>  

              <h1 className="title">Login</h1>   

              <form onSubmit={handleLogin}>
                <p className="label"><FontAwesomeIcon icon={faAt}/> Email</p>
                <input type="email" id="email"placeholder="example@example.com" 
                  onChange={(event) =>{
                  setLoginEmail(event.target.value)}}>                  
                </input>

                <p className="label"><FontAwesomeIcon icon={faLock}/> Senha</p>
                <input type="password" id="password"placeholder="••••••••"
                  onChange={(event) =>{
                  setLoginPassword(event.target.value)}}>
                </input>
                
                <button className="entrarBtn" type='submit'>Entrar</button>
              </form>
              

              <p className="accQuestion">Ainda não possui uma conta?</p>
              <Link to="/register">
                <a className="accAction" >Cadastrar-se</a>
              </Link>

              <h4 style={{color:"white"}}>{user?.displayName}</h4>
              
              <button onClick={logout}>Logout</button>       

              <button onClick={notify}>Notificar</button>

              <ToastContainer theme='dark' limit='2'/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


