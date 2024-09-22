
# Step 1: Building react app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -f

COPY . .
RUN npm run build

EXPOSE 4200

CMD ["sh", "-c", "echo 'Skipping lint' && npm start"]

