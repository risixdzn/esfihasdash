import React from 'react'
import './SelectPessoas.css'
import useGetPessoas from '../../../../../../db/hooks/useGetPessoas'
import { UserAuth } from '../../../../../../context/AuthContext'
import { useState, useEffect } from 'react'
import { faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  return (
      <>
        <button className='voltarbtn'><FontAwesomeIcon icon={faArrowLeft}/> Voltar</button>
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
                      <input type="checkbox" name="a" id="a" />
                    </div>
                  ))       
                ) 
                : 
                (
                  <div className='notfoundcontainer'>
                    <h1 className="termnotfound">Nenhuma pessoa de nome "{searchTerm}" encontrada.</h1>
                    <h2 className="trysearching">Tente procurar por outro termo.</h2>
                  </div>            
                )}                      
              </div>
            )
          }          
      </>
  );
}

export default SelectPessoas