const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Banco de Dados SQLite
const db = new sqlite3.Database('book_mgm.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      author TEXT,
      title TEXT,
      isbn TEXT UNIQUE,
      pages INTEGER,
      status TEXT,
      cover_link TEXT,
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      note TEXT,
      page INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      books_idbooks INTEGER,
      FOREIGN KEY(books_idbooks) REFERENCES books(id)
    )
  `);

  console.log('Tabelas criadas ou já existentes.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;

  db.get('SELECT * FROM books WHERE id = ?', [bookId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Livro não encontrado' });
    } else {
      res.json(row);
    }
  });
});

app.post('/books', async (req, res) => {
  const { isbn } = req.body;

  if (!isbn) {
    return res.status(400).json({ error: 'ISBN é obrigatório' });
  }

  try {
    // Busca os detalhes do livro usando a API do Google Books
    const googleBooksApi = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const response = await axios.get(googleBooksApi);

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado na API' });
    }

    const bookDetails = response.data.items[0].volumeInfo;

    // Obter informações do livro
    const author = bookDetails.authors ? bookDetails.authors.join(', ') : 'Autor desconhecido';
    const title = bookDetails.title || 'Título desconhecido';
    const pages = bookDetails.pageCount || 0;
    const status = 'available';
    const coverLink = bookDetails.imageLinks?.thumbnail || 'https://placehold.co/120x160/cyan/white';
    const start_date = new Date().toISOString().split('T')[0]; // Data atual
    const end_date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // 1 ano depois
      .toISOString()
      .split('T')[0];

    // Inserção no banco de dados
    const sql = `
      INSERT INTO books (author, title, isbn, pages, status, cover_link, start_date, end_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    db.run(sql, [author, title, isbn, pages, status, coverLink, start_date, end_date], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        author,
        title,
        isbn,
        pages,
        status,
        cover_link: coverLink,
        start_date,
        end_date,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });
  } catch (err) {
    console.error('Erro ao buscar livro na API:', err.message);
    res.status(500).json({ error: 'Erro ao buscar livro na API' });
  }
});

app.get('/books/:id/notes', (req, res) => {
  const bookId = req.params.id;

  db.all('SELECT id, note, page, created_at FROM notes WHERE books_idbooks = ?', [bookId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // Formatar a data de cada nota
      const formattedRows = rows.map(row => {
        return {
          ...row,
          created_at: new Date(row.created_at).toISOString(), // Converte a data para formato ISO
        };
      });
      res.json(formattedRows);
    }
  });
});

// Supondo que o backend seja Node.js com Express
app.post('/books/:bookId/notes', (req, res) => {
  const { note, page } = req.body;
  const bookId = req.params.bookId;
  
  db.run(`
    INSERT INTO notes (note, page, books_idbooks)
    VALUES (?, ?, ?)`, [note, page, bookId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      id: this.lastID,
      note: note,
      page: page,
    });
  });
});

// Rota para excluir um livro
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;

  db.run('DELETE FROM books WHERE id = ?', [bookId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json({ message: 'Livro removido com sucesso' });
  });
});

// Rota para excluir nota
app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  db.run('DELETE FROM notes WHERE id = ?', [noteId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Nota não encontrada' });
    }
    res.status(200).json({ message: 'Nota excluída com sucesso' });
  });
});
