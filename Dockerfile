# Используем Node.js в качестве базового образа
FROM node:17.9.1

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Копируем yarn lock в контейнер
COPY yarn.lock ./

# Устанавливаем yarn
RUN npm install -g yarn

# Устанавливаем зависимости
RUN yarn install

# Копируем все файлы проекта в контейнер
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 5000

# Команда для запуска приложения
CMD [ "yarn", "run", "start" ]