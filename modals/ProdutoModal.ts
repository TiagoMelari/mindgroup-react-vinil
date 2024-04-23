import React from "react";
import styles from '../styles/Home.module.css';
import Produto from '../../types/Produto';

interface Props {
    produto: Produto;
    onClose: () => void;
}

const ProdutoModal: React.FC<Props> = ({ produto, onClose }) => {
    return (
        <div className={`${styles.modalOverlay} ${produto ? 'active' : ''}`} onClick={onClose}>
            <div className={styles.modal}>
                <h2>{produto?.nome}</h2>
                <p>{produto?.descricao}</p>
                <p>Preço: R$ {produto?.valor.toFixed(2)}</p>
                <p>Quantidade: {produto?.qtd_estoque}</p>
                <div className={styles.buttons}>
                    <button>Editar</button>
                    <button>Excluir</button>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ProdutoModal;
