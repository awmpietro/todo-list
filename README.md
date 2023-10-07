# TodoList: CLI and API

## Descrição

Example of a todo list written in Node.JS It implements an API and a CLI application sharing same code base using my view of a clean architecture.

## Requisitos

-  Node.js versão 18.16.1
-  yarn
-  Docker (opcional)

## Instalação usando Docker em máquinas Mac ou Linux:

1. Clonar o repositório: [Todo List](https://github.com/awmpietro/todo-list)
2. Adicionar as chaves de conexão ao Firestore enviadas por email em ./shared/config/credentials
3. Na raíz, rodar o código: `make init`
   -  Este comando fará a instalação da versão CLI, rodará todos os testes unitários e inicializará a API no docker na porta 8085 do seu localhost.

## Instalação sem Docker (necessários node v18.16.1 e yarn instalados)

1. Clonar o repositório: [Todo List](https://github.com/awmpietro/todo-list)
2. Adicionar as chaves de conexão ao Firestore enviadas por email em ./shared/config/credentials
3. Na raíz do repositório rodar o comando: `yarn install`
4. Para instalar a CLI rodar o comando: `npm install -g .` (atenção ao ponto após o `-g`)
5. Para rodar a API, use o comando: `yarn dev` ou `yarn start`. A API ficará exposta na porta 8085.
   -  O comando `yarn dev` roda todos os testes unitários e inicia a API em modo de live reloading.

## Testes

1. Para rodar todos os testes unitários: `yarn test`
2. Para rodar somente os testes unitários da API: `yarn test-api`
3. Para rodar somente os testes unitários da CLI: `yarn test-cli`

## Como Usar

### API

A API possui 2 endpoints:

-  [GET Tasks](http://localhost:8085/get-tasks)
-  [POST Insert Tasks](http://localhost:8085/insert-tasks)

**getTasks:** Irá retornar todas as tasks cadastradas.

**insertTasks:** Irá cadastrar uma lista de tasks.
Exemplo de body:

```json
[
   { "description": "Criar Header", "responsable": "Arthur Mastropietro", "status": "todo" },
   { "description": "Criar Menu", "responsable": "bruno", "status": "doing" },
   { "description": "Criar Rodapé", "responsable": "Arthur Mastropietro", "status": "todo" }
]
```

### CLI

Para utilizar a linha de comando:

-  Exibir todas as tarefas:

   ```bash
   tmanager --show
   ```

-  Inserir uma lista de tarefas diretamente como um argumento JSON:

   ```bash
   tmanager --insert '[{ "description": "Criar Login", "responsable": "Arthur", "status": "done" }, { "description": "Criar Menu", "responsable": "Arthur", "status": "doing" }]'
   ```

-  Inserir uma lista de tarefas a partir de um arquivo JSON (o caminho é relativo de onde está rodando o cmd):
   ```bash
   tmanager --insert < examples/input.json
   ```
