# Frontend | Notas App

Frontend em React para consumir a API de notas hospedada no Render. A aplicação permite criar, visualizar, atualizar e excluir notas.

## Tecnologias

- React
- Fetch API ou Axios, conforme a implementação
- Vercel para deploy

## Funcionalidades

- Exibir as notas retornadas pela API
- Adicionar novas notas
- Editar notas existentes
- Excluir notas
- Utilizar uma interface simples e intuitiva

## Integração com o backend

O app consome diretamente a API do projeto backend por meio das seguintes operações CRUD:

| Operação | Ação |
| --- | --- |
| `GET` | Obter a lista de notas |
| `POST` | Criar uma nova nota |
| `PUT` / `PATCH` | Atualizar uma nota |
| `DELETE` | Excluir uma nota |

## Como executar localmente

1. Instale as dependências:

	```bash
	npm install
	```

2. Inicie a aplicação:

	```bash
	npm start
	```

3. Acesse [http://localhost:3000](http://localhost:3000) ou a porta informada pelo terminal.
