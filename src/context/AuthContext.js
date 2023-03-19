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

import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase-config';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate(); 

  async function criarDb(user) {
    //alert(user.uid);    
    //alert(user.displayName);
    const criaUsuario = await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        nome: user.displayName
    });
    //alert("usuariocriado");   

    const criaPessoas = await setDoc(doc(db, "users", user.uid, "pessoas", user.displayName),{
        pedidos: 0,
    });
    //alert("pessoascriado"); 
    const criaProdutos = await setDoc(doc(db, "users", user.uid, "produtos", "placeholder"),{
        info: null,
    });
    //alert("produtoscriado"); 
    const criaPedidos = await setDoc(doc(db, "users", user.uid, "pedidos", "placeholder"),{
        info: null,
    });    
    //alert("pedidoscriado");      
  }            

  const register = async (registerEmail, registerPassword, displayName) =>{
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword) //colocar email e password no objeto usuario       
      const updateDisplayname = await updateProfile(auth.currentUser, { displayName });//atualizar email e password dps que ja esta criado      
      console.log(user); 
      navigate('/home');
      onAuthStateChanged(auth, (user) => {
        if (user) {
          criarDb(user);
        } else {
          console.log("User is" + user)
        }
      });      
      toast.warn("1")  ;     
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
    <UserContext.Provider value={{ register, user, logout, login, criarDb }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};