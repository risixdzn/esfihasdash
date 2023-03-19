import React from 'react'
import './userCard.css'
import { UserAuth } from '../../../context/AuthContext';
import { collection, getCountFromServer, get, count } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useEffect, useState } from 'react';

function UserCard() {    
    const {user} = UserAuth();   

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
        <div className='user_card'>
            <div>
                <img src="https://i.ibb.co/PNPLVzj/esfihasfavicon.png" alt="" />
            </div>
            <div className='divisoria_vertical'></div>
            <div className='user_info'>              
                <h1 className='user_name'>{user && user.displayName}</h1>
                <div className='divisoria_horiz'></div>
                <h2 className='user_pedidos'>{pedidos} pedido(s)</h2>
                <h2 className='user_pessoas'>? pessoas</h2>
                <h2 className='user_produtos'>? produtos</h2>                
            </div>            
        </div> 
    )
}

export default UserCard