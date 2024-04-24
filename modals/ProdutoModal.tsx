import React from "react";
import Produto from '../types/Produto';

interface Props {
    produto: Produto;
    onClose: () => void;
}

const ProdutoModal: React.FC<Props> = ({ produto, onClose }) => {
    return (
        <div className={`${'modalOverlay'} ${produto ? 'active' : ''}`} onClick={onClose}>
            <div className='modal'>
                <h2>{produto?.nome}</h2>
                <p>{produto?.descricao}</p>
                <p>Preço: R$ {produto?.valor.toFixed(2)}</p>
                <p>Quantidade: {produto?.qtd_estoque}</p>
                <div className='buttons'>
                    <button>Editar</button>
                    <button>Excluir</button>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ProdutoModal;
