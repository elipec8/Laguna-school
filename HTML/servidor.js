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
    const {email, senha} = req.body;


    // Consulta SQL para verificar se o usuário e a senha existem no banco de dados
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    // Executa a consulta no banco de dados, substituindo os ? pelos valores de nome e senha
    db.query(sql, [email, senha], (err, results) => {
        // Verifica se houve um erro na consulta
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err); // Exibe o erro no console
            // Responde ao cliente informando que houve um erro no servidor
            res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
            return; // Interrompe a execução se houve um erro
        }

        // Verifica se a consulta retornou algum resultado (ou seja, usuário e senha válidos)
        if (results.length > 0) {
            res.json({ sucesso: true }); // Envia uma resposta de sucesso para o cliente
        } else {
            res.json({ sucesso: false }); // Envia uma resposta de falha para o cliente
        }
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000'); // Exibe uma mensagem informando que o servidor está rodando
});
