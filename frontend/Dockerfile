# Étape 1 : Build
FROM node:22 AS builder
WORKDIR /app

# Copier et installer deps
COPY package*.json ./
RUN npm ci

# Copier le reste du code
COPY . .

# Builder l’app Next.js
RUN npm run build

# Étape 2 : Production
FROM node:22 AS runner
WORKDIR /app

# Indiquer que c’est une image de production
# pour le build de l'image il est mieux d'utiliser NODE_ENV=production car cela sert juste à mettre en place notre base pour le docker compose c là qu'on va run l'image donc on remettra NODE_ENV=development en valeur par defaut. ici cela reduit juste les performances.
#NODE_ENV=production est aussi obligatoire pour npm run start (sinon Next.js affiche un warning et peut mal se comporter)
ENV NODE_ENV=production 

# Copier uniquement les fichiers nécessaires depuis builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
