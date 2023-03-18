import React from 'react'
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase-config';
import { UserAuth } from '../../context/AuthContext';
import { createContext, useContext } from 'react';

const UserDbContext = createContext();

export const UserDbContextProvider = async ({children})=> {    
    const { user } = UserAuth();  

    async function criarDb() {
        const criaUsuario = await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            nome: user.displayName
        });
        alert("usuariocriado");   

        const criaPessoas = await setDoc(doc(db, "users", user.uid, "pessoas", user.displayName),{
            pedidos: 0,
        });
        alert("pessoascriado"); 
        const criaProdutos = await setDoc(doc(db, "users", user.uid, "produtos", "placeholder"),{
            info: null,
        });
        alert("produtoscriado"); 
        const criaPedidos = await setDoc(doc(db, "users", user.uid, "pedidos", "placeholder"),{
            info: null,
        });
        alert("pedidoscriado");         
    }     

    return (
        <UserDbContext.Provider value={ criarDb }>
            {children}
        </UserDbContext.Provider>
    )

    return(
        <button onClick={criarDb}>asd</button>
    )
}

export const NewUserDb = () =>{
    return useContext(UserDbContext);
}