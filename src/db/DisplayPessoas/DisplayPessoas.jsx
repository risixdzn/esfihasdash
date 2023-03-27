import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { db } from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import './displaypessoas.css'

function DisplayPessoas({setShowModal, setDeletingPessoa, deletingPessoa}) {
    const [loading, setIsloading] = useState(true);
    const [showPessoas, setShowPessoas] = useState([]);
    const { user } = UserAuth();

    const handleDelete = (key) => {
        setDeletingPessoa(key);  
        console.log(key);        
        setShowModal(true);        
    };

    const hasLoaded = useRef(false); // cria uma referência a um booleano que será atualizado após o carregamento da página   

    useLayoutEffect(() => {
        if (hasLoaded.current === false) {
            hasLoaded.current = true;
        } else {
            const getPessoasFromFirebase = async () => {
                setIsloading(true);
                const pessoasCollection = collection(db, "users", user.uid, "pessoas");
                const pessoasSnapshot = await getDocs(pessoasCollection);
                //console.log(pessoasSnapshot.docs);  
                const pessoasList = pessoasSnapshot.docs.map(doc => ({ ...doc.data(), key: doc.id }));   
                //console.log(pessoasList);
                setShowPessoas(prevState => [...prevState, ...pessoasList]);        
                //console.log(showPessoas);
                setIsloading(false);                
            };
            getPessoasFromFirebase();
            setIsloading(false);
            //console.log(showPessoas);
        }
    }, [user.uid]);

    const pedido = [
        {
            nome: "Ricardo",
            itens: {
                calabresa: 2,
                carne: 3,
                queijo: 1,
            }
        },
        {
            nome: "Joao",
            itens: {
                brigadeiro: 1,
                carne: 2,
                queijo: 3,
                calabresa: 6,
            }
        }
    ]
    
    const somas = {};
    
    pedido.forEach((pessoa) => {
      Object.entries(pessoa.itens).forEach(([sabor, quantidade]) => {
        if (!somas[sabor]) {
          somas[sabor] = quantidade;
        } else {
          somas[sabor] += quantidade;
        }
      });
    });
    
    console.log(somas);

    if (loading){
        return (
            <div className="pessoascontainer" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />
            </div>
        )
    }
 

    return(        
        <div className="pessoascontainer">
            <h1 className="title">Pessoas <Link className="adduser" to='/pessoas/new'><FontAwesomeIcon className="addusericon" icon={faUserPlus}/></Link></h1>
            <div className="pessoasgrid">
                {showPessoas.length !== 0 ? showPessoas.map((pessoa)=>{
                    return (
                        <div className="pessoa" key={pessoa.key} id={pessoa.key}>
                            <div className="picwrapper">
                                <div className="pic">
                                    <img src={pessoa.foto !== "" ? pessoa.foto : "../assets/img/user.png" } alt="pic"></img>
                                </div>
                            </div>
                            <div className="info">
                                <h1 className="name" id={pessoa.key} key={pessoa.key}>{pessoa.key}</h1>
                                <button><FontAwesomeIcon icon={faTrashCan} className="delbtn" key={pessoa.key} onClick={() => handleDelete(pessoa.key)}/></button>
                            </div>                            
                        </div>
                    ) 
                }):<img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />}
            </div>            
        </div>
    ) 
}

export default DisplayPessoas;