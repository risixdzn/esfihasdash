import React from 'react'
import Welcome from '../components/Welcome/welcome'

const ProdutosList = () => {
  return (
    <div>
        <Welcome action="cadastrou" data="produto(s)." create='Novo produto' type='produtos'/>
        <h1 style={{fontSize: 50, fontWeight: 600, color: "white"}}>Produtos</h1>
    </div>
  )
}

export default ProdutosList