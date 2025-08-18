# ICteca - Biblioteca Online

Este projeto é uma aplicação web desenvolvida como parte da avaliação da disciplina **Redes II**. Ele integra um **front-end em React** com um **back-end em .NET Core** (Outro Repositório), onde usuários podem cadastrar livros, adicionar autores e buscar informações sobre eles por meio de uma API REST.

---

## Funcionalidades

### Usuário
- Cadastro de novos usuários
- Login e autenticação
- Visualização de perfil e status de conexão

### Curador (Administrador)
- Adicionar livros com título, descrição e autor
- Buscar autores existentes
- Adicionar novos autores com biografia/descrição

### Pesquisa
- Buscar livros por nome
- Exibição dos resultados em cards com título, autor e descrição

---

## Tecnologias Utilizadas

- **Front-end:** React, CSS Modules
- **Back-end:** .NET Core Web API
- **Banco de Dados:** MySQL, PostgreSQL ou outro relacional
- **Containerização:** Docker e Docker Compose
- **Controle de Versão:** Git / GitHub

---

## Estrutura do Projeto

### Front-end
- `Home.jsx` → Página principal, busca de livros
- `LoginRegister.jsx` → Gerenciamento de login e cadastro de usuários
- `Curator.jsx` → Curadoria de livros e autores
- `Navegacao.jsx` → Menu de navegação entre páginas
- `*.css` → Estilização de cada componente

### Back-end
- API em **.NET Core** que expõe endpoints para:
  - `POST /Book/add` → Adicionar livro
  - `GET /Book/search` → Buscar livros por nome
  - `POST /Author/add` → Adicionar autor
  - `GET /Author/search` → Buscar autores por nome
  - `POST /register` → Cadastro de usuários
  - `POST /login` → Login de usuários

---