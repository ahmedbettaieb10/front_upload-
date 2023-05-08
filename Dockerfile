# Base image
FROM node:19.2.0

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet dans le répertoire de travail
COPY . .

# Exposer le port sur lequel votre application sera accessible dans le conteneur Docker
EXPOSE 3000
# Start the server
CMD ["npm","run","dev"]