# Projeto Agenda

## Descrição do Projeto

O projeto_agenda é uma aplicação web completa (Full Stack) desenvolvida para gerenciar contatos de uma agenda pessoal. A aplicação permite que usuários criem, leiam, atualizem e excluam contatos de forma segura. O sistema inclui autenticação de usuários com registro e login, garantindo que cada usuário tenha acesso apenas aos seus próprios contatos.

Este projeto foi desenvolvido com uma arquitetura robusta, seguindo boas práticas de programação, como validação de dados e tratamento de erros, para criar uma aplicação segura e funcional.

## Funcionalidades

- Registro de Usuário: Criação de novas contas com validação de email e senha.

- Login de Usuário: Autenticação segura para acessar as funcionalidades da agenda.

- Logout: Finalização da sessão do usuário.

- CRUD de Contatos:

  - Criar novos contatos.

  - Ler/Visualizar a lista de todos os contatos.

  - Atualizar (editar) informações de contatos existentes.

  - Excluir contatos.

## Tecnologias Utilizadas

O projeto utiliza o ecossistema JavaScript moderno, com as seguintes tecnologias:

### Backend:

- **Node.js**: Ambiente de execução JavaScript.

- **Express.js**: Framework web para criação de APIs e rotas.

- **Mongoose**: ODM (Object Data Modeling) para modelar e interagir com o banco de dados MongoDB.

- **bcryptjs**: Biblioteca para hash de senhas, garantindo o armazenamento seguro das credenciais.

- `connect-mongo`: Middleware para armazenar sessões do Express no MongoDB.

- `express-session`: Middleware de sessão para gerenciar o estado de login do usuário.

- `connect-flash`: Middleware para exibir mensagens de notificação temporárias (sucesso/erro).

- `csurf`: Middleware para proteção contra ataques CSRF (Cross-Site Request Forgery).

- `dotenv`: Para gerenciar variáveis de ambiente de forma segura.

### Frontend:

- HTML, CSS e JavaScript Vanilla: O projeto utiliza JavaScript puro para a lógica do frontend, sem a necessidade de um framework adicional.

- Bootstrap 5: Framework CSS para estilização e responsividade da interface.

### Banco de Dados:

- MongoDB: Banco de dados NoSQL utilizado para armazenar usuários e contatos.

## Como Instalar e Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### 1. Clone o repositório:

```bash
git clone https://github.com/LeandroDevLab/estudoJS/tree/main/secao11/projeto_agenda
cd projeto_agenda
```

### 2. Instale as dependências:

```bash

npm install
```

### 3. Configure o Banco de Dados:

- Crie um arquivo .env na raiz do projeto.

- Adicione a string de conexão do seu MongoDB. Exemplo:

```**env:**

CONNECTIONSTRING=mongodb+srv://<usuario>:<senha>@cluster0.abcde.mongodb.net/agendacontatos?retryWrites=true&w=majority
```

- Opcional: Configure outras variáveis de ambiente necessárias.

### 4. Execute o projeto:

```bash

npm start
```

O servidor estará rodando em http://localhost:3000.

### 5. Execute o run-time:

Para que seu código seja atualizado para o bundle.js, rode o comando abaixo:

```bash

npm run dev
```

### Contato

Leandro - [Github](https://github.com/LeandroDevLab)
