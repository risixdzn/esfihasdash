import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase-config";
import { UserAuth } from "../../../../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPlus, faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import '../../css/displaycpn.css'

function DisplayProdutos({setShowModal, setSelectedProduto,  setSelectedModal, setSelectedPFP}) {
    const [loading, setIsloading] = useState(true);
    const [showProdutos, setShowProdutos] = useState([]);    
    
    const { user } = UserAuth();

    const handleDelete = (key) => {
        setSelectedModal("delete");
        setSelectedProduto(key);  
        console.log(key);        
        setShowModal(true);        
    };

    const handleEdit = (key, foto) => {
        setSelectedModal("edit");
        setSelectedProduto(key);  
        setSelectedPFP(foto);
        console.log(key);
        console.log(foto);        
        setShowModal(true);  
    };

    useEffect(() => {
        const getProdutosFromFirebase = async () => {
            setIsloading(true);
            const produtosCollection = collection(db, "users", user.uid, "produtos");
            const produtosSnapshot = await getDocs(produtosCollection);
            const produtosList = produtosSnapshot.docs.map(doc => ({ ...doc.data(), key: doc.id }));   
            setShowProdutos(prevState => [...prevState, ...produtosList]);        
            setShowProdutos(produtosList); // Limpar o estado antes de adicionar as produtos novamente
            setIsloading(false);                
        };

        getProdutosFromFirebase();
        // if (!hasLoaded.current) {
        //     hasLoaded.current = true;
        //     getProdutosFromFirebase();
        // }
    }, [user.uid, setShowProdutos]);
        
    //FILTRO DE PESSOAS
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        //constante resultados filtra as showprodutos para as que incluem o termo da barra de pesquisa (parando case sensitive )
        const results = showProdutos.filter(produto =>
            produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        //seta os resultados para o valor filtrado
        setSearchResults(results);
    }, [showProdutos, searchTerm, user.uid]); //roda o código toda vez que as produtos forem alteradas, ou o termo for alterado, ou haja uma alteração no usuario   
    
    if (loading){
        return (
            <div className="itemcontainer" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
            </div>
        )
    } 

    return (
        <div className="itemcontainer">
          <h1 className="title">Produtos <Link className="adduser" to="/produtos/new"><FontAwesomeIcon className="addusericon" icon={faUserPlus}/></Link></h1>
          <div className="searchinput">
            <div className="searchBar">
                <input type="text" placeholder="Pesquisar" maxlength="20" value={searchTerm} className="pesquisainput" 
                    onChange={(event) => 
                    setSearchTerm(event.target.value)} 
                />
                <label className='control-label' htmlFor="text"><FontAwesomeIcon icon={faMagnifyingGlass}/></label>
            </div>            
          </div>  
          <p className="produtosinfo">*Os produtos abaixo são produtos padrão. É possivel editar, deletar ou criar novos através da interface.</p>        
          
          <div className="itemgrid">
            {/* se o resultado da pesquisa for difernete de 0 */}
            {searchResults.length !== 0 ? (
                // mapeie cada produto para um div
                searchResults.map(produto => (
                    <div className="item" key={produto.nome} id={produto.nome}>
                    <div className="picwrapper">
                        <div className="pic">
                            <img src={produto.foto !== "" ? produto.foto : "../assets/img/esfihaicon.png"} alt="pic" />
                        </div>
                    </div>
                    <div className="info">
                        <h1 className="name" id={produto.nome} key={produto.nome}>{produto.nome}</h1>
                        <button>
                            <FontAwesomeIcon icon={faTrashCan} className="delbtn" key={produto.nome} onClick={() => handleDelete(produto.nome)} />
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faPenToSquare} className="editbtn" key={produto.nome} onClick={() => handleEdit(produto.nome, produto.foto)} />
                        </button>
                    </div>
                </div>
              ))
              //se nao, "nenhuma produto encontrada"
            ) : (
                <div className="itemgrid" style={{flexDirection:"column"}}>
                    <h1 className="termnotfound">Nenhuma produto de nome "{searchTerm}" encontrada.</h1>
                    <h2 className="trysearching">Tente procurar por outro termo.</h2>
                </div>              
            )}
          </div>
        </div>
      );
}

export default DisplayProdutos;