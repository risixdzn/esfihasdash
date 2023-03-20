import React from 'react'
import './welcome.css'
import { UserAuth } from '../../../../../context/AuthContext';
import { useState } from 'react';

import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import Clock from './clock';
import { DataHoje } from './date';

import PedidosCount from '../../../../../db/FetchPedidos';
import PessoasCount from '../../../../../db/FetchPessoas';
import ProdutosCount from '../../../../../db/FetchProdutos';

export const Welcome = (props) => {
  const { user } = UserAuth();  

  const type = props.type;
  let countComponent;  

  if (type === "pedidos") {
    countComponent = <PedidosCount user={user} />;
  } else if (type === "pessoas") {
    countComponent = <PessoasCount user={user} />;
  } else if (type === "produtos") {
    countComponent = <ProdutosCount user={user} />;
  }

  return (
    <div className='maincontainer'>
      <div className="left_content">
        <span className='welcomespan'>
          <h1 className='welcome_message'>Bem vindo, {user.displayName}.</h1>
        </span>        
        <h2 className="pedidos_current">Você {props.action} {countComponent} {props.data}</h2>
        <button className='novo_pedido'>{props.create}</button>
        
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