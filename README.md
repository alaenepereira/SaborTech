# 🍽️ SaborTech

**SaborTech** é uma aplicação web desenvolvida em **React**, que une gastronomia e tecnologia para facilitar a gestão de cardápios em estabelecimentos. A plataforma permite visualizar produtos por categoria, adicionar novos itens ao cardápio e editar o estoque de forma intuitiva e responsiva.

---

## 🌐 Visão Geral

A interface da aplicação é organizada em páginas conectadas por navegação com React Router:

- `Home`: Apresentação institucional com design responsivo.
- `Cardápio`: Lista de produtos divididos por categorias.
- `Adicionar ao cardápio`: Cadastro de novos produtos.
- `Controle de estoque`: Edição de produtos existentes.

---

## 🚀 Funcionalidades

### 🏠 Página Principal 
"Rota: (`/`)"
- Componente `Header` fixo no topo com links de navegação.
- Seção `hero` com imagem de fundo e slogan:  
  **"O sabor da eficiência começa aqui: SaborTech conectando sabores à tecnologia."**
- Estilo responsivo para celulares e desktops.

---

### 🍽️ Menu de Categorias
"Rota: (`/cardápio`)"
- Botões de filtro por categoria: Cafés, Pratos, Saladas, Massas, Extras, Sobremesas, Bebidas.
- Exibição de cards com:
  - Imagem do item
  - Nome, descrição, preço e estoque
- Totalmente responsivo e adaptado para diferentes telas.

---

### ➕ Adicionar Produto 
"Rota: (`/add`)"
- Formulário de cadastro com campos como:
  - Nome do item
  - Descrição
  - Preço
  - Categoria
  - Quantidade em estoque
  - Upload de imagem
- Validação básica de campos.
- O produto é adicionado diretamente à lista de exibição por meio da MockAPI.

---

### ✏️ Controle de Estoque 
"Rota: (`/editar`)"
- Listagem de todos os itens cadastrados.
- Funcionalidade de:
  - **Editar** nome, descrição, estoque, preço e imagem.
  - **Excluir** produtos do sistema.
- Atualização imediata na visualização, mantendo os dados consistentes na interface.


---

## 🔗 API Utilizada

A aplicação utiliza a [MockAPI](https://6864793d5b5d8d03397d5080.mockapi.io/cadastro_produto) como backend simulado, com os seguintes endpoints:

GET /products → Lista todos os produtos
POST /products → Cadastra novo produto
PUT /products/:id → Atualiza dados de um produto
DELETE /products/:id → Remove um produto


## 🛠️ Tecnologias Utilizadas

- **React** 
- **React Router DOM** – navegação entre rotas
- **React Bootstrap** – componentes de layout e estilo
- **Material UI (MUI)** – botões, grid e cards
- **CSS Modules** – estilização modular e responsiva
- **MockAPI** – simulação de backend RESTful
- **useMediaQuery** – controle de estilos com base no tamanho da tela

---

## 📂 Estrutura de Pastas (resumida)

src/
├── Components/
│ ├── Header/
│ │ └── Index.jsx
│ └── Footer/
├── Pages/
│ ├── Home/
│ │ ├── home.jsx
│ │ └── home.css
│ └── Menu/
│ ├── CadastrarProduto.css
│ ├── CadastrarProduto.jsx
│ ├── EditarProduto.jsx
│ ├── Options.jsx
│ └── Options.css
├── Services/
│ └── productServices.js # dados dos produtos

## ▶️ Como executar o projeto localmente

1. **Clone o repositório**
```bash
git clone https://github.com/alaenepereira/sabortech
cd sabortech
npm install

## 👨‍🏫 Projeto Educacional

Desenvolvido durante o **Curso Fullstack Web Developer** – Capacita Brasil.  
**Professor:** Sidartha Carvalho  
**Instrutora:** Alanis Oliveira

👩‍💻 Desenvolvido por
- Alaene Silva
- Samuel Albuquerque
- Romário Paixão
- Julianny Albuquerque


> Projeto em equipe realizado como parte das atividades práticas do curso.
Tecnologia e colaboração aplicadas à gastronomia digital. 💻🍽️|

 Projeto SaborTech 🌟