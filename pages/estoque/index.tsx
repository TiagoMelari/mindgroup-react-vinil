import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Produto from '../../types/Produto';
import ProdutoModal from '../../modals/ProdutoModal';

export default function Estoque() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

    const buscaProdutos = async () => {
        try {
            const response = await fetch('/pags/api/estoque');
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    useEffect(() => {
        buscaProdutos();
    }, []);

    const handleAbreModal = (produto: Produto) => {
        setProdutoSelecionado(produto);
    }

    const handleFechaModal = () => {
        setProdutoSelecionado(null);
    }

    return (
        <div className="container"> {/* Use a classe diretamente */}
            <Head>
                <title>Vinil Store - Estoque</title>
                <meta name="description" content="Estoque da Vinil Store" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main"> {/* Use a classe diretamente */}
                <h1 className="title">Estoque da Vinil Store</h1>

                <button>Adicionar Produto</button>

                <div className="grid"> {/* Use a classe diretamente */}
                    {produtos.map((produto) => (
                        <div key={produto.produto_id} className="card" onClick={() => handleAbreModal(produto)}> {/* Use a classe diretamente */}
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
                <p>Gostou do projeto? Entre em
                    <Link href='https://www.linkedin.com/in/tiago-melari-81793862/'>contato</Link>
                    comigo!
                </p>
            </footer>
        </div>
    );
};
