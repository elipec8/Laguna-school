// Função para pegar o parâmetro 'id' da URL
function getUrlParameter(name) {  //captura o valor do parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search); //cria um objeto, usa uma API que acessa a consulta do parâmetro
    return urlParams.get(name); //retorna o valor do parâmetro (id)
}

// Ao carregar a página, pegar o ID da URL e buscar os dados da atividade
async function carregarEventos() { 
    const id = getUrlParameter('id'); // Pega o 'id' da URL
    if (!id) { 
        alert("ID do evento não encontrado.");
        return;
    } //se não exisitr o id aparece um alerta e cancela a execução

    try {
        // Faz uma requisição para o servidor para pegar os dados da atividade, usando o id fornecido anteriormente
        const response = await fetch(`http://localhost:3000/evento/${id}`);
        const data = await response.json(); //converte para json

        if (data.erro) {
            alert("Erro ao buscar o evento.");
            return;
        }

        // Preenche os campos do formulário com os dados da atividade, puxados pelo id fornecido anteriormente
        document.getElementById('titulo').value = data.titulo;
        document.getElementById('descricao').value = data.descricao;
        document.getElementById('dataEntrega').value = data.dataEntrega;
        
    } catch (error) {
        console.error('Erro ao carregar dados do evento:', error);
        alert("Erro ao carregar os dados do evento.");
    }
}

// Chama a função quando a página for carregada
window.onload = carregarEventos;

// Ao enviar o formulário, envia os dados atualizados para o servidor
document.getElementById('editarForm').onsubmit = async function (e) {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const id = getUrlParameter('id'); // Pega o ID da URL novamente
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const dataEntrega = document.getElementById('dataEntrega').value;


    try {
        const response = await fetch(`http://localhost:3000/editarEvento/${id}`, {
            method: 'PUT', //método para atulizar os dados já existentes
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao, dataEntrega})
        });

        const data = await response.json();

        if (data.sucesso) {
            alert('Evento atualizado com sucesso!'); //pop-up com a mensagem de sucesso
            window.location.href = 'telaTeste.html';  // Redireciona de volta para a página principal
        } else {
            alert('Erro ao atualizar o evento.'); //pop-up com a mensagem de erro
        }
    } catch (error) {
        console.error('Erro ao editar a atividade:', error);
        alert('Erro ao editar a atividade.');
    }
};

/*  Quando o usuário clica no link de "editar", ele é redirecionado para editar.html?id=27 (por exemplo).
    A página faz uma requisição GET para buscar os dados da atividade com o id fornecido na URL.
    O formulário é preenchido com os dados da atividade, e o usuário pode editá-los.
    Ao enviar o formulário, uma requisição PUT é feita para o servidor com os dados atualizados.
    Se a atualização for bem-sucedida, o usuário é redirecionado para a página principal. */
