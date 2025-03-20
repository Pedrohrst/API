const express = require('express');
const cors = require('cors'); // Habilitar CORS
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 8080;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'scripts')));

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

// Caminho para o banco de dados
const dbPath = 'C:\\Users\\joaop\\AppData\\Roaming\\DBeaverData\\workspace6\\.metadata\\sample-database-sqlite-1\\Chinook.db';

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados SQLite estabelecida.');
  }
});

// Rota de teste para garantir que o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando corretamente!');
});

// Rota para inserir um novo produto
app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, categoria } = req.body;

  const query = 'INSERT INTO produtos (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)';
  db.run(query, [nome, descricao, preco, categoria], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      nome,
      descricao,
      preco,
      categoria
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
