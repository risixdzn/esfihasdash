import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase-config";
import { UserAuth } from "../../../../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPlus, faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import './displaypessoas.css'

function DisplayPessoas({setShowModal, setSelectedPessoa,  setSelectedModal, setSelectedPFP}) {
    const [loading, setIsloading] = useState(true);
    const [showPessoas, setShowPessoas] = useState([]);    
    
    const { user } = UserAuth();

    const handleDelete = (key) => {
        setSelectedModal("delete");
        setSelectedPessoa(key);  
        console.log(key);        
        setShowModal(true);        
    };

    const handleEdit = (key, foto) => {
        setSelectedModal("edit");
        setSelectedPessoa(key);  
        setSelectedPFP(foto);
        console.log(key);
        console.log(foto);        
        setShowModal(true);        
    };

    useEffect(() => {
        const getPessoasFromFirebase = async () => {
            setIsloading(true);
            const pessoasCollection = collection(db, "users", user.uid, "pessoas");
            const pessoasSnapshot = await getDocs(pessoasCollection);
            const pessoasList = pessoasSnapshot.docs.map(doc => ({ ...doc.data(), key: doc.id }));   
            setShowPessoas(prevState => [...prevState, ...pessoasList]);        
            setShowPessoas(pessoasList); // Limpar o estado antes de adicionar as pessoas novamente
            setIsloading(false);                
        };

        getPessoasFromFirebase();
        // if (!hasLoaded.current) {
        //     hasLoaded.current = true;
        //     getPessoasFromFirebase();
        // }
    }, [user.uid, setShowPessoas]);
        
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
    
    if (loading){
        return (
            <div className="pessoascontainer" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
            </div>
        )
    } 

    return (
        <div className="pessoascontainer">
          <h1 className="title">Pessoas <Link className="adduser" to="/pessoas/new"><FontAwesomeIcon className="addusericon" icon={faUserPlus}/></Link></h1>
          <div className="searchinput">
            <div className="searchBar">
                <input type="text" placeholder="Pesquisar" maxlength="20" value={searchTerm} className="pesquisainput" 
                    onChange={(event) => 
                    setSearchTerm(event.target.value)} 
                />
                <label className='control-label' htmlFor="text"><FontAwesomeIcon icon={faMagnifyingGlass}/></label>
            </div>
            
          </div>          
          
          <div className="pessoasgrid">
            {/* se o resultado da pesquisa for difernete de 0 */}
            {searchResults.length !== 0 ? (
                // mapeie cada pessoa para um div
                searchResults.map(pessoa => (
                    <div className="pessoa" key={pessoa.nome} id={pessoa.nome}>
                    <div className="picwrapper">
                        <div className="pic">
                            <img src={pessoa.foto !== "" ? pessoa.foto : "../assets/img/user.png"} alt="pic" />
                        </div>
                    </div>
                    <div className="info">
                        <h1 className="name" id={pessoa.nome} key={pessoa.nome}>{pessoa.nome}</h1>
                        <button>
                            <FontAwesomeIcon icon={faTrashCan} className="delbtn" key={pessoa.nome} onClick={() => handleDelete(pessoa.nome)} />
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faPenToSquare} className="editbtn" key={pessoa.nome} onClick={() => handleEdit(pessoa.nome, pessoa.foto)} />
                        </button>
                    </div>
                </div>
              ))
              //se nao, "nenhuma pessoa encontrada"
            ) : (
                <div className="pessoasgrid" style={{flexDirection:"column"}}>
                    <h1 className="termnotfound">Nenhuma pessoa de nome "{searchTerm}" encontrada.</h1>
                    <h2 className="trysearching">Tente procurar por outro termo.</h2>
                </div>              
            )}
          </div>
        </div>
      );
}

export default DisplayPessoas;