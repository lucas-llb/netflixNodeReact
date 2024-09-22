## Getting Started

First, run the docker database server in eng/docker folder:

```bash
docker-compose up -d postgres
```

Install dependencies:

```bash
npm i -f
```

Create database and run migrations and seeds:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
Run application:

```bash
npm run dev
```