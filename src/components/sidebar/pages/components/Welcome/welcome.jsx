import React from 'react'
import './welcome.css'
import { UserAuth } from '../../../../../context/AuthContext';
import { useState } from 'react';

import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import Clock from './clock';
import { DataHoje } from './date';

export const Welcome = () => {
  const { user, logout } = UserAuth();  

  const { time, setTime } = useState('');
  
  let [ pedidos,  setPedidos ] = useState(0);

    setTimeout(() => {
        async function fetchPedidos(){
            const pedidosRef = collection(db, "users", user.uid, "pedidos");        
            const snapshot = await getCountFromServer(pedidosRef);             
            setPedidos((snapshot.data().count)-1);   
        }      
        fetchPedidos();  ;
    }, 1);

  return (
    <div className='maincontainer'>
      <div className="left_content">
        <span className='welcomespan'>
          <h1 className='welcome_message'>Bem vindo, {user.displayName}.</h1>
        </span>        
        <h2 className="pedidos_current">Você fez {pedidos} pedido(s).</h2>
        <button className='novo_pedido'>Novo pedido</button>
        
      </div>
      <div className="divisoria_vertical"></div>
      <div className="divisoria_horizontal"></div>
      <div className="right_content">
        <Clock isLoading={true}/>
        <DataHoje/>
      </div>
    </div>
  )
}

export default Welcome