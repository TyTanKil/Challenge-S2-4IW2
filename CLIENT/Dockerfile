# Utilise une image de base Node.js avec Vue CLI pré-installé
FROM node:lts as build-stage

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers du client
COPY . .

# Compile l'application pour la production
RUN npm run build

EXPOSE 5173
