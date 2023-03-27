const pedido = [
    {
        nome: "Ricardo",
        itens: {
            calabresa: 2,
            carne: 3,
            queijo: 1,
        }
    },
    {
        nome: "Joao",
        itens: {
            brigadeiro: 1,
            carne: 2,
            queijo: 3,
            calabresa: 6,
        }
    }
]

// Criamos um objeto vazio para armazenar as quantidades somadas
const somas = {};

// Iteramos sobre cada elemento do array de pedidos
pedido.forEach((pessoa) => {
  // Iteramos sobre cada item do pedido da pessoa atual
  Object.entries(pessoa.itens).forEach(([sabor, quantidade]) => {
    // Verificamos se já existe uma entrada no objeto somas para o sabor em questão
    if (!somas[sabor]) {
      // Se não existe, criamos uma nova entrada com a quantidade atual
      somas[sabor] = quantidade;
    } else {
      // Se já existe, somamos a quantidade atual com a que já existe no objeto
      somas[sabor] += quantidade;
    }
  });
});

console.log(somas);