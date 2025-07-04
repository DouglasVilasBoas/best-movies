# Best Movies API

Este projeto é uma API para consulta de filmes, construída com Node.js, Fastify e Axios. Ela consome dados de uma API externa e oferece rotas para retornar informações de filmes, além de funções utilitárias para conversão e manipulação de valores monetários.

## Sumário
- [Instalação](#instalação)
- [Dependências](#dependências)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Como Executar](#como-executar)
- [Rotas da API](#rotas-da-api)
- [Funções Utilitárias e Métodos Usados](#funções-utilitárias-e-métodos-usados)
- [Exemplos de Retorno](#exemplos-de-retorno)
- [Estrutura dos Arquivos](#estrutura-dos-arquivos)
- [Observações](#observações)

---

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
   ```
   npm install
   ```

## Dependências

- **fastify**: Framework web rápido para Node.js, utilizado para criar o servidor e as rotas HTTP.
- **axios**: Cliente HTTP para realizar requisições à API externa de filmes.
- **dotenv**: Carrega variáveis de ambiente do arquivo `.env` para o `process.env`.
- **nodemon**: Utilitário para reiniciar automaticamente o servidor durante o desenvolvimento.

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
APIFILMES=https://url-da-sua-api-de-filmes.com
PORT=3000
```

- `APIFILMES`: URL da API externa de filmes.
- `PORT`: Porta onde o servidor irá rodar.

## Como Executar

Para rodar o servidor em modo desenvolvimento (com reinício automático):
```
npm run dev
```

Para rodar em modo produção:
```
npm start
```

O servidor será iniciado na porta definida em `PORT`.

---

## Rotas da API

### `GET /filmes`

Retorna a lista de filmes obtida da API externa.

#### Exemplo de requisição
```
GET http://localhost:3000/filmes
```

#### Exemplo de resposta
```json
[
  {
    "titulo": "O Poderoso Chefão",
    "ano": 1972,
    "diretor": "Francis Ford Coppola",
    "genero": [
        "Crime",
        "Drama"
    ],
    "duracaoSegundos": 10500,
    "notaIMDb": "9.2",
    "lucro": "$239 milhões",
    "maiorPremiacao": "Oscar de Melhor Filme",
    "sinopse": "Um chefão da máfia tenta transferir o controle de seu império clandestino para seu filho relutante."
  }
]
```

**Explicação:**
- Esta rota faz uma requisição para a API definida em `APIFILMES` e retorna os dados recebidos.
- O formato do retorno depende da resposta da API externa, mas normalmente inclui título, orçamento e bilheteira dos filmes.

---

## Funções Utilitárias e Métodos Usados

O projeto possui funções para conversão de valores monetários em texto para número e vice-versa, além de cálculo de lucro e manipulação de arrays. Os principais métodos e técnicas utilizados são:

### Regex
- Utilizado para extrair números e unidades (mil, milhão, bilhões, etc.) de strings monetárias.
- Exemplo:
  ```js
  const regex = /([\d,.]+)\s*(milhão|milhões|bilhão|bilhões|mil)/i;
  const match = texto.match(regex);
  ```

### Manipulação de Arrays
- Métodos como `map`, `filter`, `reduce`, `find`, `some` e `sort` são usados para processar listas de filmes e dados relacionados.
- Exemplo de uso do `sort` para ordenar por relevância:
  ```js
  filmes.sort((a, b) => b.relevancia - a.relevancia);
  ```

### Conversão de texto para número
```js
convertStringToNumber("$165 milhões") // 165000000
convertStringToNumber("2,5 bilhão")   // 2500000000
convertStringToNumber("7 mil")        // 7000
```

### Conversão de número para texto
```js
convertNumberToString(1000)         // "$1 mil"
convertNumberToString(1000000)      // "$1 milhão"
convertNumberToString(2000000)      // "$2 milhões"
convertNumberToString(1000000000)   // "$1 bilhão"
convertNumberToString(3000000000)   // "$3 bilhões"
```

### Cálculo de lucro
```js
calculateProfit("$165 milhões", "$463 milhões") // 298000000
```

**Explicação:**
- As funções utilitárias estão em `src/useCases/index.js` e servem para tratar valores monetários em diferentes formatos, facilitando cálculos e exibição.
- O uso de regex permite identificar e converter valores textuais para números.
- Métodos de array como `sort` permitem ordenar filmes por critérios como relevância ou bilheteira.

---

## Exemplos de Retorno

- Listagem de filmes:
```json
[
  {
    "titulo": "Matrix",
    "orcamento": "$165 milhões",
    "bilheteria": "$463 milhões"
  }
]
```
- Conversão de valores:
```js
convertStringToNumber("$165 milhões") // 165000000
convertNumberToString(2000000) // "$2 milhões"
```

---

## Estrutura dos Arquivos

- `server.js`: Inicializa o servidor Fastify e carrega as rotas.
- `src/routes/index.js`: Define as rotas da API.
- `src/controllers/index.js`: Controlador que chama os casos de uso.
- `src/useCases/index.js`: Funções utilitárias e integração com a API externa.
- `src/external/films-api.js`: Função que faz a requisição para a API de filmes usando Axios.

---

## Observações
- Certifique-se de que a variável `APIFILMES` no `.env` aponte para uma API de filmes válida.
- O projeto utiliza as bibliotecas `dotenv` para variáveis de ambiente, `axios` para requisições HTTP e `fastify` para o servidor.
- Para desenvolvimento, utilize o comando `npm run dev` para recarregar automaticamente o servidor a cada alteração.

---

## Como Estruturei Meu Projeto

O primeiro passo foi criar o arquivo do servidor e instalar as dependências, que foram o Fastify e o Axios. Também criei uma pasta separada para cada parte do projeto, como por exemplo: usecase para a regra de negócio, external para a conexão com a API de filmes e routes para organizar as rotas.
Comecei configurando o servidor para garantir que a rota estivesse funcionando direitinho. Depois disso, fui montando os arquivos aos poucos: primeiro o index do controller, depois o das rotas e, em seguida, o da pasta useCases.
Quando cheguei na parte de implementar a regra de negócio, fui olhando os campos do payload no teste, pensando na lógica que precisava aplicar e então codava. Os campos como “título”, “ano”, “diretor”, “gênero”, “duraçãoSegundos” e “notaIMDb” foram mais tranquilos de implementar. Tive algumas dúvidas sobre qual método usar em alguns momentos, mas pesquisei e consegui resolver rapidinho.
A parte mais complicada foi calcular o lucro, porque precisei converter uma string para número pra fazer a conta, e depois converter de volta pra string. Pra isso, precisei usar regex. Eu já tinha usado regex antes, mas só em exemplos mais simples, então não lembrava muito bem como fazer. E nesse caso, ele ficou um pouco mais complexo porque precisei colocar várias condições dentro.
Fui pesquisando e pedindo exemplos pro Copilot. Deu um pouco de trabalho, mas no fim consegui resolver.
Já para a parte do “maiorPremiação”, foi bem mais tranquilo e usei o método sort. E na “sinopse”, só precisei usar uma condição com if e else.
Por fim, percebi que seria bom esconder a URL da API, então instalei a dependência dotenv e criei um arquivo .env pra guardar esse valor, evitando expor essa informação quando fosse subir o código pro GitHub.






