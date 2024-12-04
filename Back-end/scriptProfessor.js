const nome = localStorage.getItem("nome");
const senha = localStorage.getItem("senha");
const email = localStorage.getItem("email");
const cargo = localStorage.getItem("cargo");


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
                <p id="${atividade.titulo}">${atividade.titulo} 
                    | Data de Entrega: ${atividade.dataEntrega}
                <a href="editarAtividade.html?id=${atividade.Id}" class="link-atividade"><i class='bx bx-edit-alt'></i></a>
                    
                </p>
                <button class="btn-excluirAtividade" data-id="${atividade.Id}">
                    <i class='bx bx-trash' id="excluir"></i>
                </button>
                <button class="btn-detalhesAtividade2" data-id="${atividade.Id}">
                    Detalhes
                </button>
            `; //cria uma nova div para cada atividade, com título e um link de editar com o id
            listaAtividades.appendChild(div); //adiciona as novas div na lista
        });

         // Adiciona eventos de clique aos botões de excluir
         document.querySelectorAll('.btn-excluirAtividade').forEach(button => {
            button.addEventListener('click', excluirAtividade);
        });

        // Adiciona eventos de clique ao botão de detalhes
        document.querySelectorAll('.btn-detalhesAtividade2').forEach(button => {
            button.addEventListener('click', mostrarDetalhesAtividade);
        });


    } catch (error) {
        console.error('Erro ao carregar atividades:', error);
        alert('Erro ao carregar as atividades.');
    }
}

// Chama a função para carregar as atividades assim que a página for carregada


/* Quando a página é carregada, uma requisição GET é feita para o servidor para buscar todas as atividades.
    As atividades são exibidas com um link para editar cada uma, passando o id da atividade na URL. */



async function excluirAtividade(event) { //função para requisição no servidor ao clicar o botão
    const button = event.target.closest('.btn-excluirAtividade'); // aciona o botão de excluir  // Garante que pegamos o botão, mesmo se clicar no ícone
    const id = button.getAttribute('data-id'); // Obtém o ID da atividade

    const confirmar = confirm('Tem certeza que deseja excluir esta atividade?'); //aciona um tipo de alert de confirmação
    if (!confirmar) return; // Cancela a exclusão se o usuário não confirmar

    try {
        const response = await fetch(`http://localhost:3000/atividade/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir atividade: ${response.statusText}`);
        } //verifica se tem algum erro, caso sim mostra uma mensagem detalhada

        alert('Atividade excluída com sucesso!');
        carregarAtividades(); // Atualiza a lista
    } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        alert('Erro ao excluir a atividade.');
    }
}

desc = " ";

async function mostrarDetalhesAtividade(event) {
    const button = event.target.closest('.btn-detalhesAtividade2');
    const id = button.getAttribute('data-id');

    try {
        // Faz uma requisição para buscar os detalhes da atividade
        const response = await fetch(`http://localhost:3000/atividade/${id}`);
        const atividade = await response.json();

        // Preenche o conteúdo do modal com os dados da atividade
        const modal = document.querySelector('dialog');
        const descricaoInput = modal.querySelector('.descrição');
        descricaoInput.value = atividade.descricao;
        desc = descricaoInput.value;
        // Mostra o modal
        modal.showModal();
    } catch (error) {
        console.error('Erro ao carregar os detalhes da atividade:', error);
        alert('Erro ao carregar os detalhes da atividade.');
    }
}

// Função para fechar o modal
const buttonClose = document.querySelector("dialog button");
buttonClose.onclick = function () {
    const modal = document.querySelector("dialog");
    modal.close();
}









// Função para carregar atividades do banco de dados
async function carregarEventos() { //função para requisição no servidor
    try {
        const response = await fetch('http://localhost:3000/eventos');
        const eventos = await response.json();

        const listaEventos = document.getElementById('listaEventos'); //id onde sera feito a lista
        listaEventos.innerHTML = ''; // Limpa a lista antes de adicionar os itens

        eventos.forEach(evento => { //itera as atividades em uma lista
            const div = document.createElement('div'); 
            div.classList.add('evento');
            div.innerHTML  = ` 
                <p>${evento.titulo} 
                    | Data de Entrega: ${evento.dataEntrega}
                    <a href="editarEvento.html?id=${evento.Id}" class="link-evento"><i class='bx bx-edit-alt' id="editar"></i></a>
                </p>
                <button class="btn-excluirEvento" data-id="${evento.Id}">
                    <i class='bx bx-trash' id="excluir"></i>
                </button>
                <button class="btn-detalhesAtividade" data-id="${evento.Id}">
                    Detalhes
                </button>
                

            `; //cria uma nova div para cada atividade, com título e um link de editar com o id
            listaEventos.appendChild(div); //adiciona as novas div na lista
        });

         // Adiciona eventos de clique aos botões de excluir
         document.querySelectorAll('.btn-excluirEvento').forEach(button => {
            button.addEventListener('click', excluirEvento);
        });
        

        // Adiciona eventos de clique ao botão de detalhes
        document.querySelectorAll('.btn-detalhesAtividade').forEach(button => {
            button.addEventListener('click', mostrarDetalhesEvento);
        });

        // Adiciona eventos de clique ao botão de detalhes
        document.querySelectorAll('.botao-transparente2').forEach(button => {
            button.addEventListener('click', participar);
        });

        document.querySelectorAll('.botao-transparente1').forEach(button => {
            button.addEventListener('click', naoParticipar);
        });

        
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        alert('Erro ao carregar os eventos.');
    }
}


/* Quando a página é carregada, uma requisição GET é feita para o servidor para buscar todas as atividades.
    As atividades são exibidas com um link para editar cada uma, passando o id da atividade na URL. */



async function excluirEvento(event) { //função para requisição no servidor ao clicar o botão
    const button = event.target.closest('.btn-excluirEvento'); // aciona o botão de excluir  // Garante que pegamos o botão, mesmo se clicar no ícone
    const id = button.getAttribute('data-id'); // Obtém o ID da atividade

    const confirmar = confirm('Tem certeza que deseja excluir este evento?'); //aciona um tipo de alert de confirmação
    if (!confirmar) return; // Cancela a exclusão se o usuário não confirmar

    try {
        const response = await fetch(`http://localhost:3000/evento/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir atividade: ${response.statusText}`);
        } //verifica se tem algum erro, caso sim mostra uma mensagem detalhada

        alert('Evento excluído com sucesso!');
        carregarEventos(); // Atualiza a lista
    } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        alert('Erro ao excluir o Evento.');
    }
}




async function mostrarDetalhesEvento(event) {
    const button = event.target.closest('.btn-detalhesAtividade');
    const id = button.getAttribute('data-id');

    try {
        // Faz uma requisição para buscar os detalhes da atividade
        const response = await fetch(`http://localhost:3000/evento/${id}`);
        const evento = await response.json();

        console.log(evento);

        // Preenche o conteúdo do modal com os dados da atividade
        const modal1 = document.querySelector('dialog');
        const descricaoInput1 = modal1.querySelector('.descrição');
        descricaoInput1.value = evento.descricao;

        // Mostra o modal
        modal1.showModal();
    } catch (error) {
        console.error('Erro ao carregar os detalhes do evento:', error);
        alert('Erro ao carregar os detalhes do evento.');
    }
}

// Função para fechar o modal
const buttonClose1 = document.querySelector("dialog button");
buttonClose1.onclick = function () {
    const modal = document.querySelector("dialog");
    modal.close();
}


// Chama a função para carregar as atividades assim que a página for carregada
window.onload = function() {
    carregarAtividades();
    carregarEventos();
};



async function participar(event){
    const buttonParticipar = event.target.closest('.botao-transparente2');
    const id = buttonParticipar.getAttribute('data-id');
    try {
        
        alert("você esta participado")



    } catch (error) {
        console.error('Erro ao participar:', error);
        alert('Erro ao participar.');
    }
}


async function naoParticipar(event){
    const buttonNaoParticipar = event.target.closest('.botao-transparente1');
    const id = buttonNaoParticipar.getAttribute('data-id');
    try {
        
        alert("você não esta participado")



    } catch (error) {
        console.error('Erro ao não participar:', error);
        alert('Erro ao não participar.');
    }
}