import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha }),
      });
      if (response.ok) {
        window.location.href = '/';
      } else {
        alert('Não foi possível validar suas credenciais, por favor tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao autenticar o usuário:', error);
      alert('Ocorreu um erro ao autenticar. Por favor, tente novamente.');
    }
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Vinil Store - Login</title>
        <meta name="description" content="Vinil Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Você está na Vinil, insira suas credenciais!
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <p className={styles.signup}>
          Novo usuário? <a href="/cadastro">Cadastre-se</a>
        </p>
      </main>

      <footer className={styles.footer}>
        Powered by <Link href='https://www.linkedin.com/in/tiago-melari-81793862/'>Tiago Melari</Link>
      </footer>
    </div>
  );
};
