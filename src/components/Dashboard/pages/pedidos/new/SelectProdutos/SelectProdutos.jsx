import React, { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SelectProdutos.css'
import { usePedido } from '../../../../../../context/PedidoContext'
import useGetProdutos from '../../../../../../db/hooks/useGetProdutos';
import { UserAuth } from '../../../../../../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function SelectProdutos() {
    const { setPedidoStage , pedido , updatePedido } = usePedido();
    
    const{ user } = UserAuth();
    const { showProdutos , isLoading } = useGetProdutos(user);

    const handleVoltar = () =>{
        updatePedido({ clientes: [] });
        setPedidoStage(1);
    }

    function toggleContainer(event) {
        const container = event.target.closest('.pessoacontainer');
        container.classList.toggle('closed');
    }  

    const [produtoSelecionado, setProdutoSelecionado] = useState('');
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

    function handleProdutoChange(event) {
        setProdutoSelecionado(event.target.value);
    }

    function handleQuantidadeChange(event) {
        setQuantidadeSelecionada(event.target.value);
    }
    
    function addProduto(event){
        const clienteNome = event.target.dataset.selcliente;
        // Crie um novo objeto para adicionar no array
        const novoItem = { 
            nomeproduto: produtoSelecionado, 
            quantidade: quantidadeSelecionada 
        };
        // Crie um novo objeto para atualizar o estado
        const novoPedido = { ...pedido };
        const cliente = novoPedido.clientes[clienteNome];

        // Adicione o novo objeto no objeto do cliente, utilizando a notação de colchetes
        cliente.itens = { ...cliente.itens, [produtoSelecionado]: novoItem };

        // Atualize o estado do pedido
        updatePedido(novoPedido);         
    }

    if( isLoading ){
        <div className="itemcontainer" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
        </div>
    }else{
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
                                <div className="pessoacontainer closed">
                                    <div className="infocontainer">                                    
                                        <div className="pessoainfo">
                                            <div className="pessoapfp">
                                                <img src={cliente.foto !== "" ? cliente.foto : "../assets/img/user.png"} alt="pic" />                      
                                            </div>
                                            <div className="pessoaname">{cliente.nome}</div>
                                        </div>
                                        <button className='opencontainer' onClick={toggleContainer}><FontAwesomeIcon icon={faChevronDown}/></button>
                                    </div>
                                    <div className="produtoscontainer">  
                                    {Object.keys(pedido.clientes[clienteKey].itens).length !== 0 ? (
                                        Object.keys(pedido.clientes[clienteKey].itens).map((item)=>{
                                            return (
                                                <div className="produto">
                                                    <h1>{pedido.clientes[clienteKey].itens[item].nomeproduto}</h1>
                                                </div>                                                       
                                            )    
                                        })
                                    ) : (
                                        <></>
                                    )}                                                                        
                                        <div className="addproduto" data-clientenome={cliente.nome}>
                                            <div className="addprodutoinfo">
                                                <div className="produtoinfo">
                                                    <div className="produtopfp">
                                                        {/* <img src={cliente.foto !== "" ? cliente.foto : "../assets/img/user.png"} alt="pic" />                       */}
                                                    </div>
                                                    <select className='selectproduto' defaultValue={'DEFAULT'} onChange={handleProdutoChange}>
                                                        {showProdutos.map((produto)=>(
                                                            <option>{produto.nome}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <input type="number" placeholder='1' min="1" value={quantidadeSelecionada} onChange={handleQuantidadeChange}></input>  
                                            </div>                                            
                                            <button className='newproduto' onClick={addProduto} type='submit' data-selcliente={cliente.nome}>Adicionar</button>
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
   
}

export default SelectProdutos