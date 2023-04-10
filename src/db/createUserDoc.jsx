import React from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { UserAuth } from '../context/AuthContext';
import { createContext, useContext } from 'react';

const UserDbContext = createContext();

export const UserDbContextProvider = async ({children})=> {    
    const { user } = UserAuth();  

    async function criarDb() {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            nome: user.displayName
        });
        alert("usuariocriado");   

        await setDoc(doc(db, "users", user.uid, "pessoas", user.displayName),{
            pedidos: 0,
        });
        alert("pessoascriado"); 
        await setDoc(doc(db, "users", user.uid, "produtos", "placeholder"),{
            info: null,
        });
        alert("produtoscriado"); 
        await setDoc(doc(db, "users", user.uid, "pedidos", "placeholder"),{
            info: null,
        });
        alert("pedidoscriado");         
    }     

    return (
        <UserDbContext.Provider value={ criarDb }>
            {children}
        </UserDbContext.Provider>
    )    
}

export const NewUserDb = () =>{
    return useContext(UserDbContext);
}