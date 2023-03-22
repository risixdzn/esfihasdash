import React, { useLayoutEffect, useRef, useState } from "react";
import { db } from "../../firebase-config";
import { UserAuth } from "../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";

import './displaypessoas.css'

function DisplayPessoas() {
    const [loading, setIsloading] = useState(true);
    const [showPessoas, setShowPessoas] = useState([]);
    const { user } = UserAuth();

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

    if (loading){
        return (
            <div className="pessoascontainer" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src="../assets/gif/rippleloader.svg" alt="loading" />
            </div>
        )
    }

    return(
        <div className="pessoascontainer">
            <h1 className="title">Pessoas</h1>
            <div className="pessoasgrid">
                {showPessoas.length !== 0 ? showPessoas.map((pessoa)=>{
                    return (
                        <div className="pessoa">
                            <div className="picwrapper">
                                <div className="pic">
                                    <img src={pessoa.foto !== "" ? pessoa.foto : "../assets/img/user.png" } alt="pic"></img>
                                </div>
                            </div>
                            <div className="info">
                                <h1 className="name" id={pessoa.key} key={pessoa.key}>{pessoa.key}</h1>
                            </div>                            
                        </div>
                    ) 
                }):<img className="loader" src="../assets/gif/rippleloader.svg" alt="loading" />}
            </div>
            
        </div>
    ) 
}

export default DisplayPessoas;