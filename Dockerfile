FROM node:lts-alpine

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'yarn.lock' (si disponible)
COPY package.json ./
COPY yarn.lock ./

# installe les dépendances du projet
RUN yarn install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

# construit l'app pour la production en la minifiant
RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "serve", "--port=3000" ]