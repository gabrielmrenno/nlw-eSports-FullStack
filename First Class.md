# Aula 1 - Base Building

Trazer clareza do ecossistema multiplataforma → base dos fundamentos que estão por trás do React Native

## **Conteúdo da aula**

Visão sobre o projeto, conhecer tecnologias, configurar ambiente de desenvolvimento, start no projeto no web (React), mobile (React Native) e back-end (Node)

## Projeto

[Figma](https://www.figma.com/community/file/1150897317533332617)

- Projeto voltado para o eSports
    - Fornecer uma ponte para pessoas se conectarem
        - A pessoa pode publicar um anúncio para procurar um duo
    - Consumir a API da Twitch
    - Versão web: publicar o anúncio
    - Versão mobile: acesso aos anúncios e conexão de usuários
        - Notificação ao usuário na conexão
        - A FullStack application (Front - web and mobile, Back-end) project to provide a to eSports users with each other to play together. It will consume Twitch API to get a game list.

## Tecnologias

### Node: Back-end, server-side

O Node é uma plataforma interpretadora de JS usada para criar servidores

- v8 (interpretador de JS nos browsers - forma mais rápida para o browser) + libuv (biblioteca multi plataforma IO assíncrono) + conjunto de módulos (já estão instalados no node)

### React: Front-end, web e React Native (web)

Biblioteca JS para criar interfaces de usuário → interações do usuário

- Fluxo tradicional: o Cliente (navegador) faz uma requisição para a rota “/usuarios” para o back-end, este recebe a requisição, acessa o banco de dados e geraa interface (HTML/CSS/JS) para o Usuário
    - Wordpress, etc.
    - Menos flexibilidade ao trabalhar com o front-end → Caso precisemos de uma versão mobile, o back-end será inútil, pois o mobile não entende HTML/CSS

- API RESTful + Fluxo SPA (Single Page Application): Front-end e Back-end serão uma aplicação diferente (desacoplado) → Navegador acessa a aplicação Front-end (React), que será fazer uma requisição para o Back-end. Este não irá gerar a interface, irá apenas retornar as informações necessárias em JSON, a interface (HTML/CSS/JS) será gerada no front-end, a partir dos dados do back-end
    - Maior flexibilidade: qualquer cliente pode fazer chamada ao back-end e interpretá-los da melhor forma (mobile, TV, web, etc.)

![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled.png)

![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%201.png)

## Mão na massa

### Criando o projeto Node

Dentro da pasta `server` do projeto, rodar o comando `npm init -y`

Instalar o express: micro-framework (conjunto de código) que facilita a escrita no back-end → ex.: rotas

Criar pasta src e um arquivo `server.js` → será o arquivo principal da aplicação (main), devemos atualizar esse informação no packge.json

- Para rodar o arquivo js: `node src/server.js`
- Importação no Node
    - Versão antiga: `const express = require('express');`
    - Nova versão, usando o ECMAScript Modules
        - Necessário passar, na opção “type” do package.json, o “module”
        - Trocar a extensão de `.js` para `.mjs`

Criar nossa aplicação: `const app = express();`

- Com o `app`, podemos criar rotas para requisição HTTP (GET, POST, PATCH, PUT, DELETE)
- Teste de rotas: Insomnia, Postman, Hopscotch

Será usado o TypesScript: superset do JS → JS + tipagem

- Trás confiança e segurança na manutenção do código
- Evitar erros de ir pra produção na área de desenvolvimento
- Rodar o TS: instalar `npm i typescript -D`
    - Node não entende TS, só JS → podemos usar apenas para desenvolvimento, na produção, será traduzido para JS
        - criar um script para tradução do TS para JS:
        
        ```
        "scripts": {
            "build": "tsc"
          },
        ```
        
        - Criar arquivo de configuração do TS: `npx tsc --init`
            - `npx` é usado para executar uma biblioteca já instalada
            - Cria o arquivo `tsconfig.json`
                - Erro: `ReferenceError: exports is not defined in ES module scope`
                - Configurar o `module` para ES2020, dentro do tsconfig
            - Ao rodar o `npm run build`, gerará um arquivo JS
            - Descomentar o `rootDir`, passando o diretório raiz `src`
            - Descomentar o `outDir`, passando o diretório `build`
                - Todos os arquivos JS traduzidos do TS vão para a pasta `build`
    - `-D`: Será colocado como dependência de desenvolvimento
    - Mudar o `.mjs` e `.js` para `.ts`
- Tipagem estática: permite declarar/definir qual o formato esperado de cada informação
    - Maior controle dos dados em fluxo: não cometer o erro de mandar mais ou menos dados, além de controlar o retorno das funções
    
    ```jsx
    interface Ad {
    	id: string;
    	name: string;
    	createdAt: Date;
    }
    
    function calcularTempoAnuncio(ad: AD) {
    	// Calcular
    }
    
    // If the parameter passed is not matching with Ad type, a error is showed
    calcularTempoAnuncio({
    	id: "1",
    	name: "Ad 01",
    	createdAt: new Date(),
    })
    ```
    
    - Algumas bibliotecas não tem suporte nativo ao TS → consultar o pacote no site do npm, quando o quadrado do lado do nome do pacote for um quadrado azul preenchido, a bilbioteca é inscrita em TS, não precisando de um pacote adicional
        - ex.: express → adicionar o pacote @types/express como dependência de desenvolvimento
        
        ![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%202.png)
        
        ![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%203.png)
        
        - ex.:
        
        ![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%204.png)
        

Para atualizar o programa ao editar o código, precisamos parar o node, executar a tradução com tsc e então rodar o arquivo JS

- Solução: `npm i ts-node-dev -D` → Fast Refresh
    - Criar um script: `"dev": "tsnd src/server.ts"`
    - Erro: `Error: Must use import to load ES Module: …`
        - Solução: tirar o `“type”: “module”` do package.json e voltar o `“module”: “CommonJS”` do tsconfig.json

### Criando o projeto React

Usar a ferramenta Vite para criar projetos React: muito rápido

[Vite](https://vitejs.dev/guide/)

- Ferramenta utilizada para traduzir (compilar) o código React para JS → ser entendido pelo Browser

React traz arquivos JSX: JavaScript + XML (sintaxe do HTML) → Usar HTML dentro do JS, uma função do JS retornando HTML

- React é um conjunto de funções que retornam HTML/CSS/JS
- Fluxo do React: arquivo index.html (título do web)
    - Possui uma div `“root”` e um script que referencia o `“/src/main.tsx”`
    - Arquivo `main.tsx`, renderiza (montar em tela) o componente `App.tsx` dentro da div `“root”`
        - `App.tsx` é uma função que retorna um HTML
- Dois principais conceitos do React: Componentes e Propriedades, fazendo um paralelo com as tags e os atributos do HTML → Um componente é uma tag customizada e as Propriedades são os atributos/parâmetros que ditam o comportamento do Componentes, diferenciação dos componentes
    - Componentes são reutilizáveis, mudando seu estado a partir das props passadas
    - Todo conjunto de Componentes/tags devem ter outro Componente/tag o envolvendo
    - Deve-se criar uma interface para as props passadas
    - Toda interface pode ser construída com esses dois conceitos
    
    ```jsx
    // Creating a interface to props
    interface ButtonProps {
      // This is a mandatory parameter
      title: string;
      // This is a not mandatory parameter
      color?: string;
    }
    
    // Creating a custom component, passing the props as ButtonProps type
    function Button(props: ButtonProps) {
      return (
        <button>
          {/* Using title data, inside {} -> JS in HTML need to be inside of {} */}
          {props.title}
        </button>
      )
    }
    
    function App() {
      return (
        // A component's set must be evolved by another component/tag
        <div>
          {/* Creating some Buttons components, passing a different title (Props) to each one. This Props can be handled by the Component*/}
          <Button title="Send 1" />
          <Button title="Send 2" />
          <Button title="Send 3" />
        </div>
      )
    }
    
    export default App
    ```
    

### Criando o projeto React Native

Usando o React para criação de interface mobile = React Native

O que é React Native?

- Permite criar aplicações nativas para android e ios com mesma base código: JS
    - Como interfaces serão renderizadas de forma nativa:
        - Bundle: lógica é empacotada e será entregada ao sistema operacional escolhido (ios ou android)
        
        ![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%205.png)
        
        - Interface chega de forma nativa pois no RN, as interfaces são desenvolvidas de forma declarativa → declara como quer que a interface seja
            - Produtividade e desempenho → carregamento muito rápido
            - Componentes serão renderizadas com os elementos nativos do android e ios
            - Vários componentes já prontos na comunidade
            
            ![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%206.png)
            

Outra ferramenta que será utilizada: Expo → cuidar do ambiente de desenvolvimento

- Facilita o trabalhando, aumentando a produtividade
- Rodar a aplicação dentro do dispositivo físico

![Untitled](Aula%201%20-%20Base%20Building%20bd0ca02308b84c8a85c5ed7f2e5a41cc/Untitled%207.png)

- Instalando o Expo:

[Installation - Expo Documentation](https://docs.expo.dev/get-started/installation/)

- Criando o projeto: `expo init project-name`
    
    [Create a new app - Expo Documentation](https://docs.expo.dev/get-started/create-a-new-app/)
    
- Dois fluxos de trabalho:
    - Managed workflow: expo gerencia a configurações nativas → não tem acesso ao código nativo
        - Será selecionado a blanck (Typescript)
    - Bare workflow: Managed workflow + acesso a pasta android e ios (configurações no código nativo)
        - Necessita passagem para o TypeScript
            - Mudar a extensão do `App.js` para `App.tsx`
            - Criar arquivo `tsconfig.json` na raiz do projeto
            - Iniciar o projeto com Expo (`expo start`) → expo identifica a presença do TS (pelo tsconfig.json), daí faz a configuração automática no projeto

Conteúdo de um projeto React native

- assets: pasta de ícones do App
- node-modules: pacotes necessários para o App → listados no package.json
- `App.tsx` é o arquivo de entrada do App
    - Mesma estrutura do React para Web → função como Componente, retorna o que deve ser mostrado na tela
        - `<View />` = `<div />`  → possui os componentes que serão traduzidos para componentes nativos (`<View />`)
        - `<StatusBar />` = controle da barra de cima do celular