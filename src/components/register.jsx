
import '../App.css';
import './css/loginreg.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt , faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { auth } from '../firebase-config'

import { UserAuth } from '../context/AuthContext';

import { ToastContainer } from 'react-toastify';

function Registrar() {

  const[registerEmail, setRegisterEmail] = useState("")
  const[registerPassword, setRegisterPassword] = useState("")
  const[displayName, setRegisterDisplayName] = useState("")

  const { register } = UserAuth(); 

  const navigate = useNavigate();
 
  const handleRegister = async (e) => {    
    try {
      await register(registerEmail, registerPassword, displayName)      
    } catch (error) {
      console.log(error.message);
    }        
  };
  
  return (
    <div className="App">
      <div className="bodyWrap">
        <div className="content">
          <div className="heroSec">
            <img src='../assets/svg/esfihasdash-logo.svg' alt='logo'></img>            
            <h1 className="heroText">Seus <b>pedidos</b>, <br></br><b>um</b> só lugar.</h1>
            <p className="heroDesc">Conecte-se ao sistema para continuar.</p>
          </div>
          <div className="loginSec">
            <div className="wrapper">
              <img src='../assets/svg/esfihasdash-logo.svg' alt='logo'></img>  

              <h1 className="title">Registrar</h1>              
              
              <p className="label"><FontAwesomeIcon icon={faUser}/> Nome de exibição</p>
              <input type="text" id="name"placeholder="John Doe"
                onChange={(event) =>{
                setRegisterDisplayName(event.target.value)}}>
              </input>

              <p className="label"><FontAwesomeIcon icon={faAt}/> Email</p>
              <input type="email" id="email"placeholder="example@example.com"
                onChange={(event) =>{
                setRegisterEmail(event.target.value)}}>
              </input>

              <p className="label"><FontAwesomeIcon icon={faLock}/> Senha</p>
              <input type="password" id="password"placeholder="••••••••"
                onChange={(event) =>{
                setRegisterPassword(event.target.value)}}>
              </input>
                           
              <button className="entrarBtn" onClick={handleRegister}>Registrar</button>
              
              <p className="accQuestion">Ja possui uma conta?</p>
              <Link to="/login">
                <a className="accAction" >Entrar</a>
              </Link>    

              <ToastContainer theme="dark"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
