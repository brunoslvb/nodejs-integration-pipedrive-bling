# Integração Pipedrive com Bling

A aplicação conecta-se com o Pipedrive verificando se há acordos (negócios) com status "ganho" e os insere como pedido na plataforma Bling.

## Antes de começar

**Clone o repositório**

```sh
git clone https://github.com/brunoslvb/nodejs-integration-pipedrive-bling
```

Navegue até o diretório criado, e abra o arquivo **.env**

```
ENDPOINT_PIPEDRIVE=https://api.pipedrive.com/v1
API_KEY_PIPEDRIVE=

ENDPOINT_BLING=https://bling.com.br/Api/v2
API_KEY_BLING=

DB_HOST=
DB_USER=
DB_PASS=
DB_DATABASE_NAME=
```
> ***Nota:*** É necessário preencher as informações listadas neste arquivo.

| Campo | Informação |
| ------ | ------ |
| ENDPOINT_PIPEDRIVE | Link da API da plataforma Pipedrive |
| API_KEY_PIPEDRIVE | Chave de autenticação da API na plataforma Pipedrive |
| ENDPOINT_BLING | Link da API da plataforma Bling |
| API_KEY_BLING | Chave de autenticação da API na plataforma Bling |
| DB_HOST | Endereço do MongoDB |
| DB_USER | Usuário do MongoDB |
| DB_PASS | Senha do usuário do MongoDB |
| DB_DATABASE_NAME | Nome da base de dados |

Após preencher as informações, instale as dependências do projeto executando o seguinte comando no diretório raíz do projeto:

```sh
npm install
```

## Iniciando aplicação

Certifique-se de que está na raíz do projeto e execute o comando a seguir:

```sh
npm start
```

Uma mensagem aparecerá em seu terminal dizendo que a aplicação está rodando em *http://localhost:3333/*

## API

A API foi desenvolvida para realizar a integração entre duas plataformas - Pipedrive e Bling.

| Método | ENDPOINT | Informação |
| ------ | ------ | ------ |
| GET | /pipedrive/products | Recupera todos os produtos cadastrados na plataforma Pipedrive |
| GET | /pipedrive/persons | Recupera todos os contatos cadastrados na plataforma Pipedrive |
| POST | /pipedrive/persons | Insere um contato na plataforma Pipedrive |
| GET | /pipedrive/deals | Recupera todos os acordos cadastrados na plataforma Pipedrive |
| POST | /pipedrive/deals | Insere um acordo na plataforma Pipedrive |
| PUT | /pipedrive/deals/:id | Atualiza o status de um acordo na plataforma Pipedrive |
| POST | /integration | Insere todos os acordos que estão com status "ganho" na plataforma Pipedrive como pedidos de venda na plataforma Bling, pega todos os pedidos na plataforma Bling e os insere no MongoDB realizando o cálculo total das vendas do dia corrente  |
| POST | /integration/product | Insere um produto nas duas plataformas |
| GET | /orders | Recupera todos os pedidos inseridos na Plataforma Bling do MongoDB |

### Exemplos de requisição


| Método | Requisição | Parametros | Resposta | Status Code |
| ------ | ------ | ------ | ------ | ------ |
| GET | /orders | { data: "DD/MM/YYYY" } | [{ pedidos: [{ pedido: {} }] }] | 200 |

| Método | Requisição | Body | Resposta | Status Code |
| ------ | ------ | ------ | ------ | ------ |
| POST | /pipedrive/persons | { nome: <string> } | { "message": "Contato adicionado com sucesso", "data": { "id": <id_contato> } } | 201 |
| POST | /pipedrive/deals | {"titulo": <string>, "id_contato": <number>, "status": <string>, "preco_item": <number>, "quantidade_item": <number>, "id_produto": <number>} | {"message": "Acordo inserido com sucesso"} | 201 |
| PUT | /pipedrive/deals/:id | { "status": <string> } | {"message": "Acordo atualizado com sucesso"} | 200 |
| POST | /integration/product | { "nome": <string>, "codigo": <string>, "preco": <number>} | { message: "Produto inserido com sucesso" } | 201 |
| POST | /integration |  | { message: "Integração realizada com sucesso" } | 200 |
  
  
> **Nota: Para a integração ser realizada com sucesso, todos os acordos na plataforma Pipedrive devem conter itens (produtos) associados a ele.**

# Acessos

A aplicação está disponível para acesso no endereço:

- http://54.232.191.37:3333/
