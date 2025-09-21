# Bazowy obraz
FROM node:20-alpine

# Katalog roboczy
WORKDIR /app

# Skopiuj tylko package.json i package-lock.json (z cache npm install)
COPY package*.json ./

# Zainstaluj zależności
#RUN npm install

# Skopiuj resztę aplikacji
COPY . .

# Ustaw port
EXPOSE 5173

# Domyślna komenda
CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0"]