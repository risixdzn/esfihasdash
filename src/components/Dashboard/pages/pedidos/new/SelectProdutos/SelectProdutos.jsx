import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SelectProdutos.css'
import { usePedido } from '../../../../../../context/PedidoContext'

function SelectProdutos() {
    const { setPedidoStage , pedido , updatePedido } = usePedido();

    const handleVoltar = () =>{
        updatePedido({ clientes: [] });
        setPedidoStage(1);
    }

    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <>
            <button className='voltarbtn' onClick={(handleVoltar)}><FontAwesomeIcon icon={faArrowLeft}/> Voltar</button>
            <h1 className="title">Selecione os produtos:</h1>
            { isLoading ? (
            <div className='notfoundcontainer'>
              <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
            </div>            
            )
            :
            (
              <div className="pessoascontainer">
                { Object.keys(pedido.clientes).length !== 0 ? (
                    Object.keys(pedido.clientes).map((clienteKey) => {
                        const cliente = pedido.clientes[clienteKey];
                        return (
                            <div className="pessoacontainer">
                                <div className="infocontainer">                                    
                                    <div className="pessoainfo">
                                        <div className="pessoapfp">
                                            <img src={cliente.foto !== "" ? cliente.foto : "../assets/img/user.png"} alt="pic" />                      
                                        </div>
                                        <div className="pessoaname">{cliente.nome}</div>
                                    </div>
                                    <input type="checkbox" data-nome={cliente.nome} name={cliente.nome} id={cliente.nome} key={cliente.nome}/>
                                </div>
                                <div className="produtoscontainer">  
                                    <div className="produto">
                                        <div className="produtoinfo">
                                            <div className="pessoapfp">
                                                <img src={cliente.foto !== "" ? cliente.foto : "../assets/img/user.png"} alt="pic" />                      
                                            </div>
                                            <div className="pessoaname">{cliente.nome}</div>
                                        </div>
                                        <input type="number"></input>
                                    </div>                                  
                                </div>
                            </div>
                        )

                    })
                ):(
                    <div className='notfoundcontainer'>
                        <h2 className="trysearching">Erro desconhecido.</h2>
                    </div>  
                )}                               
              </div>
            )
          }  
        </>
    )
}

export default SelectProdutos