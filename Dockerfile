# Используем Node.js в качестве базового образа
FROM node:17.9.1

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Копируем yarn lock в контейнер
# COPY yarn.lock ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 5000
#EXPOSE 9000

# Команда для запуска приложения
CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "run", "start:prod" ]