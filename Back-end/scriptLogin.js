// Evento de submissão do formulário
document.getElementById("loginForm").onsubmit = async function(e) {
    e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
    const email = document.getElementById("usuario").value; // Pega o valor digitado no campo de nome de usuário
    const senha = document.getElementById("senha").value; // Pega o valor digitado no campo de senha
    const cargo = document.getElementById("cargo").value

    // Faz uma requisição  POST para o servidor, enviando o nome e a senha como um objetoJSON
    const res = await fetch('http://localhost:3000/autenticar', {
        method: 'POST', // Define o método como POST (usado para enviar dados ao servidor)
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        // Converte o objeto { nome, senha } em uma string JSON e envia no corpo da requisição
        body: JSON.stringify({ email: email, senha: senha, cargo: cargo })
    });

    // Espera pela resposta do servidor e converte a resposta em um objeto JSON
    const data = await res.json();
    // Verifica se o login foi bem-sucedido
    // Verifica o cargo do usuário e redireciona conforme necessário
    if (data.sucesso) {
        if (cargo === 'Aluno') {
            // Redireciona para a página de cadastro de atividades para alunos
            window.location.href = "cadastroAtividade.html";
        } else if (cargo === 'Professor') {
            // Redireciona para a página de edição de atividades para professores
            window.location.href = "editarAtividade.html";
        }
    } else {
        // Exibe uma mensagem de erro se o nome de usuário, senha ou cargo estiverem incorretos
        document.getElementById("mensagem").textContent = "Usuário ou senha ou cargo incorretos.";
    }
};
