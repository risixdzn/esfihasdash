import React from 'react'
import './welcome.css'
import { UserAuth } from '../../../../../context/AuthContext';
import { Link } from 'react-router-dom';

import Clock from './clock';
import { DataHoje } from './date';

import PedidosCount from '../../../../../db/FetchPedidos';
import PessoasCount from '../../../../../db/FetchPessoas';
import ProdutosCount from '../../../../../db/FetchProdutos';

import 'react-toastify/dist/ReactToastify.css'


export const Welcome = (props) => {
  const { user } = UserAuth();  

  const type = props.type;
  let countComponent;  
  let linkComponent = "";

  if (type === "pedidos") {
    linkComponent = "/pedidos/new";
    countComponent = <PedidosCount user={user} />;    
  } else if (type === "pessoas") {
    countComponent = <PessoasCount user={user} />;
    linkComponent = "/pessoas/new";
  } else if (type === "produtos") {
    linkComponent = "/produtos/new";
    countComponent = <ProdutosCount user={user} />;
  }

  return (
    <div className='maincontainer'>
      <div className="left_content">
        <span className='welcomespan'>
          <h1 className='welcome_message'>Bem vindo, {user.displayName}.</h1>
        </span>        
        <h2 className="pedidos_current">Você {props.action} {countComponent} {props.data}</h2>        
        <Link to={linkComponent} className='novo_pedido'>{props.create}</Link>
        
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