
// Função para carregar atividades do banco de dados
async function carregarAtividades() { //função para requisição no servidor
    try {
        const response = await fetch('http://localhost:3000/atividades');
        const atividades = await response.json();

        const listaAtividades = document.getElementById('listaAtividades'); //id onde sera feito a lista
        listaAtividades.innerHTML = ''; // Limpa a lista antes de adicionar os itens

        atividades.forEach(atividade => { //itera as atividades em uma lista
            const div = document.createElement('div'); 
            div.classList.add('atividade');
            div.innerHTML  = ` 
                <p>${atividade.titulo} 
                    <a href="editarAtividade.html?id=${atividade.Id}" class="link-atividade"><i class='bx bx-edit-alt'></i></a>
                </p>
                <button class="btn-excluir" data-id="${atividade.Id}">
                    <i class='bx bx-trash'></i>
                </button>
            `; //cria uma nova div para cada atividade, com título e um link de editar com o id
            listaAtividades.appendChild(div); //adiciona as novas div na lista
        });

         // Adiciona eventos de clique aos botões de excluir
         document.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', excluirAtividade);
        });

        
    } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        alert('Erro ao carregar as atividades.');
    }
}

// Chama a função para carregar as atividades assim que a página for carregada
window.onload = carregarAtividades;

/* Quando a página é carregada, uma requisição GET é feita para o servidor para buscar todas as atividades.
    As atividades são exibidas com um link para editar cada uma, passando o id da atividade na URL. */



async function excluirAtividade(event) {
    const button = event.target.closest('.btn-excluir'); // Garante que pegamos o botão, mesmo se clicar no ícone
    const id = button.getAttribute('data-id'); // Obtém o ID da atividade

    const confirmar = confirm('Tem certeza que deseja excluir esta atividade?');
    if (!confirmar) return; // Cancela a exclusão se o usuário não confirmar

    try {
        const response = await fetch(`http://localhost:3000/atividade/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir atividade: ${response.statusText}`);
        }

        alert('Atividade excluída com sucesso!');
        carregarAtividades(); // Atualiza a lista
    } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        alert('Erro ao excluir a atividade.');
    }
}
