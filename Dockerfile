FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN yarn global add http-server

# créer le dossier 'app'
RUN mkdir /app

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN yarn install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . /app

# construit l'app pour la production en la minifiant
RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "serve" ]