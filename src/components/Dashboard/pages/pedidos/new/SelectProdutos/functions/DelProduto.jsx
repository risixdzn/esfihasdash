function useDelProduto(event, pedido, updatePedido){
    // Obtenr o nome do cliente e o nome do produto selecionado
    const clienteSelecionado = event.target.dataset.clientenome;
    const produtoSelecionado = event.target.dataset.produtonome;    

    // Cria uma cópia do objeto pedido
    const novoPedido = { ...pedido };

    // Verifica se o cliente selecionado existe no pedido
    if (novoPedido.clientes[clienteSelecionado]) {
        // Obter os itens do cliente selecionado
        const itensCliente = novoPedido.clientes[clienteSelecionado].itens;
        
        // Verifica se o produto selecionado existe nos itens do cliente
        if (itensCliente[produtoSelecionado]) {
            // Remove o produto selecionado dos itens do cliente e atualiza o pedido
            delete itensCliente[produtoSelecionado]; 
            updatePedido(novoPedido);
        }
    }

}

export default useDelProduto