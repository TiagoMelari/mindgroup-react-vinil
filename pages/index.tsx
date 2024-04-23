import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';


export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !senha) return;

    try {
      const response = await fetch('/pags/api/login', {
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
    <div className="container">
      <Head>
        <title>Vinil Store - Login</title>
        <meta name="description" content="Vinil Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          Bem vindo a Vinil!
        </h1>

        <form className="form" onSubmit={handleSubmit}>
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

        <p className="signup">
          Novo usuário? 
           <Link href="/cadastro">
            Cadastre-se
           </Link>
        </p>
      </main>

      <footer className="footer">
        <p>Gostou do projeto? Entre em
          <Link href='https://www.linkedin.com/in/tiago-melari-81793862/'> contato </Link>
          comigo!
        </p>
      </footer>
    </div>
  );
};
