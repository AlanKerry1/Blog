# backend/Dockerfile

# Stage 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls -la /app/dist  # Проверяем содержимое dist после сборки

# Stage 2: production
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist

RUN ls -la /app/dist  # Проверяем содержимое dist в prod

# Запускаем миграции TypeORM, затем сервер
CMD ["sh", "-c", "npx typeorm migration:run -d dist/data-source.js && node dist/main.js"]

