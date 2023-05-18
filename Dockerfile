# Base image
FROM node:19.2

# Définir le répertoire de travail dans le conteneur
WORKDIR /upload
# Copiez les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances du projet
RUN npm install

# Copiez tous les fichiers de l'application dans le répertoire de travail
COPY . .

# Construisez l'application React
RUN npm run build

# Exposez le port 3000 pour accéder à l'application React
EXPOSE 3000



# Start the React app

CMD ["npm","run","dev"]