import React from 'react'
import './welcome.css'
import { UserAuth } from '../../../../../context/AuthContext';
import { useState } from 'react';

import Clock from './clock';
import { DataHoje } from './date';

export const Welcome = () => {
  const { user, logout } = UserAuth();  

  const { time, setTime } = useState('');

  function formatTime(val) {
     
  }

  return (
    <div className='maincontainer'>
      <div className="left_content">
        <span>
          <h1 className='welcome_message'>Bem vindo, {user.displayName}.</h1>
        </span>        
        <h2 className="pedidos_current">Você fez ? pedidos.</h2>
        <button className='novo_pedido'>Novo pedido</button>
        
      </div>
      <div className="divisoria_vertical"></div>
      <div className="divisoria_horizontal"></div>
      <div className="right_content">
        <Clock/>
        <DataHoje/>
      </div>
    </div>
  )
}

export default Welcome