import React from 'react'
import useDelProduto from '../functions/DelProduto';
import { usePedido } from '../../../../../../../context/PedidoContext';

function Produtos(props) {
    const { pedido , updatePedido } = usePedido();    
    const clienteKey = props.clienteKey;   
    const cliente = props.cliente;
    function DeletarProduto(event){
        useDelProduto(event, pedido, updatePedido)
    }
    return (
        Object.keys(pedido.clientes[clienteKey].itens).map((item)=>{ //map produtos
            return (
                <div className="produto">
                    <div className="produtoinfo">
                        <div className="produtopfp">
                            <img src={pedido.clientes[clienteKey].itens[item].foto !== "" ? pedido.clientes[clienteKey].itens[item].foto : "../assets/img/esfihaicon.png"} alt=""/>
                        </div>
                        <h1 className='produtonome'>{pedido.clientes[clienteKey].itens[item].nomeproduto}</h1>
                    </div>
                    <div className="actions">
                        <button className='delbtn' onClick={DeletarProduto} data-clientenome={cliente.nome} data-produtonome={pedido.clientes[clienteKey].itens[item].nomeproduto}>
                            <img fill='#eb2f2f' src='../assets/svg/trashcan.svg' alt='' onClick={DeletarProduto} data-clientenome={cliente.nome} data-produtonome={pedido.clientes[clienteKey].itens[item].nomeproduto}></img>
                        </button>
                        <input type="number" disabled value={pedido.clientes[clienteKey].itens[item].quantidade}></input>       
                    </div>                                                                                                
                </div>                                                       
            )    
        })
    )
}

export default Produtos