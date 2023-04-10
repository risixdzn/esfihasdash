import React from "react";
import Welcome from "../components/Welcome/welcome";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayPessoas from "./DisplayPessoas/DisplayPessoas";
import ModalPessoas from "./modals/ModalPessoas.jsx";

import { useState } from "react";

import { useModal } from "../../../../context/ModalContext";

const PessoasList = () => {
    const { showModal, setShowModal } = useModal(false);
    const { selectedModal, setSelectedModal } = useModal("");
    const [ selectedPessoa, setSelectedPessoa] = useState();
    const [ selectedPFP, setSelectedPFP ] = useState();
    
    return (
        <div style={showModal ? { Y: "hidden" } : { Y: "scroll" }}>
            <ModalPessoas
                show={showModal}
                setShowModal={setShowModal}
                selectedPessoa={selectedPessoa}
                selectedModal={selectedModal}
                selectedPFP={selectedPFP}
            />
            <Welcome
                action="cadastrou"
                data="pessoa(s)."
                create="Nova pessoa"
                type="pessoas"
            />
            <DisplayPessoas
                setShowModal={setShowModal}
                setSelectedPessoa={setSelectedPessoa}
                setSelectedModal={setSelectedModal}
                setSelectedPFP={setSelectedPFP}
            />
            <ToastContainer theme="colored" />
        </div>
    );
};

export default PessoasList;
