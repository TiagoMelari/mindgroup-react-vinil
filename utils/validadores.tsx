const validarEmail = (email: string | null | undefined): boolean => {
    const emailStr = email?.toString();
    return !!emailStr && emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha: string | null | undefined): boolean => {
    return !!senha && senha.toString().length > 3;
}

const validarConfirmacaoSenha = (senha: string | null | undefined, confirmacao: string | null | undefined): boolean => {
    return !!senha && !!confirmacao && senha === confirmacao;
}

export {
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha
}
