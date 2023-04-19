function HandleProdutoChange(event, showProdutos, setProdutoSelecionado, setImgProdutoSelecionado) {        
    const selectProduto = event.target.value        
    setProdutoSelecionado(selectProduto);
    // encontrar o objeto com o nome igual a selectProduto
    const produto = showProdutos.find(p => p.nome === selectProduto);        
    // atualizar o estado de imgProdutoSelecionado com a foto do produto
    if (produto) {
        setImgProdutoSelecionado(produto.foto);
    } else {
        setImgProdutoSelecionado('');
    }
}


export default HandleProdutoChange