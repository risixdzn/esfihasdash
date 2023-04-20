function HandleQuantidadeChange(event, setQuantidadeSelecionada) {
    const valor = event.target.value;
    setQuantidadeSelecionada(valor);
}

export default HandleQuantidadeChange