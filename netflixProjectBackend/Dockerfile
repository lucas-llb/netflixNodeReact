
# Etapa 1: Building angular app
FROM node:17-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -f

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "echo 'Skipping lint' && npm run dev"]
