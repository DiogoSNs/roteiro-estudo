FROM node:20-alpine

WORKDIR /app

# Copia dependências primeiro para cache eficiente
COPY package*.json ./

RUN npm install

# Copia todo o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
