import React, { useEffect } from "react";
import Welcome from "../components/Welcome/welcome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayPessoas from "../../../../db/DisplayPessoas/DisplayPessoas";
import ModalDeletePessoas from "./modals/modalDeletePessoa";

import { useState, createContext, useContext } from "react";

import { useModal } from "./modals/ModalProvider";

const PessoasList = () => {
    const { showModal, setShowModal } = useModal(false);
    const { selectedModal, setSelectedModal } = useModal("");
    const [ selectedPessoa, setSelectedPessoa] = useState();
    const [ selectedPFP, setSelectedPFP ] = useState();

    return (
        <div style={showModal ? { Y: "hidden" } : { Y: "scroll" }}>
            <ModalDeletePessoas
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
            <ToastContainer theme="colored" limit="2" />
        </div>
    );
};

export default PessoasList;
