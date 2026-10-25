# Roteiros de Estudo

Trabalho desenvolvido para a disciplina de Engenharia de Software / Desenvolvimento Web (Atividade Avaliativa A2).

**Integrantes:**
- Diogo Augusto Silvério Nascimento - RA: 2586460
- Silas Torres Rocha - RA: 2104644

---

## Sobre o Projeto

Aplicação web desenvolvida com Next.js (App Router), React e Tailwind CSS para consulta de roteiros de estudos do 6º ao 9º ano. Os roteiros contam com questões de fixação, aviso de revisão por professores da rede e texto de apoio integrado à API pública da Wikipédia. Também possui uma área para os professores solicitarem novos roteiros.

O projeto foi configurado com exportação estática (`output: 'export'`), sem back-end próprio nem banco de dados.

---

## Como Rodar o Projeto

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em modo de desenvolvimento
```bash
npm run dev
```
Acesse pelo navegador em: [http://localhost:3000](http://localhost:3000)

### 3. Gerar build estático
```bash
npm run build
```
O build estático será gerado na pasta `out/`.

*(Opcional: para quem usa Docker, incluímos os arquivos `Dockerfile`, `rodar-docker.bat` e `build-estatico-docker.bat`).*

---

## Onde encontrar os requisitos no código

- **Dados em JSON:** estão na pasta `data/` (`roteiros.json` com 8 roteiros e `professores.json` com 5 professores relacionados por ID).
- **Página Inicial (`app/page.js`):** listagem de roteiros com filtro por disciplina e ano usando `useState`.
- **Rota Dinâmica (`app/roteiros/[id]/page.js`):** carrega o roteiro específico, exibe o professor revisor e busca o texto de apoio da Wikipédia. Usa `generateStaticParams()` para a exportação estática e trata roteiros inexistentes com 404.
- **Texto de Apoio da Wikipédia (`components/TextoApoio.js`):** consome a API da Wikipédia e trata os 3 estados (carregando, sucesso e erro com botão para tentar novamente).
- **Página de Pedido (`app/pedido/page.js` e `components/FormPedido.js`):** formulário controlado com validação dos campos (nome, e-mail institucional, ano, disciplina, quantidade de questões de 3 a 10 e data com pelo menos 7 dias de antecedência) e feedback de sucesso na tela.
- **Componentes (`components/`):** todos os componentes foram criados por nós (`Cabecalho`, `Rodape`, `CardRoteiro`, `Filtros`, `SeloRevisor`, `QuestaoItem`, `TextoApoio` e `FormPedido`).
- **Página 404 (`app/not-found.js`):** página personalizada para rotas e roteiros inexistentes.
- **Relatórios:** na pasta `docs/` (`entrega1.pdf` e `entrega2.pdf`).
