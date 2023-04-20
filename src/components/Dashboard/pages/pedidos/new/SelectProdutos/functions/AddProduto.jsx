function useAddProduto(event, produtoSelecionado, quantidadeSelecionada, imgProdutoSelecionado, setErrorDisplay, setErrorText, pedido , updatePedido) {
    const clienteNome = event.target.dataset.selcliente;
    // Crie um novo objeto para adicionar no array
    const novoItem = {
        nomeproduto: produtoSelecionado,
        quantidade: quantidadeSelecionada,
        foto: imgProdutoSelecionado,
    };


    if (novoItem.nomeproduto && novoItem.nomeproduto.trim() !== "") { // se o valor do input não está vazio        
        setErrorDisplay(false);
        console.log(novoItem.nomeproduto);

        // Crie um novo objeto para atualizar o estado
        const novoPedido = { ...pedido };
        const cliente = novoPedido.clientes[clienteNome];

        //tenta achar um item existente que é igual o produto selecionado.
        const itemExistente = Object.values(cliente.itens).find(item => item.nomeproduto === produtoSelecionado);

        if (itemExistente) { //se tiver um item existente
            setErrorDisplay(true);
            setErrorText("Você já adicionou este produto.");
            return;
        } else {
            // Adicione o novo objeto no objeto do cliente, utilizando a notação de colchetes
            cliente.itens = {
                ...cliente.itens,
                [produtoSelecionado]: novoItem,
            };

            console.log(novoPedido); // Verifique o valor de novoPedido
            updatePedido(novoPedido);
        }                
    } else {
        // o valor do input está vazio
        setErrorDisplay(true);
        setErrorText("Selecione um produto antes de tentar adicioná-lo."); 
        console.log("Valor do input vazio");
    }
}

export default useAddProduto