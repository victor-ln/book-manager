# Minha Biblioteca - Aplicação Ionic

Este é um projeto de gerenciamento de livros desenvolvido com **Ionic Framework** e Angular. A aplicação permite que os usuários visualizem sua coleção de livros, acessem detalhes de cada livro, criem anotações e excluam itens da biblioteca. Além disso, inclui uma interface amigável, responsiva e visualmente agradável para facilitar o gerenciamento da sua biblioteca pessoal.

---

## 🛠️ **Funcionalidades**
- **Visualização de livros**: Exibe uma lista com os livros cadastrados, apresentando título, autor e capa.
- **Detalhes do livro**: Permite acessar informações detalhadas de cada livro.
- **Anotações**: Opção para criar, editar ou visualizar notas relacionadas ao livro.
- **Remoção de livros**: Exclua livros da coleção com facilidade.
- **Adição de novos livros**: Acesse a funcionalidade de adicionar novos livros à coleção.
- **Interface responsiva**: Layout ajustável para dispositivos móveis e desktop.

---

## ⚙️ **Como Rodar o Projeto**

### Pré-requisitos
- Node.js (versão 22)
- Ionic CLI instalado globalmente (`npm install -g @ionic/cli`)
- Angular CLI (`npm install -g @angular/cli`)

### **Instalação de Dependências**

#### **Backend**
1. Navegue para a pasta do backend:
   ```bash
   cd book-management-backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

#### **Frontend**
1. Navegue para a pasta do frontend:
   ```bash
   cd book-management-frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

---

## 🚀 **Execução do Projeto**

### **Backend**
1. Certifique-se de que todas as dependências foram instaladas.
2. Inicie o servidor:
   ```bash
   node server.js
   ```
3. O backend estará disponível em: `http://localhost:3000`

---

### **Frontend**
1. Certifique-se de que todas as dependências foram instaladas.
2. Inicie o servidor do Ionic:
   ```bash
   ionic serve
   ```
3. O frontend estará disponível em: `http://localhost:8100`

---

## 📂 **Outras Informações**

- **Banco de Dados**: O projeto utiliza um banco SQLite (`book_mgm.db`) que já está configurado no backend.
- **API Base URL**: Certifique-se de que o frontend está apontando para a URL do backend (geralmente `http://localhost:3000`). Isso pode ser ajustado no arquivo `environment.ts` do frontend, localizado em `book-management-frontend/src/environments/`.

**Qualquer dúvida ou problema, entre em contato com os colaboradores listados no README!**


---

## 🛠️ **Tecnologias Utilizadas**
- **Ionic Framework**: Para desenvolvimento da interface e funcionalidades responsivas.
- **Angular**: Para gerenciamento de estado e criação de componentes dinâmicos.
- **CSS Grid e Flexbox**: Para organização e responsividade do layout.
- **TypeScript**: Linguagem principal para o desenvolvimento da lógica do projeto.

---

## 📂 **Estrutura de Arquivos**

```
src/
├── app/
│   ├── home/                # Página inicial com a lista de livros
│   ├── details/             # Página de detalhes do livro
│   ├── add-book/            # Tela para adicionar novos livros
├── assets/                      # Assets como imagens e ícones
├── theme/                       # Estilização global (cores, variáveis etc.)
└── environments/                # Configurações de ambiente
```

---

## 🚀 **Próximos Passos**
- Implementar autenticação para múltiplos usuários.
- Possibilitar edição das informações dos livros.
- Exportação da coleção de livros para formatos como PDF ou CSV.

---

## 🤝 **Colaboradores**

| Nome                              |
|-----------------------------------|
| Victor Lima Nunes                 |
| Laylon Gilson dos Santos Gionda   |
| Davi Viegas                       |
| Breno Pessoa Braga                |
| Victor Batista                    |

Se você deseja contribuir com o projeto, envie um e-mail ou abra uma issue no repositório!

Aproveite a aplicação e organize sua biblioteca pessoal! 📚