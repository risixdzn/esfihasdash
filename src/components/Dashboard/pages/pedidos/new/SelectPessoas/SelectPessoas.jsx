import React from 'react'
import './SelectPessoas.css'
import useGetPessoas from '../../../../../../db/hooks/useGetPessoas'
import { UserAuth } from '../../../../../../context/AuthContext'
import { useState, useEffect } from 'react'
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePedido } from '../../../../../../context/PedidoContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function SelectPessoas() {
  const { user } = UserAuth();  
  const { showPessoas , isLoading } = useGetPessoas(user);

  //FILTRO DE PESSOAS
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
      //constante resultados filtra as showpessoas para as que incluem o termo da barra de pesquisa (parando case sensitive )
      const results = showPessoas.filter(pessoa =>
          pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      //seta os resultados para o valor filtrado
      setSearchResults(results);
  }, [showPessoas, searchTerm, user.uid]); //roda o código toda vez que as pessoas forem alteradas, ou o termo for alterado, ou haja uma alteração no usuario     

  const { pedido, updatePedido } = usePedido();

  const handleCheckboxChange = (event) => {    
    const nomePessoa = event.target.dataset.nome;
    const fotoPessoa = event.target.dataset.foto;

    if (event.target.checked) {      
      // Adiciona o cliente ao array
      const novoCliente = {
        nome: nomePessoa,
        foto: fotoPessoa,
        itens: [
          // {
          //   nomeproduto:"calabresa",
          //   fotoproduto:"sabao",
          // }
        ],
      };
      updatePedido({ clientes: {...pedido.clientes, [nomePessoa]: novoCliente} });
    } else {
      // Remove o cliente do array
      const novoArrayClientes = pedido.clientes.filter(
        (cliente) => !cliente[nomePessoa]
      );
      updatePedido({ clientes: novoArrayClientes });
    }
  };

  useEffect(() => {
    console.log("Pedido atualizado:", pedido);
  }, [pedido]);

  const navigate = useNavigate();

  const handleVoltar = () => {
    updatePedido({ clientes: [] });
    navigate("/pedidos/list")
  }
  
  const { setPedidoStage } = usePedido();
  const [ errorDisplay, setErrorDisplay ] = useState(false);

  const handleContinuar = ()=>{   
    setErrorDisplay(false);
    if( Object.keys(pedido.clientes).length !== 0) {
      setPedidoStage(2);
    } else{
      setErrorDisplay(true);
    }    
  }  

  return (
      <>
        <button className='voltarbtn' onClick={(handleVoltar)}><FontAwesomeIcon icon={faArrowLeft}/> Voltar</button>
          <h1 className="title">Quem irá pedir?</h1>
          <div className="searchinput" style={{marginTop:"15px"}}>
            <div className="searchBar">
                <input type="text" placeholder="Pesquisar" maxlength="20" value={searchTerm} className="pesquisainput" 
                    onChange={(event) => 
                    setSearchTerm(event.target.value)} 
                />
                <label className='control-label' htmlFor="text"><FontAwesomeIcon icon={faMagnifyingGlass}/></label>
            </div>            
          </div>
          <div className='error' style={errorDisplay ? {display:"flex"} : {display:"none"}}>
            <span>Selecione ao menos uma pessoa para continuar.</span>
          </div>          
          { isLoading ? (
            <div className='notfoundcontainer'>
              <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
            </div>            
            )
            :
            (
              <div className="pessoascontainer">
                {searchResults.length !== 0 ? (
                  searchResults.map(pessoa =>(
                    <div className="pessoa">
                      <div className="pessoainfo">
                          <div className="pessoapfp">
                            <img src={pessoa.foto !== "" ? pessoa.foto : "../assets/img/user.png"} alt="pic" />                      
                          </div>
                          <div className="pessoaname">{pessoa.nome}</div>
                      </div>
                      <input type="checkbox" data-nome={pessoa.nome} data-foto={pessoa.foto} name={pessoa.nome} id={pessoa.nome} key={pessoa.nome} onChange={handleCheckboxChange}/>
                    </div>
                  ))       
                  ) 
                  :
                  (
                  <div className='notfoundcontainer'>
                    {showPessoas.length !== 0 ? (
                        <>
                            <h1 className="termnotfound">Nenhuma pessoa de nome "{searchTerm}" encontrada.</h1>
                            <h2 className="trysearching">Tente procurar por outro termo.</h2>
                        </>
                    )
                    :
                    (
                        <>
                            <h1 className="termnotfound">Você não possui pessoas cadastradas.</h1>
                            <h2 className="trysearching">Clique no botão abaixo para cadastrar uma nova pessoa.</h2>
                            <Link to={"/pessoas/new"} className='novapessoabtn'>Nova pessoa</Link>                            
                        </>                        
                    )}
                  </div>          
                  )
                }                
              </div>
            )
          }  
          <button className='continuarbtn' onClick={handleContinuar}>Continuar</button>        
      </>
  );
}

export default SelectPessoas