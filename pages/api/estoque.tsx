    import Head from 'next/head';
    import Link from 'next/link';
    import styles from '../../styles/Home.module.css';
    import React, { useState, useEffect } from 'react';
    import Produto from '../../types/Produto';
    import ProdutoModal from '../../modals/ProdutoModal';


    export default function Estoque() {
        const [produtos, setProdutos] = useState<Produto[]>([]);
        const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

        const buscaProdutos = async () => {
            try {
                const response = await fetch('/api/estoque');
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
            <div className={styles.container}>
                <Head>
                    <title>Vinil Store - Estoque</title>
                    <meta name="description" content="Estoque da Vinil Store" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>Estoque da Vinil Store</h1>

                    <button>Adicionar Produto</button>

                    <div className={styles.grid}>
                        {produtos.map((produto) => (
                            <div key={produto.produto_id} className={styles.card} onClick={() => handleAbreModal(produto)}>
                                <h3>{produto.nome}</h3>
                                <p>{produto.descricao}</p>
                                <p>Preço: R$ {produto.valor.toFixed(2)}</p>
                                <p>Quantidade: {produto.qtd_estoque}</p>
                            </div>
                        ))}
                    </div>

                    {produtoSelecionado && <ProdutoModal produto={produtoSelecionado} onClose={handleFechaModal} />}
                </main>

                <footer className={styles.footer}>
                    Powered by <Link href="https://www.linkedin.com/in/tiago-melari-81793862/">Tiago Melari</Link>
                </footer>
            </div>
        );
    };