import Head from 'next/head';
import React, { useState } from 'react';
import Produto from '../../types/Produto';
import ProdutoModal from '../../modals/ProdutoModal';

const produtosFicticios = [
    {
        produto_id: 1,
        nome: 'Vinil 1',
        descricao: 'Descrição do Vinil 1',
        valor: 29.99,
        qtd_estoque: 10
    },
    {
        produto_id: 2,
        nome: 'Vinil 2',
        descricao: 'Descrição do Vinil 2',
        valor: 39.99,
        qtd_estoque: 5
    },
    {
        produto_id: 3,
        nome: 'Vinil 3',
        descricao: 'Descrição do Vinil 3',
        valor: 19.99,
        qtd_estoque: 15
    },
    {
        produto_id: 4,
        nome: 'Vinil 4',
        descricao: 'Descrição do Vinil 4',
        valor: 49.99,
        qtd_estoque: 8
    }
];

export default function Estoque() {
    const [produtos] = useState<Produto[]>(produtosFicticios);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [novoProduto, setNovoProduto] = useState<Partial<Produto>>({
        nome: '',
        descricao: '',
        valor: 0,
        qtd_estoque: 0
    });

    const handleAbreModal = (produto: Produto) => {
        setProdutoSelecionado(produto);
    }

    const handleFechaModal = () => {
        setProdutoSelecionado(null);
    }

    const handleAdicionarProduto = async () => {
        try {
            const response = await fetch('/api/estoque', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProduto)
            });
            if (response.ok) {
                console.log('Produto adicionado com sucesso!');
            } else {
                console.error('Erro ao adicionar produto:', response.status);
            }
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    }

    return (
        <div className="container">
            <Head>
                <title>Vinil Store - Estoque</title>
                <meta name="description" content="Estoque da Vinil Store" />
            </Head>

            <header className="header">
                <div className="logo_container">
                    <img className="logo" src="/imgs/logo_sem_fundo.png" alt="Logo" />
                </div>
            </header>

            <main className="main">
                <h1 className="title">Estoque da Vinil Store</h1>

                <button id='button-estq' onClick={handleAdicionarProduto}>Adicionar Produto</button> 

                <div className="grid">
                    {produtos.map((produto, index) => (
                        <div key={produto.produto_id} className={`card ${index % 3 === 2 ? 'last' : ''}`} onClick={() => handleAbreModal(produto)}>
                            <h3>{produto.nome}</h3>
                            <p>{produto.descricao}</p>
                            <p>Preço: R$ {produto.valor.toFixed(2)}</p>
                            <p>Quantidade: {produto.qtd_estoque}</p>
                        </div>
                    ))}
                </div>

                {produtoSelecionado && <ProdutoModal produto={produtoSelecionado} onClose={handleFechaModal} />}
            </main>

            <footer className="footer">
                <p>Gostou do projeto? Entre em <a href='https://www.linkedin.com/in/tiago-melari-81793862/'> contato </a> comigo!
                </p>
            </footer>
        </div>
    );
};
