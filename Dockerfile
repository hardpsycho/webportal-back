# Base image
FROM node:18

# Create app directory
WORKDIR /app

# копируем файлы
COPY . .

# Install app dependencies
RUN npm ci

# Собираем
RUN npm run build

EXPOSE 5000

# Запускаем
CMD [ "node", "build/main.js" ]