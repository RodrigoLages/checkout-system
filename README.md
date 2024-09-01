# Mini Checkout System

This project is a mini checkout system built with Next.js 14 using App Router, TypeScript, tRPC, Axios, Tailwind, Prisma, and Vercel Blob for image uploads. The application allows you to create products, generate checkout links, and process payments via Pix with integration to MercadoPago. The project is deployed on Vercel and uses a PostgreSQL database provided by Vercel.

Vercel deployment link: https://checkout-system-three.vercel.app/

## Features

- **Product Creation and Editing:** Manage products with a CRUD system in a modal. Each product has a unique checkout link.
- **Checkout Page:** Allows customers to pay via Pix. The payment status is updated via Webhook integration.
- **Products Page:** Displays a list of all created products.
- **Sales Page:** Shows all completed sales.
- **Thank You Page:** Redirects customers to a thank-you page after payment approval.

## Technologies Used

- **Next.js 14** with App Router
- **TypeScript**
- **tRPC** for API handling
- **Prisma** for database ORM
- **Vercel Blob** for image storage
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **PostgreSQL** database hosted on Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or above)
- npm or yarn
- PostgreSQL database (can be set up locally or use the one provided by Vercel)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RodrigoLages/checkout-system.git
   cd checkout-system
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Rename the `.env.example` file in the root directory to `.env` and add your environment variables.

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

### Deployment

To deploy the application to Vercel:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set the environment variables in the Vercel dashboard.
4. Deploy the application.

# Sistema de Mini Checkout

Este projeto é um sistema de mini checkout construído com Next.js 14 usando App Router, TypeScript, tRPC, Axios, Tailwind, Prisma e Vercel Blob para upload de imagens. A aplicação permite criar produtos, gerar links de checkout e processar pagamentos via Pix com integração ao MercadoPago. O projeto está implantado na Vercel e utiliza um banco de dados PostgreSQL fornecido pela Vercel.

Link do deploy na Vercel: https://checkout-system-three.vercel.app/

## Funcionalidades

- **Criação e Edição de Produtos:** Gerencie produtos com um sistema CRUD em um modal. Cada produto possui um link de checkout único.
- **Página de Checkout:** Permite que os clientes paguem via Pix. O status do pagamento é atualizado via integração com Webhook.
- **Página de Produtos:** Exibe uma lista de todos os produtos criados.
- **Página de Vendas:** Mostra todas as vendas concluídas.
- **Página de Agradecimento:** Redireciona os clientes para uma página de agradecimento após a aprovação do pagamento.

## Tecnologias Utilizadas

- **Next.js 14** com App Router
- **TypeScript**
- **tRPC** para manipulação da API
- **Prisma** para ORM do banco de dados
- **Vercel Blob** para armazenamento de imagens
- **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **Banco de dados PostgreSQL** hospedado na Vercel

## Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Banco de dados PostgreSQL (pode ser configurado localmente ou utilizar o fornecido pela Vercel)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/RodrigoLages/checkout-system.git
   cd checkout-system
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:

   Renomeie o arquivo `.env.example` no diretório raiz para `.env` e adicione suas respectivas variáveis de ambiente.

4. Execute as migrações do banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   A aplicação deverá estar rodando em [http://localhost:3000](http://localhost:3000).

### Deploy

Para implantar a aplicação na Vercel:

1. Envie o código para um repositório no GitHub.
2. Conecte o repositório à Vercel.
3. Configure as variáveis de ambiente no painel da Vercel.
4. Implemente a aplicação.
