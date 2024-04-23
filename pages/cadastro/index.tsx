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
    <div className="container"> {/* Use a classe diretamente */}
      <Head>
        <title>Vinil Store - Cadastro</title>
        <meta name="description" content="Cadastro de usuário na Vinil Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main"> {/* Use a classe diretamente */}
        <h1 className="title"> {/* Use a classe diretamente */}
          Cadastro na Vinil Store
        </h1>

        <form className="form" onSubmit={handleSubmit}> {/* Use a classe diretamente */}
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

          <label htmlFor="confirmacaoSenha">Confirmação de Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={confirmacaoSenha}
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <p className="signup"> {/* Use a classe diretamente */}
          Já possui uma conta? <Link href="/">Faça login</Link>
        </p>
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

