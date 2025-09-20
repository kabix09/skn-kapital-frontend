# Bazowy obraz
FROM node:20-alpine

# Katalog roboczy
WORKDIR /app

# Skopiuj tylko package.json i package-lock.json (z cache npm install)
COPY package*.json ./

# Zainstaluj zależności
RUN npm install --production

# Skopiuj resztę aplikacji
COPY . .

# Ustaw port
EXPOSE 5173

# Domyślna komenda
CMD ["npm", "run", "dev"]
