document.getElementById("atividadeForm").onsubmit = async function(e) {
    e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
    const titulo = document.getElementById("titulo").value; // Pega o valor digitado no campo de nome de usuário
    const descricao = document.getElementById("descricao").value; // Pega o valor digitado no campo de descricao
    const dataEntrega = document.getElementById("dataEntrega").value

    // Faz uma requisição  POST para o servidor, enviando o nome e a descricao como um objetoJSON
    const res = await fetch('http://localhost:3000/cadastroEvento', {
        method: 'POST', // Define o método como POST (usado para enviar dados ao servidor)
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        // Converte o objeto { nome, descricao } em uma string JSON e envia no corpo da requisição
        body: JSON.stringify({ titulo: titulo, descricao: descricao, dataEntrega: dataEntrega })
    });

    // Espera pela resposta do servidor e converte a resposta em um objeto JSON
    const data = await res.json();
    if (data.sucesso){
        window.location.href = "ativdades_EventosProfessor.html";
    }
   
    console.log(titulo, descricao, dataEntrega)

};
