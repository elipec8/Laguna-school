const senha = localStorage.getItem("senha");
const email = localStorage.getItem("email");
console.log(senha);

// Evento de submissão do formulário de alteração de senha
document.getElementById("alterarSenhaForm").onsubmit = async function (e) {
    e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
    
    // Pega os valores dos campos de senha
    const senhaAntiga = document.getElementById("senhaAntiga").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarNovaSenha = document.getElementById("confirmarNovaSenha").value;
    console.log(senhaAntiga);

    // Verifica se a senha antiga está correta
    if (senhaAntiga !== senha) {
        document.getElementById("mensagem").textContent = "Senha antiga incorreta.";
        return;
    }

    // Verifica se as novas senhas coincidem
    if (novaSenha !== confirmarNovaSenha) {
        document.getElementById("mensagem").textContent = "As novas senhas não coincidem.";
        return;
    }

    // Atualiza a senha no localStorage
    localStorage.setItem("senha", novaSenha); 

        

    // Envia a nova senha e o email para o servidor
    const res = await fetch('http://localhost:3000/mudarSenha', {
        method: 'PUT', // Define o método como PUT
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ senha: novaSenha, email: email }) // Passando a senha e o email
    });

    // Espera pela resposta do servidor e converte a resposta em um objeto JSON
    const data = await res.json();
    if (data.sucesso) {
        alert("senha alterada com sucesso")
        window.location.href = "telaTeste.html"; // Redireciona em caso de sucesso
    } else {
        document.getElementById("mensagem").textContent = data.erro || "Erro ao alterar senha";
    }

    console.log(senha, novaSenha);
};