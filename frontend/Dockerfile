# frontend/Dockerfile

# Stage 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: production serving with nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Копируем entrypoint скрипт в контейнер
COPY entrypoint.sh /entrypoint.sh

# Делаем скрипт исполняемым
RUN chmod +x /entrypoint.sh

EXPOSE 80

# Запускаем entrypoint, который создаст config.json и поднимет nginx
ENTRYPOINT ["/entrypoint.sh"]
