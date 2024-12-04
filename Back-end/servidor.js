// Importa as bibliotecas necessárias
const express = require('express'); // Express é uma biblioteca para criar servidores web em Node.js
const cors = require('cors'); // CORS permite que o servidor receba requisições de outras origens (domínios)
const mysql = require('mysql'); // Biblioteca para conexão com o banco de dados MySQL

const app = express(); // Cria uma instância do servidor Express

app.use(cors()); // Habilita o CORS para todas as rotas do servidor
app.use(express.json()); // Permite que o servidor aceite dados no formato JSON

// Configura as informações de conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: '192.168.171.210', // Endereço do servidor de banco de dados
    user: 'bd-majoras', // Nome de usuário do banco de dados
    password: 'majoras@123', // Senha do banco de dados
    database: 'bd-majoras' // Nome do banco de dados que será utilizado
});

// Conecta ao banco de dados MySQL
db.connect((err) => {
    // Verifica se houve um erro ao tentar conectar
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err); // Exibe o erro no console
        return; // Interrompe a execução se não conseguir conectar
    }
    console.log('Conectado ao banco de dados.'); // Exibe uma mensagem de sucesso no console
});

// Cria uma rota para autenticar o usuário
app.post('/autenticar', (req, res) => {
    // Extrai o nome e a senha enviados pelo cliente (index.html)
    const {email, senha, cargo} = req.body;


    // Consulta SQL para verificar se o usuário e a senha existem no banco de dados
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ? AND cargo=?';
    // Executa a consulta no banco de dados, substituindo os ? pelos valores de nome e senha
    db.query(sql, [email, senha, cargo], (err, results) => {
        // Verifica se houve um erro na consulta
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err); // Exibe o erro no console
            // Responde ao cliente informando que houve um erro no servidor
            res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
            return; // Interrompe a execução se houve um erro
        }

        console.log("Dados" + results)
        console.log("Dados" + results[0])
        console.log("Dados" + results[0].nome)

        console.log("Dados" + results)
        console.log("Dados" + results[0])
        console.log("Dados" + results[0].email)

        console.log("Dados" + results)
        console.log("Dados" + results[0])
        console.log("Dados" + results[0].senha)

        console.log("Dados" + results)
        console.log("Dados" + results[0])
        console.log("Dados" + results[0].cargo)


        // Verifica se a consulta retornou algum resultado (ou seja, usuário e senha válidos)
        if (results.length > 0) {
            res.json({ sucesso: true, nome: results[0].nome, email:results[0].email, cargo:results[0].cargo, senha:results[0].senha }); // Envia uma resposta de sucesso para o cliente

        } else {
            res.json({ sucesso: false }); // Envia uma resposta de falha para o cliente
        }
    });
});



// Rota para buscar as informações do usuário com país Brasil e cidade São Paulo
app.get('/usuario', (req, res) => {

    // Extrai o nome e a senha enviados pelo cliente (index.html)
    const { nome } = req.body;

    const sql = 'SELECT nome, email, senha, telefone, ocupacao, pais, cidade FROM Usuario WHERE nome = ?';
    db.query(sql, [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados do usuário:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar dados do usuário.' });
            return;
        }

        if (results.length > 0) {
            res.json({ nome: results[0].nome, email : results[0].email, cargo : results[0].cargo, senha : results[0].senha });
        } else {
            res.json({ sucesso: false, mensagem: 'Usuário não encontrado.' });
        }
    });
});




app.post('/cadastro', (req, res) => {
    // Extrai o nome e a senha enviados pelo cliente
    const {titulo, descricao, dataEntrega} = req.body;


    // Consulta SQL para verificar se o usuário e a senha existem no banco de dados
    const sql = 'INSERT INTO atividade (titulo, descricao, dataEntrega) VALUES (?, ?, ?)';
    // Executa a consulta no banco de dados, substituindo os ? pelos valores de nome e senha
    db.query(sql, [titulo, descricao, dataEntrega], (err, results) => {
        // Verifica se houve um erro na consulta
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err); // Exibe o erro no console
            // Responde ao cliente informando que houve um erro no servidor
            res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
            return; // Interrompe a execução se houve um erro
        }
        // Verifica se a consulta retornou algum resultado (ou seja, usuário e senha válidos)

       
            if(results.affectedRows > 0)
                res.json({ sucesso: true }); // Envia uma resposta de sucesso para o cliente
            else 
                res.json({ sucesso: false }); // Envia uma resposta de falha para o cliente
            

    });
});



// Rota para listar todas as atividades
app.get('/atividades', (req, res) => {
    const sql = 'SELECT * FROM atividade'; // Tabela 'atividade'
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
        }
        res.json(results); // Retorna todas as atividades
    });
});

// Rota para obter os dados da atividade pelo ID
app.get('/atividade/:id', (req, res) => { //rota para pegar os dados da atividade com o id na URL
    const id = req.params.id; //acessa o parâmetro da URL, pegando o id
    console.log(id);
    const sql = 'SELECT * FROM atividade WHERE Id = ?'; // Usando a coluna 'Id'
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
  
        }


        if (results.length > 0) {
            res.json(results[0]); // Retorna os dados da atividade
        } else {
            res.status(404).json({ erro: 'Atividade não encontrada' });
        }
    });
});

// Rota para editar a atividade
app.put('/editar/:id', (req, res) => { //define a rota apara atualizar os dados
    const { titulo, descricao, dataEntrega } = req.body;
    const id = req.params.id; //puxa o id da atividade que vai atualizar

    const sql = 'UPDATE atividade SET titulo = ?, descricao = ?, dataEntrega = ? WHERE Id = ?'; // Atualiza a tabela 'atividade'
    db.query(sql, [titulo, descricao, dataEntrega, id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao editar atividade' });
        }

        if (results.affectedRows > 0) {
            res.json({ sucesso: true });
        } else {
            res.status(404).json({ erro: 'Atividade não encontrada' });
        }
    });
});


// Rota para excluir uma atividade pelo ID
app.delete('/atividade/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM atividade WHERE Id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
        }

        if (results.affectedRows > 0) {
            res.json({ sucesso: true, mensagem: 'Atividade excluída com sucesso' });
        } else {
            res.status(404).json({ erro: 'Atividade não encontrada' });
        }
    });
});
    






app.post('/cadastroEvento', (req, res) => {
    // Extrai o nome e a senha enviados pelo cliente (index.html)
    const {titulo, descricao, dataEntrega} = req.body;


    // Consulta SQL para verificar se o usuário e a senha existem no banco de dados
    const sql = 'INSERT INTO eventos (titulo, descricao, dataEntrega) VALUES (?, ?, ?)';
    // Executa a consulta no banco de dados, substituindo os ? pelos valores de nome e senha
    db.query(sql, [titulo, descricao, dataEntrega], (err, results) => {
        // Verifica se houve um erro na consulta
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err); // Exibe o erro no console
            // Responde ao cliente informando que houve um erro no servidor
            res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
            return; // Interrompe a execução se houve um erro
        }
        // Verifica se a consulta retornou algum resultado (ou seja, usuário e senha válidos)

       
            if(results.affectedRows > 0)
                res.json({ sucesso: true }); // Envia uma resposta de sucesso para o cliente
            else 
                res.json({ sucesso: false }); // Envia uma resposta de falha para o cliente
            

    });
});




// Rota para listar todas as atividades
app.get('/eventos', (req, res) => {
    const sql = 'SELECT * FROM eventos'; // Tabela 'atividade'
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
        }
        res.json(results); // Retorna todas as atividades
    });
});

// Rota para obter os dados da atividade pelo ID
app.get('/evento/:id', (req, res) => { //rota para pegar os dados da atividade com o id na URL
    const id = req.params.id; //acessa o parâmetro da URL, pegando o id

    const sql = 'SELECT * FROM eventos WHERE Id = ?'; // Usando a coluna 'Id'
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
  
        }

        if (results.length > 0) {
            res.json(results[0]); // Retorna os dados da atividade
        } else {
            res.status(404).json({ erro: 'evento não encontrado' });
        }
    });
});

// Rota para editar a atividade
app.put('/editarEvento/:id', (req, res) => { //define a rota apara atualizar os dados
    const { titulo, descricao, dataEntrega } = req.body;
    const id = req.params.id; //puxa o id da atividade que vai atualizar

    const sql = 'UPDATE eventos SET titulo = ?, descricao = ?, dataEntrega = ? WHERE Id = ?'; // Atualiza a tabela 'atividade'
    db.query(sql, [titulo, descricao, dataEntrega, id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao editar evento' });
        }

        if (results.affectedRows > 0) {
            res.json({ sucesso: true });
        } else {
            res.status(404).json({ erro: 'evento não encontrado' });
        }
    });
});



// Rota para excluir uma atividade pelo ID
app.delete('/evento/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM eventos WHERE Id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco de dados' });
        }

        if (results.affectedRows > 0) {
            res.json({ sucesso: true, mensagem: 'evento excluído com sucesso' });
        } else {
            res.status(404).json({ erro: 'evento não encontrado' });
        }
    });
});
    

// Rota para editar a senha
app.put('/mudarSenha', (req, res) => {
    const { senha, email } = req.body; // Obtém a senha e o email do corpo da requisição

    if (!senha || !email) {
        return res.status(400).json({ erro: 'Senha ou email não fornecido' });
    }

    // Atualizando a senha no banco de dados
    const sql = 'UPDATE usuario SET senha=? WHERE email=?';
    db.query(sql, [senha, email], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao mudar senha' });
        }

        if (results.affectedRows > 0) {
            res.json({ sucesso: true });
        } else {
            res.status(404).json({ erro: 'Email não encontrado' });
        }
    });
});

// Porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});



