import React from "react";
import Welcome from "../components/Welcome/welcome";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayProdutos from "./DisplayProdutos/DisplayProdutos";
import ModalProdutos from "./modals/ModalProdutos.jsx";

import { useState } from "react";

import { useModal } from "../../../../context/ModalContext";

const PessoasList = () => {
    const { showModal, setShowModal } = useModal(false);
    const { selectedModal, setSelectedModal } = useModal("");
    const [ selectedProduto, setSelectedProduto] = useState("");
    const [ selectedPFP, setSelectedPFP ] = useState("");
    
    return (
        <div style={showModal ? { Y: "hidden" } : { Y: "scroll" }}>
            <ModalProdutos
                show={showModal}
                setShowModal={setShowModal}
                selectedProduto={selectedProduto}
                selectedModal={selectedModal}
                selectedPFP={selectedPFP}
            />
            <Welcome
                action="cadastrou"
                data="produto(s)."
                create="Novo produto"
                type="produtos"
            />
            <DisplayProdutos
                setShowModal={setShowModal}
                setSelectedProduto={setSelectedProduto}
                setSelectedModal={setSelectedModal}
                setSelectedPFP={setSelectedPFP}
            />
            <ToastContainer theme="colored" />
        </div>
    );
};

export default PessoasList;
