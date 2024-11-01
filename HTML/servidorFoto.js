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


app.post('/trocarFoto', (req, res) => {
    // Extrai o nome e a senha enviados pelo cliente (index.html)
    const {email, senha, cargo} = req.body;


    // Consulta SQL para verificar se o usuário e a senha existem no banco de dados
    const sql = 'UPDATE * FROM usuario WHERE email = ? AND senha = ? AND cargo=?';
