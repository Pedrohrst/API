const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;


app.use(express.json());
const dbPath = 'C:\\Users\\joaop\\AppData\\Roaming\\DBeaverData\\workspace6\\.metadata\\sample-database-sqlite-1\\Chinook.db';


const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados SQLite estabelecida.');
  }
});


app.get('/', (req, res) => {
  res.send('Servidor funcionando corretamente!');
});


app.post('/produtos', (req, res) => {
  console.log('Recebendo dados para cadastro de produto:', req.body);

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


app.post('/estoque', (req, res) => {
  const { produto_id, quantidade_em_estoque, quantidade_em_rotativo } = req.body;

  const query = 'INSERT INTO estoque (produto_id, quantidade_em_estoque, quantidade_em_rotativo) VALUES (?, ?, ?)';
  db.run(query, [produto_id, quantidade_em_estoque, quantidade_em_rotativo], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, produto_id, quantidade_em_estoque, quantidade_em_rotativo });
  });
});


app.post('/vendas', (req, res) => {
  const { produto_id, quantidade, data_venda } = req.body;

  const query = 'INSERT INTO vendas (produto_id, quantidade, data_venda) VALUES (?, ?, ?)';
  db.run(query, [produto_id, quantidade, data_venda], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, produto_id, quantidade, data_venda });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
