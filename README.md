# Cortex — Painel Administrativo Limoeiro Buffet

Sistema web interno com login, calculadora de cardápio e agendamento de eventos.

## Pré-requisitos

- Node.js >= 18
- MySQL 8.x rodando localmente

## Back-end

```bash
cd backend
npm install
cp .env.example .env
```

Edite o arquivo `.env` com sua conexão MySQL e uma chave JWT:

```env
DATABASE_URL="mysql://root:senha@localhost:3306/cortex"
JWT_SECRET="uma_chave_longa_e_aleatoria_aqui"
JWT_EXPIRES_IN="8h"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

Crie o banco e aplique a migração:

```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

API disponível em: `http://localhost:3000`

## Front-end

```bash
cd frontend
npm install
cp .env.example .env
```

Edite o arquivo `.env`:

```env
VITE_API_URL="http://localhost:3000/api"
```

```bash
npm run dev
```

App disponível em: `http://localhost:5173`

## Credenciais do seed

| E-mail | Senha | Perfil |
|---|---|---|
| admin@limoeiro.com | admin123 | ADMIN |
| operador@limoeiro.com | oper123 | OPERATOR |

## Funcionalidades

- **Login** com JWT — token armazenado em `localStorage`
- **Dashboard** — total de cardápios, eventos do mês e próximos eventos
- **Calculadora** — selecione cardápio, informe adultos/crianças e gere lista de compras proporcional
- **Cardápios** — CRUD completo (somente ADMIN), soft delete
- **Eventos** — criar, editar e remover eventos com filtro por status
