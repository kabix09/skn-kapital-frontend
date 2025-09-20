# Wybierz odpowiednią wersję Node.js
FROM node:19-alpine

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.*
# Skopiuj package.json i package-lock.json
COPY package*.json ./

# Usuń node_modules i zainstaluj ponownie
# RUN rm -rf node_modules && npm install

# Zainstaluj zależności
# RUN npm install

# Skopiuj resztę plików
COPY . .

# RUN npm run build
# Domyślna komenda (może zostać nadpisana przez docker-compose)
# RUN npm list lightningcss

CMD [ "npm","run","dev" ]
#CMD ["sh", "-c", "npm install --no-optional && npm run dev"]