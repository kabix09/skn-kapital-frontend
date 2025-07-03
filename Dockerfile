# Wybierz odpowiednią wersję Node.js
FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.*
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików
COPY . .

# Domyślna komenda (może zostać nadpisana przez docker-compose)
CMD ["npm", "run", "dev"]
