import React from 'react'
import './userCard.css'
import { UserAuth } from '../../../../context/AuthContext';

import PedidosCount from '../../../../db/FetchPedidos'
import PessoasCount from '../../../../db/FetchPessoas';
import ProdutosCount from '../../../../db/FetchProdutos';

function UserCard() {
    
    const {user} = UserAuth();          

    return (
        <div className='user_card'>
            <div>
                <img src="https://i.ibb.co/PNPLVzj/esfihasfavicon.png" alt="" />
            </div>
            <div className='divisoria_vertical'></div>
            <div className='user_info'>              
                <h1 className='user_name'>{user && user.displayName}</h1>
                <div className='divisoria_horiz'></div>
                <h2 className='user_pedidos'><PedidosCount user={user}/> pedido(s)</h2>                
                <h2 className='user_pessoas'><PessoasCount user={user}/> pessoas(s)</h2>
                <h2 className='user_produtos'><ProdutosCount user={user}/> produtos(s)</h2>                
            </div>            
        </div> 
    )
}

export default UserCard