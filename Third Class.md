# Aula 3 - To be continued

### Programando o Back-end

Pensar em quais entidade teremos na aplicação e como o usuário irá interagir com as entidades, os casos de uso

- Correlacionar as Entidades com as tabelas do banco de dados: Games e Anúncios, com um relacionamento de on-to-many (Um game pode ter vários anúncios)
    - Campos de Games: id, title e bannerURL (imagem que vem da Twitch)
        - Caso fossemos fazer o upload da imagem, precisaríamos de um CDN (Content Delivery Network) que armazenaria nossos arquivos e serviria uma URL para acessá-las
    - Anúncios: id, gameId, name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel, createdAt
        - Para o weekDays, umas forma de armazenar essa informação é em um array, onde cada dia é um número de 0 a 6
        - Evitar de salvar números quebrados (pontos flutuantes) no banco de dados
    - Iremos usar o SQLite
- Casos de uso: como o usuário irá se relacionar com nossa aplicação
    - Listagem de games com contagem de anúncios
    
    ```
    app.get('/games', (request, response) => {
        return response.json([]);
    })
    ```
    
    - Publicar/Criar anúncio
    
    ```
    app.post('/ads', (request, response) => {
        return response.status(201).json([]);
    })
    ```
    
    - Listar anúncios por game
    
    ```
    app.get('/games/:id/ads', (request, response) => {
    
    })
    ```
    
    - Buscar discord pelo ID do anúncio → aparecer apenas ao clicar em Conectar
    
    ```
    app.get('/ads/:id/discord', (request, response) => {
    
    })
    ```
    

Criando rotas da aplicação com HTTP methods, usando a API RESTful e HTTP Codes

- HTTP Codes: tipos de retornos que pode ser dado ao cliente → códigos de 3 dígitos, onde o primeiro definirá o tipo do código
    - 1xx: informativo → solicitação foi aceita ou o processo continua em andamento
    - **2xx: confirmação**
        - 200 - requisição foi concluída
        - 201 - Created - Geralmente usado para POST após uma inserção
    - 3xx: redirecionamento → algo a mais precisa ser feito para completar a solicitação
        - 301: Moved Permanetly
        - 302: Moved
    - **4xx: Erro do cliente**
        - 400 - Bad request
        - 401 - Unauthorized
        - 403 - Forbidden
        - 404 - Not Found
        - 422 - Unprocessable Entity
    - **5xx: Erro no servidor - o servidor falhou ao concluir a solicitação**
        - 500 - Internal Server Error
        - 502 - Bad Gateway
- Tipos de parâmetros:
    - Query Params: localhost/3333/ads?**pages=2** → Persistir o estados dentro de uma rota → caso seja aplicado um filtro, a url deve ter um Query Params para caso precise compartilhar os dados com o filtro
    - Route Params: parâmetros de URL, porém não são nomeados: localhost/3333/ads/**5**, neste caso estamos buscando o ad com id=5
        - Serve como identificador de recurso
    - Body: enviar várias informações, geralmente para envio de formulário

Criação do Banco de dados para nossa aplicação

- Para comunicação do Node com SQLite:
    - Driver nativo: sqlite3 → menor nível possível
    - Query builder: knex → escrever código JS que será convertido para SQL
    - ORM: Prisma → Relação entre tabelas do DB com entidades dentro do JS/TS
        - Forma mais fácil de manipular no banco de dados
        - Limitado para query complexas → nestes casos, usar o SQL
- Instalação e configuração do Prisma: `npm i prisma -D` e `npx prisma init -h` (-h mostra uma documentação)
    - `npx prisma init --datasource-provider SQLite` passado que iremos usar o SQLite
    
    > Next steps:
    > 
    > 1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read [https://pris.ly/d/getting-started](https://pris.ly/d/getting-started)
    > 2. Run prisma db pull to turn your database schema into a Prisma schema.
    > 3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
    - .env: arquivo de definição de variáveis de ambiente → variáveis diferentes de acordo com ambiente que está rodando
    - Criar `database/db.sqlite` dentro de `src` e setar esse caminho no .env
    - Criando tabelas: no arquivo `prisma/schema.prisma`:
        - Passar o modela da nossa tabela
        - Rodar comando: `npx prisma migrate dev` → criação da migration (controle de versão do banco de dados)
    
    ```
    model Game {
      id        String @id
      title     String
      bannerUrl String
    }
    ```
    
    - Abrir interface gráfica para nosso banco de dados: `npx prisma studio`
    - Criando relacionamento:
        - Ao colocar: `game Game` e salvar, o resto o Prisma completa
        - Cria uma relação na tabela Game → `ads Ad[]` → essa informação não vai ter um campo na tabela
    
    ```
    model Game {
      id        String @id
      title     String
      bannerUrl String
      **ads        Ad[]**
    }
    ...
    game Game @relation(fields: [gameId], references: [id])
    ...
    ```
    

Começando a implementar nossas rotas:

- `npm i @prisma/client` → acessar o banco de dados
- Usar a flag `—exit-compile` no “run”
- Adicionando campo de quantidade de anúncio:

```
const game = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
```

- Listar ads, selecionando os campos, game e ordernando em ordem decrescente pela data de criação

```
const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
```

Biblioteca `CORS` → proteger aplicação contra front-end indesejados

- Configurar front-end autorizado a fazer requisições