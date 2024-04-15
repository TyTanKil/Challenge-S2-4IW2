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

# Configuration de l'image de production légère
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
