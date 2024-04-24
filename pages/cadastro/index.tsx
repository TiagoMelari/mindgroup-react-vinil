import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { validarEmail, validarSenha, validarConfirmacaoSenha } from '../../utils/validadores';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!validarEmail(email)) {
      setMensagem('Email inválido');
      return;
    }

    if (!validarSenha(senha)) {
      setMensagem('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!validarConfirmacaoSenha(senha, confirmacaoSenha)) {
      setMensagem('A senha e a confirmação não coincidem ou são inválidas');
      return;
    }

    try {
      const response = await fetch('/pags/api/cadastro', {
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
      console.error('Erro ao cadastrar o usuário:', error);
      setMensagem('Erro ao cadastrar usuário! Por favor, tente novamente.');
    }
  };

  return (
    <div className="container-cadastro">
      <Head>
        <title>Vinil Store - Cadastro</title>
        <meta name="description" content="Cadastro de usuário na Vinil Store" />
      </Head>

      <header className="header">
        <div className="logo_container">
          <img className="logo" src="/imgs/logo_sem_fundo.png" alt="Logo" />
        </div>
      </header>

      <main className="main">
        <h1 className="title">
          Cadastro na Vinil Store
        </h1>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="nome" className="label">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className='input'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha" className="label">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            className='input'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <label htmlFor="confirmacaoSenha" className="label">Confirmação de Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            className='input'
            value={confirmacaoSenha}
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
          />

          <button type="submit" className='button'>Cadastrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <p className="signup">
          Já possui uma conta? <Link href="/" className='cadastro'>Faça login</Link>
        </p>
      </main>


      <footer className="footer">
        <p>Gostou do projeto? Entre em <Link href='https://www.linkedin.com/in/tiago-melari-81793862/'>contato </Link> comigo!
        </p>
      </footer>
    </div>
  );
};

