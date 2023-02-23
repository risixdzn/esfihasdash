import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { ErrPTBR } from './FirebaseErrorContext';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();  

  
  const register = async (registerEmail, registerPassword, displayName) =>{
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword) //colocar email e password no objeto usuario       
      const updateDisplayname = await updateProfile(auth.currentUser, { displayName });//atualizar email e password dps que ja esta criado
      
      console.log(user); 
      navigate('/home');
      console.log('registrado')  ;    
    } catch (error){
      switch(error.code){
        case 'auth/invalid-email': toast.warn("Email invalido.", {toastId: "wrong-email"})
        case 'auth/weak-password': toast.warn("A senha deve conter 6 ou mais caracteres", {toastId: "weak-pass"})
        case 'auth/email-already-in-use': toast.warn("O email fornecido ja está em uso.", {toastId: "in-use"})
      }
    }  
  }  

  const login = async (loginEmail, loginPassword,) =>{
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword) //colocar email e password no objeto usuario    
      console.log(user); 
      navigate('/home') 
    }catch (error){  
      switch(error.code){
        case 'auth/invalid-email': toast.warn("Email invalido.", {toastId: "inv-email"})
        case 'auth/wrong-password': toast.warn("Senha incorreta.", {toastId: "inv-pass"})
      }
    }      
  }

  const logout = () => {
    return signOut(auth);              
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ register, user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};