import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { db } from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
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

    const hasLoaded = useRef(false);

    useEffect(() => {
        const getPessoasFromFirebase = async () => {
            setIsloading(true);
            const pessoasCollection = collection(db, "users", user.uid, "pessoas");
            const pessoasSnapshot = await getDocs(pessoasCollection);
            const pessoasList = pessoasSnapshot.docs.map(doc => ({ ...doc.data(), key: doc.id }));   
            setShowPessoas(prevState => [...prevState, ...pessoasList]);        
            setIsloading(false);                
        };

        if (!hasLoaded.current) {
            hasLoaded.current = true;
            getPessoasFromFirebase();
        }
    }, [user.uid]);
        
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
                        <div className="pessoa" key={pessoa.nome} id={pessoa.nome}>
                            <div className="picwrapper">
                                <div className="pic">
                                    <img src={pessoa.foto !== "" ? pessoa.foto : "../assets/img/user.png" } alt="pic"></img>
                                </div>
                            </div>
                            <div className="info">
                                <h1 className="name" id={pessoa.nome} key={pessoa.nome}>{pessoa.nome}</h1>
                                <button><FontAwesomeIcon icon={faTrashCan} className="delbtn" key={pessoa.nome} onClick={() => handleDelete(pessoa.nome)}/></button>
                                <button><FontAwesomeIcon icon={faPenToSquare} className="editbtn" key={pessoa.nome}  onClick={() => handleEdit(pessoa.nome, pessoa.foto)}/></button>
                            </div>                            
                        </div>
                    ) 
                }):<img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />}
            </div>            
        </div>
    ) 
}

export default DisplayPessoas;