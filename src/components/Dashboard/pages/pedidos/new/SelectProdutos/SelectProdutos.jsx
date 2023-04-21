import React, { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SelectProdutos.css'
import { usePedido } from '../../../../../../context/PedidoContext'
import useGetProdutos from '../../../../../../db/hooks/useGetProdutos';
import { UserAuth } from '../../../../../../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import HandleProdutoChange from './functions/HandleProdutoChange';
import HandleQuantidadeChange from './functions/HandleQuantidadeChange';
import useAddProduto from './functions/AddProduto';
import useDelProduto from './functions/DelProduto';

import Select from 'react-select';

function SelectProdutos() {
    const { setPedidoStage , pedido , updatePedido } = usePedido();    
    const{ user } = UserAuth();
    const { showProdutos , isLoading } = useGetProdutos(user);

    const produtosList = showProdutos.map((objeto) => ({ value: objeto.nome , label: objeto.nome }));    

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

    function ProdutoChange(event) {
        HandleProdutoChange(event, showProdutos, setProdutoSelecionado, setImgProdutoSelecionado);
    }

    function QuantidadeChange(event) {
        HandleQuantidadeChange(event, setQuantidadeSelecionada);
    }
    
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [errorText, setErrorText] = useState('')

    function AdicionarProduto(event) {
        useAddProduto(event, produtoSelecionado, quantidadeSelecionada, imgProdutoSelecionado, setErrorDisplay, setErrorText, pedido, updatePedido, event.target.value);
    }

    function DeletarProduto(event){
        useDelProduto(event, pedido, updatePedido)
    }
    
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#181818",
            borderColor: state.isFocused ? "#F46A28" : "#3b3b3b",
            boxShadow: state.isFocused ? "#F46A28" : "#3b3b3b",        
            fontSize: "16px",    
            "&:hover": {
                borderColor: "#F46A28"
            }             ,
            "@media only screen and (max-width: 1200px)": {
                ...provided["@media only screen and (max-width: 1200px)"],                
                fontSize: "14px"
            }, 
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#F46A28" : "#262626",
          color: state.isSelected ? "#fff" : "#C0C0C0",
          "&:hover": {
                borderColor: "#F46A28"
            }  ,
            "&:active": {
                backgroundColor: "#F46A28",
                color: "#fff",
            }   ,
            "@media only screen and (max-width: 1200px)": {
                ...provided["@media only screen and (max-width: 1200px)"],                
                fontSize: "14px"
            }, 
        }),            
        menu: (provided) =>({
            ...provided,
            backgroundColor:"#262626",
            background:"#262626",
        }),
        singleValue: (provided) =>({
            ...provided,
            color: "#fff",
        })
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
                                                        <button className='delbtn' onClick={DeletarProduto} data-clientenome={cliente.nome} data-produtonome={pedido.clientes[clienteKey].itens[item].nomeproduto}>
                                                            <img fill='#eb2f2f' src='../assets/svg/trashcan.svg' alt='' onClick={DeletarProduto} data-clientenome={cliente.nome} data-produtonome={pedido.clientes[clienteKey].itens[item].nomeproduto}></img>
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
                                                        <img src="../assets/img/esfihaicon.png" alt=''></img>
                                                    </div>
                                                    <Select options={produtosList} placeholder={"Produto"} isSearchable={true} onChange={ProdutoChange} 
                                                        styles={customStyles}/>                                                    
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