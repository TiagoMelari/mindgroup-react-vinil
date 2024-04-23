import Head from "next/head";
import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, { useState } from "react";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha })
            });
            if (response.ok) {
                setMensagem('Usuário cadastrado com sucesso!');
            } else {
                setMensagem('Erro ao cadastrar usuário! Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar o usuário', error);
            setMensagem('Erro ao cadastrar usuário! Por favor, tente novamente.');
        }
    }

    return (
        <div className={styles.container}>
          <Head>
            <title>Vinil Store - Cadastro</title>
            <meta name="description" content="Cadastro de usuário na Vinil Store" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className={styles.main}>
            <h1 className={styles.title}>
              Cadastro na Vinil Store
            </h1>
    
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome:</label>
              <input 
                type="text" 
                id="nome" 
                name="nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
    
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
    
              <label htmlFor="senha">Senha:</label>
              <input 
                type="password" 
                id="senha" 
                name="senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
    
              <button type="submit">Cadastrar</button>
            </form>
    
            {mensagem && <p>{mensagem}</p>}
    
            <p className={styles.signup}>
              Já possui uma conta? <Link href="/">Faça login</Link>
            </p>
          </main>
    
          <footer className={styles.footer}>
            Powered by <Link href='https://www.linkedin.com/in/tiago-melari-81793862/'>Tiago Melari</Link>
          </footer>
        </div>
    );
};