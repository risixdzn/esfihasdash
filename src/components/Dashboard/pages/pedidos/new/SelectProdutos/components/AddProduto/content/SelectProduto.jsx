import React from 'react'
import useGetProdutos from '../../../../../../../../../db/hooks/useGetProdutos'
import { UserAuth } from '../../../../../../../../../context/AuthContext';
import HandleProdutoChange from '../../../functions/HandleProdutoChange';

function SelectProduto(props) {
    const { user } = UserAuth();
    const { showProdutos } = useGetProdutos(user);
    const setProdutoSelecionado = props.setProdutoSelecionado;
    const setImgProdutoSelecionado = props.setImgProdutoSelecionado;

    function ProdutoChange(event) {
        HandleProdutoChange(event, showProdutos, setProdutoSelecionado, setImgProdutoSelecionado);
    }

    return (
        <select className='selectproduto' defaultValue="DEFAULT" onChange={ProdutoChange}>
            <option value="DEFAULT" disabled>Produtos</option>
            {showProdutos.map((produto)=>(
                <option value={produto.valor}>{produto.nome}</option>
            ))}
        </select>
    )
}

export default SelectProduto