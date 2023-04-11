
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

import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate(); 

  async function criarDb(user) {
    //alert(user.uid);    
    //alert(user.displayName);
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        nome: user.displayName
    });
    //alert("usuariocriado");   
    await setDoc(doc(db, "users", user.uid, "pessoas", user.displayName),{
        pedidos: 0,
        foto: "",
        nome: user.displayName,
    });
    //alert("pessoascriado"); 
    await setDoc(doc(db, "users", user.uid, "produtos", "Carne"),{
        nome: "Calabresa",
        foto: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-esfiha-de-carne-1.jpg"
    });
    //alert("produtoscriado"); 
    await setDoc(doc(db, "users", user.uid, "pedidos", "placeholder"),{
        info: null,
    });    
    //alert("pedidoscriado");         
  }  

  const register = async (registerEmail, registerPassword, displayName) =>{
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword) //colocar email e password no objeto usuario       
      await updateProfile(auth.currentUser, { displayName });//atualizar email e password dps que ja esta criado      
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
      switch (error.code) {
          case "auth/invalid-email":
              toast.warn("Email invalido.", { toastId: "wrong-email" })
              break;
          case "auth/weak-password":
              toast.warn("A senha deve conter 6 ou mais caracteres", {
                  toastId: "weak-pass",
              })
              break;
          case "auth/email-already-in-use":
              toast.warn("O email fornecido ja está em uso.", {
                  toastId: "in-use",
              })
              break;
          default: break;
      }
    } 
  }   

  const login = async (loginEmail, loginPassword,) =>{
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword) //colocar email e password no objeto usuario    
      console.log(user); 
      navigate('/home') 
    }catch (error){  
      switch (error.code) {
          case "auth/invalid-email":
              toast.warn("Email invalido.", { toastId: "inv-email" })
          break;
          case "auth/wrong-password":
              toast.warn("Senha incorreta.", { toastId: "inv-pass" })
          break;
          default: break;
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