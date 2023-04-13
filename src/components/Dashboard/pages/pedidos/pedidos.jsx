import React from 'react'
import Welcome from '../components/Welcome/welcome'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import { UserAuth } from '../../../../context/AuthContext';

const Pedidos = () => {
  const { user } = UserAuth();

    const pedido = {
      id: 1,
      date: "13/04/2023",
      clientes: [
          {
              nome: "Ricardo",
              itens: {
                  calabresa: 2,
                  carne: 3,
                  queijo: 1,
              },
          },
          {
              nome: "Joao",
              itens: {
                  brigadeiro: 1,
                  carne: 2,
                  queijo: 3,
                  calabresa: 6,
              },
          },
      ],
  };

  async function setExamplePedido(){
    await setDoc(doc(db, "users", user.uid, "pedidos", "testepedido"),{
      pedido
    });
  }

  function handleSubmitExample(){
    try{
      setExamplePedido();
      console.log("ok")
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div>
        <Welcome action="fez" data="pedido(s)." create='Novo pedido' type='pedidos'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Pedidos</h1>
        <button onClick={handleSubmitExample}>Teste</button>
    </div>
  )
}

export default Pedidos