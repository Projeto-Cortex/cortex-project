# Cortex — Painel Administrativo Limoeiro Buffet

Sistema web de gestão para buffets: cardápios, calculadora de compras e agenda de eventos.

## Estrutura

```
cortex-project/
├── backend/     Node.js + Express + Prisma + MySQL (Railway)
├── frontend/    React + Vite + Tailwind (Vercel / Netlify)
└── landing_page/  Site público do Limoeiro Buffet (Netlify)
```

## Rodando localmente

### Back-end

```bash
cd backend
npm install
cp .env.example .env   # preencha DATABASE_URL e JWT_SECRET
npx prisma migrate dev
npx prisma db seed
node src/app.js
```

### Front-end

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:3000/api
npm run dev
```

## Credenciais (seed)

| E-mail | Senha | Perfil |
|---|---|---|
| admin@limoeiro.com | admin123 | ADMIN |
| operador@limoeiro.com | oper123 | OPERATOR |

## Deploy

| Serviço | URL |
|---|---|
| Frontend | https://cortex-limoeiro.vercel.app |
| Frontend (espelho) | https://cortex-limoeiro.netlify.app |
| Backend | https://cortex-backend-production-7ed8.up.railway.app |
| Landing page | https://limoeiro-buffet-landing.netlify.app |
