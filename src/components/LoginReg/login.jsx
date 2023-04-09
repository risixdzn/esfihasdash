
import '../../App.css';
import './loginreg.css'
import '../../reset.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom'
import { useState} from "react";
import { motion } from 'framer-motion';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { UserAuth } from '../../context/AuthContext';

function Login() { 

  const[loginEmail, setLoginEmail] = useState("")
  const[loginPassword, setLoginPassword] = useState("")
  const { login } = UserAuth();  

  
  const[isLoading, setIsLoading] = useState(false);

  
  const handleLogin = async (e) => {    
    e.preventDefault();    
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword)             
    } catch (error) {   
      console.log(error);
      setIsLoading(false);
    } finally{
      setIsLoading(false);
    }
  };  
   

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
          <img src="../assets/svg/esfihasdash-logo.svg" alt=''/>
          <h1>Faça seu login<br></br>na plataforma.</h1>
        </motion.div>
        <motion.div className="rightcontent" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x:0 }} viewport={{ once: true }}>
          <form onSubmit={handleLogin}>
            <div className='inputcontainer'>              
              <input disabled={isLoading? true : false} type="email" id="email" name="Name" placeholder='Email' autoFocus={false} 
                onChange={(event) =>{
                setLoginEmail(event.target.value)}}>       
              </input>
              <label className='control-label' htmlFor="email"><FontAwesomeIcon icon={faEnvelope}/></label>
            </div>     

            <div className='inputcontainer'>              
              <input disabled={isLoading? true : false} type="password" id="password" name="password" placeholder='Senha' autoFocus={false}
                onChange={(event) =>{
                setLoginPassword(event.target.value)}}>       
              </input>
              <label className='control-label' htmlFor="password"><FontAwesomeIcon icon={faLock}/></label>
            </div>    

            <button className="entrarBtn" type='submit'>{isLoading ? <img src='../assets/gif/rippleloader.svg' style={{height:"75%"}} alt=''></img> : "Entrar"}</button>   

            <p>Ainda não tem uma conta? <Link to='/register' className='linkbtn'>Registre-se</Link></p>
          </form>
        </motion.div>
      </div>      
      <ToastContainer theme="colored" limit="2"/>
    </div>
  );
}

export default Login;


