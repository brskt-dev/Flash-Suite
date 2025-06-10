# Flash-Suite
Flash Suite is an open-source web application for compiling and flashing firmware to multiple microcontrollers via UART communication and binary files. Built for flexibility and ease of use, it supports a wide range of devices and streamlines embedded development workflows directly from your browser.

## Visão Geral da Base de Código

Este repositório contém apenas um commit inicial com toda a base de código. Não há testes automatizados nem diretivas específicas de `AGENTS.md`.

### Estrutura e Ferramentas

- **Gerenciamento de build**: Utiliza Webpack e Babel para empacotar o front-end. O `package.json` define scripts para iniciar (`webpack serve`) e gerar build (`webpack`) do projeto, além de listar dependências do React e do Geist UI. O Webpack é configurado em `webpack.config.js` para ambiente de desenvolvimento, incluindo servidor local na porta 3000 e tratamento de arquivos JS/CSS.
- **Aplicação React**: A aplicação começa em `src/index.js`, renderizando o componente principal `App` no elemento `#root` do `public/index.html`. O `App.js` gerencia o tema claro/escuro via `GeistProvider` e mantém a preferência no `localStorage`.

### Componentes Principais

- **FlashInterface**: Componente central responsável por gerenciar o cadastro do usuário (nickname e avatar), salvar e validar os dados (utilizando `userService.js`), conectar-se ao dispositivo via Web Serial API (funções em `flashService.js`) e exibir logs recebidos.
- **Header**: Exibe o nome e avatar do usuário, permitindo editar perfil e alternar o tema por meio de um modal de configuração.
- **flashService.js**: Implementa utilidades de conexão serial e leitura de dados, usando `navigator.serial` e `TextDecoderStream`.
- **userService.js**: Gerencia armazenamento no `localStorage`, manipulação de uploads de avatar e validação de dados do usuário.

### Estilos e Outros Arquivos

O projeto possui CSS específico para alguns componentes (`FlashInterface.css`, `Header.css`), enquanto outros como `Footer.css` e `globals.css` estão vazios ou não utilizados. Há também um workflow de GitHub Actions em `.github/workflows` para build e deploy em GitHub Pages.

### Conclusão

Em resumo, o repositório apresenta a base inicial de um front-end React voltado à manipulação de microcontroladores via Web Serial API, com foco em interface amigável, escolha de tema (claro/escuro) e personalização de usuário.
