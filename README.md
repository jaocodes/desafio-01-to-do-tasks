# Task Management API

Uma API para realizar o CRUD (Create, Read, Update, Delete) de tarefas (_tasks_), incluindo a importação em massa a partir de arquivos CSV. Este projeto foi desenvolvido como parte de um desafio de programação para praticar conceitos de Node.js, manipulação de streams e construção de APIs.

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para construção da API.
- **csv-parse**: Biblioteca para parsing de arquivos CSV.

## Funcionalidades

- Criar uma nova task.
- Listar todas as tasks.
- Atualizar uma task existente pelo `id`.
- Remover uma task pelo `id`.
- Alterar o estado de conclusão de uma task pelo `id`.
- Importar tasks em massa a partir de um arquivo CSV.

## Estrutura de Dados

Cada task contém as seguintes propriedades:

- **`id`**: Identificador único de cada task.
- **`title`**: Título da task.
- **`description`**: Descrição detalhada da task.
- **`completed_at`**: Data de conclusão da task. Inicialmente `null`.
- **`created_at`**: Data de criação da task.
- **`updated_at`**: Data da última atualização da task.

## Endpoints da API

### 1. Criar Task

**`POST - /tasks`**
Cria uma nova task no banco de dados.

#### Corpo da Requisição:

```json
{
  "title": "Título da Task",
  "description": "Descrição da Task"
}
```

#### Regras

- Os campos `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente, durante a criação.

### 2. Listar Tasks

**`GET - /tasks`**
Lista todas as tasks salvas no banco de dados

### 3. Atualizar Task

**`PUT - /tasks/:id`**
Atualiza os campos `title` e/ou `description` de uma task específica.

#### Corpo da Requisição:

```json
{
  "title": "Novo Título da Task",
  "description": "Nova Descrição da Task"
}
```

#### Regras:

- Somente os campos enviados no corpo da requisição serão atualizados.
- Pelo menos um dos campos precisa ser enviado.
- O `id` deve ser válido e pertencente a uma task existente.

### 4. Remover Task

**`DELETE - /tasks/:id`**
Remove uma task pelo `id`.

#### Regras:

- O `id` deve ser válido e pertencente a uma task existente.

### 5. Marcar Task como Completa

**`PATCH - /tasks/:id/complete`**
Altera o estado de conclusão da task (`completed_at`).

#### Regras:

- Se a task estiver concluída, será marcada como não concluída (e vice-versa).
- O `id` deve ser válido e pertencente a uma task existente.

### 6. Importar Tasks via CSV

Importa tasks em massa a partir de um arquivo CSV.

#### Formato do Arquivo CSV:

```csv
title,description
Tarefa 01,Descrição da tarefa 01
Tarefa 02,Descrição da tarefa 02
Tarefa 03,Descrição da tarefa 03
Tarefa 04,Descrição da tarefa 04
Tarefa 05,Descrição da tarefa 05
```

#### Regras:

- Cada linha do arquivo CSV gera uma requisição para o endpoint `POST - /tasks`.
- Utiliza streams para leitura eficiente de grandes arquivos.

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/task-api.git cd task-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Acesse a API em: `http://localhost:3333`
5. Execute o importador de CSV através do script
   ```bash
   npm run importer
   ```
