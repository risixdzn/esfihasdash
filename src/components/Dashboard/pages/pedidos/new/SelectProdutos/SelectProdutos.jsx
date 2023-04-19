import React, { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SelectProdutos.css'
import { usePedido } from '../../../../../../context/PedidoContext'
import useGetProdutos from '../../../../../../db/hooks/useGetProdutos';
import { UserAuth } from '../../../../../../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
    const [imgProdutoSelecionado , setImgProdutoSelecionado ] = useState('')
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

    function handleProdutoChange(event) {        
        const selectProduto = event.target.value        
        setProdutoSelecionado(selectProduto);
        // encontrar o objeto com o nome igual a selectProduto
        const produto = showProdutos.find(p => p.nome === selectProduto);        
        // atualizar o estado de imgProdutoSelecionado com a foto do produto
        if (produto) {
            setImgProdutoSelecionado(produto.foto);
        } else {
            setImgProdutoSelecionado('');
        }
    }

    function handleQuantidadeChange(event) {
        setQuantidadeSelecionada(event.target.value);
    }
    
    const [errorDisplay, setErrorDisplay] = useState(false);

    function addProduto(event) {
        const clienteNome = event.target.dataset.selcliente;
        // Crie um novo objeto para adicionar no array
        const novoItem = {
            nomeproduto: produtoSelecionado,
            quantidade: quantidadeSelecionada,
            foto: imgProdutoSelecionado,
        };

        if (novoItem.nomeproduto && novoItem.nomeproduto.trim() !== "") {
            // o valor do input não está vazio
            setErrorDisplay(false);
            console.log(novoItem.nomeproduto);

            // Crie um novo objeto para atualizar o estado
            const novoPedido = { ...pedido };
            const cliente = novoPedido.clientes[clienteNome];

            // Adicione o novo objeto no objeto do cliente, utilizando a notação de colchetes
            cliente.itens = {
                ...cliente.itens,
                [produtoSelecionado]: novoItem,
            };

            console.log(novoPedido); // Verifique o valor de novoPedido
            updatePedido(novoPedido);
        } else {
            // o valor do input está vazio
            setErrorDisplay(true);
            console.log("Valor do input vazio");
        }
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
                <div className='error' style={errorDisplay ? {display:"flex"} : {display:"none"}}>
                    <span>Selecione um produto antes de tentar adicioná-lo.</span>
                </div> 
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
                                                    <div className="produtoinfo">
                                                        <div className="produtopfp">
                                                            <img src={pedido.clientes[clienteKey].itens[item].foto !== "" ? pedido.clientes[clienteKey].itens[item].foto : "../assets/img/esfihaicon.png"} alt=""/>
                                                        </div>
                                                        <h1 className='produtonome'>{pedido.clientes[clienteKey].itens[item].nomeproduto}</h1>
                                                    </div>
                                                    <div className="actions">
                                                        <button className='delbtn'>
                                                            <FontAwesomeIcon icon={faTrashCan}/>
                                                        </button>
                                                        <input type="number" disabled value={pedido.clientes[clienteKey].itens[item].quantidade}></input>       
                                                    </div>                                                                                                
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
                                                        {/* foto aqui com base no selecionado do in´pu*/}
                                                    </div>
                                                    <select className='selectproduto' defaultValue="DEFAULT" onChange={handleProdutoChange}>
                                                        <option value="DEFAULT" disabled>Produtos</option>
                                                        {showProdutos.map((produto)=>(
                                                            <option value={produto.valor}>{produto.nome}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <input type="number" placeholder='1' min="1" value={quantidadeSelecionada} onChange={handleQuantidadeChange}></input>  
                                            </div>                                            
                                            <button className='newproduto' onClick={addProduto} data-selcliente={cliente.nome}>Adicionar</button>
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