# Aula 2 - High Speed

Conteúdo: critérios pra escolher a stack de forma assertiva, avançar com o projeto: fazendo a interface web e mobile, conectando com a API da Twitch

Qual melhor tecnologia para dominar?

- Deve ser uma escolha sólida, pois muito tempo será alocado para a especialização em um tecnologia
- Qual a melhor tecnologia, levando em consideração:
    - Momento atual, objetivo e o contexto pessoal
    - Que tipo de profissional está sendo requisitado?
        - JS e seus framework são amplamente utilizados e em vários contextos: back-end, e front-end (mobile e web)
    - Como é o ecossistema da ferramenta?
        - Com o JS temos várias opções, pois existem vários frameworks existentes, além de ser uma linguagem obrigatória para o Front-end
    - Qual tamanho da comunidade?
        - Comunidade gigante, tendo um suporte considerável, além de várias bibliotecas criadas
    - Quem mantém a tecnologia?
        - O JS foi criado e é mantido pelo Facebook, nos passando uma segurança quanto o seu mantimento
    - Qual tecnologia faz sentido para o momento de carreira?
    - Quanto eu posso reaproveitar essa tecnologia?
        - JS é usado no back-end e front-end (web e mobile)
    - Quais problemas a tecnologia resolve?
        - Aplicações web, o JS é a melhor opção, para dados, Python é a melhor solução
    - Onde quero chegar com essa tecnologia?

### Interface Web

Programar a landing page do nosso projeto (web e mobile): Em um primeiro momento, o conteúdo será estático, depois iremos conectar com a API da Twitch

- Aprender a trabalhar com estilização do React e React Native, aprender a programar nos frameworks, conectar Front-end com a API da Twitch
- Exportar assets do Figma para a pasta `/src/assets`
- A estilização no React funciona como um CSS em qualquer página da web
    - Podemos criar um arquivo css, exportá-lo e importá-lo nos componentes para que seja aplicado
        - Vite coloca o CSS na página, de forma automatizada
    - Ferramenta que auxilia na estilização: TailwindCSS

O TailwindCSS fornece várias classes que nos ajudam na produtividade na estilização, pois não precisa ficar trocando entre arquivos do componente (HTML) e CSS

- Como iremos utilizar o conceito de quebrar nosso código em pedaços menores, o Tailwind não irá “sujar” nosso projeto
- Traz uma padronização:
    - Segue a regra dos 8px → toda na aplicação, o tamanho são múltiplos de 8
    - Traz cores padrões automática
    - Ajuda na responsividade da aplicação
- Instalação: O Vite usa o PostCSS
    
    > *Installing Tailwind CSS as a PostCSS plugin is the most seamless way to integrate it with build tools like webpack, Rollup, **Vite**, and Parcel.*
    > 
    - PostCSS é um pre processador usado pelo Vite → necessário o arquivo `postcss.config.cjs`, para isso, deve-se rodar o comando: `npx tailwindcss init -p`
        - Esse arquivo diz pro Vite que estamos usando o PostCSS
        - Automatiza processos de escrita CSS → integra com o Tailwind

[Installation: Using PostCSS - Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss)

- Configuração: no arquivo `tailwind.config.cjs`, passar, dentro do `content`, onde estarão os arquivos que irão utilizar o TailwindCSS:

```
...
content: [
    './src/**/*.tsx'
  ],
...
```

- Criar `/src/styles/main.css`

> Add the **`@tailwind`**directives for each of Tailwind’s layers to your main CSS file.
> 

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Importar o arquivo `/src/styles/main.css` dentro componente `App.tsx` e mão na massa: passar as classes do TailwindCSS dentro do atributo className de cada tag
    - Todas as medidas usadas no TailwindCSS vem como medida relativa (rem) → será relativo ao tamanho da fonte do usuário
    - Todas as medidas são múltiplos de 4px → `“w-1”` = width de 4px
    - Responsividade no Tailwind:
    
    > Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.
    > 
    
    ![Untitled](Aula%202%20-%20High%20Speed%204e22c4c7909941a393c5cd3e54df9980/Untitled.png)
    
    ```tsx
    // Tailwind can be applied conditionally at different points -> ex.: lg: (minimum width = 1024px). In this case, width > 1024px, the bg-color is violet, if not, it's black
    <div className="w-8 h-8 bg-black lg:bg-violet-500">
    ```
    

Fazer o CSS da landing page

- Quando uma cor não está disponível dentro do Tailwind, podemos usar a seguinte notação: `bg-[#121214]`
- Configurar a imagem de background: dentro do arquivo de configuração do tailwind
    - A imagem está na pasta `public`

```
heme: {
    extend: {
      backgroundImage: {
        background: "url('/background-img.png')"
      }
    },
  },
```

- Usar a biblioteca Phospor Icons para os ícones: `npm i phosphor-react`
    - Importar o ícone como componente do React
- Usaremos a font inter → importar do google fonts
    - Colocar o link no arquivo `index.html`, no `<head />`
    - Os `preconncet` deve vir logo após o `<meta>` pra fazer uma pré conexão com os servidores da google e carregar a fonte
    - Mudar fonte padrão no Tailwind: dentro do arquivo de configuração
    
    ```jsx
    theme: {
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        },
    ...
    }
    ```
    

### Interface Mobile

No arquivo `app.json`, temos informações sobre o app: como qual imagem será usada como ícone e qual imagem será usada como splash

- Cada imagem tem 3 tipos: a normal, @2x e @3x, devido à densidade de píxel, variando com o dispositivo
    - Garantir que a imagem seja renderizada e exibida com a melhor qualidade → dispositivo vai achar a melhor imagem pra usar
- Elemento que se repeta: o background → criar um elemento como componente e reaproveitar na aplicação
- Nossa aplicação não consegue entender a importação da tipagem do tipo png
    - no `src`, criar uma pasta `@types` e um arquivo `png.d.ts`
    
    ```jsx
    declare module '*.png'
    ```
    

Instalar fontes personalizadas:

- Expo vai automatizar a configuração nativa

[Using Custom Fonts - Expo Documentation](https://docs.expo.dev/guides/using-custom-fonts/#using-a-google-font)

- Importação das fontes:

```
import {
	// carregamento da fonte
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

...
	// fontsLoaded is true if the font is loaded
	const [fontsLoaded] = useFonts({
	    Inter_400Regular,
	    Inter_600SemiBold,
	    Inter_700Bold,
	    Inter_900Black
	  });

...
{fontsLoaded ? <Home /> : <Loading />}
```

Carrossel com as imagens dos jogos disponíveis a partir de uma lista:

```tsx
						<FlatList
                contentContainerStyle={styles.contentList}
                data={GAMES}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <GameCard
                        data={item}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
```