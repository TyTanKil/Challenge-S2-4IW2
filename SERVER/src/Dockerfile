# Utilise une image de base Node.js
FROM node:latest

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers du serveur
COPY . .

# Expose le port sur lequel le serveur écoute
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["node", "server.js"]
