import React, { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SelectProdutos.css'
import { usePedido } from '../../../../../../context/PedidoContext'
import useGetProdutos from '../../../../../../db/hooks/useGetProdutos';
import { UserAuth } from '../../../../../../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import HandleQuantidadeChange from './functions/HandleQuantidadeChange';
import useAddProduto from './functions/AddProduto';

import Produtos from './components/Produtos';
import SelectProduto from './components/SelectProduto';

function SelectProdutos() {
    const { setPedidoStage , pedido , updatePedido } = usePedido();    
    const{ user } = UserAuth();
    const { isLoading } = useGetProdutos(user);

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

    function QuantidadeChange(event) {
        HandleQuantidadeChange(event, setQuantidadeSelecionada);
    }
    
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorText, setErrorText] = useState('')

    function AdicionarProduto(event) {
        useAddProduto(event, produtoSelecionado, quantidadeSelecionada, imgProdutoSelecionado, setErrorDisplay, setErrorText, pedido, updatePedido, event.target.value);        
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
                    <span>{errorText}</span>
                </div> 
                { isLoading ? (
                    <div className='notfoundcontainer'>
                        <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
                    </div>            
                )
                :
                (
                  <div className="pedidocontainer" style={errorDisplay?{height:"70%"}:{height:"77.5%"}}>
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
                                        <button className='clickablecontainer' onClick={toggleContainer}>
                                            <div className='opencontainer'><FontAwesomeIcon icon={faChevronDown}/></div>
                                        </button>                                        
                                    </div>
                                    <div className="produtoscontainer">  
                                        {Object.keys(pedido.clientes[clienteKey].itens).length !== 0 ? ( //se tiver mais de um item, renderize os produtos
                                            <Produtos cliente={cliente} clienteKey={clienteKey}/>
                                        ) : (<></>)}                                                             
                                        <div className="addproduto" data-clientenome={cliente.nome}>
                                            <div className="addprodutoinfo">
                                                <div className="produtoinfo">
                                                    <div className="produtopfp">
                                                        <img src="../assets/img/esfihaicon.png" alt=''></img>
                                                    </div>
                                                    <SelectProduto setProdutoSelecionado={setProdutoSelecionado} setImgProdutoSelecionado={setImgProdutoSelecionado}/>
                                                </div>
                                                <input type="number" placeholder='1' value={quantidadeSelecionada} onChange={QuantidadeChange}></input>  
                                            </div>                                            
                                            <button className='newproduto' onClick={AdicionarProduto} data-selcliente={cliente.nome}>Adicionar</button>
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
              <button className='continuarbtn'>Finalizar</button>   
            </>
        )
    }
}  


export default SelectProdutos