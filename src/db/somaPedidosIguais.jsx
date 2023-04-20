const clientes = {
  "Ricardo": {
      "nome": "Ricardo",
      "foto": "https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_planeta-dos-macacos-divulgacao.jpg?quality=70&strip=info&w=960",
      "itens": {
          "Frango": {
              "nomeproduto": "Frango",
              "quantidade": "1",
              "foto": "https://raw.githubusercontent.com/risixdzn/esfihasdash/test/public/assets/img/esfihas/frango.png"
          },
          "Carne": {
              "nomeproduto": "Carne",
              "quantidade": "1",
              "foto": "https://raw.githubusercontent.com/risixdzn/esfihasdash/test/public/assets/img/esfihas/carne.png"
          }
      }
  },
  "Rosete": {
      "nome": "Rosete",
      "foto": "https://st.depositphotos.com/1004998/1907/i/600/depositphotos_19073037-stock-photo-daisy-flower.jpg",
      "itens": {
          "Frango": {
              "nomeproduto": "Frango",
              "quantidade": "2",
              "foto": "https://raw.githubusercontent.com/risixdzn/esfihasdash/test/public/assets/img/esfihas/frango.png"
          },
          "Napolitana": {
              "nomeproduto": "Napolitana",
              "quantidade": "1",
              "foto": ""
          }
      }
  }
};

let totalItens = {};

// Percorre todos os clientes
Object.values(clientes).forEach(cliente => {
  // Percorre todos os itens do cliente
  Object.values(cliente.itens).forEach(item => {
      // Verifica se o item já existe no objeto de totalItens
      if (totalItens[item.nomeproduto]) {
          // Adiciona a quantidade do item existente com a quantidade atual do item
          totalItens[item.nomeproduto] += parseInt(item.quantidade);
      } else {
          // Adiciona o item ao objeto de totalItens com sua quantidade
          totalItens[item.nomeproduto] = parseInt(item.quantidade);
      }
  });
});

console.log(totalItens);