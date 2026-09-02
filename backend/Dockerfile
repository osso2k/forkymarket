FROM node:22-bookworm-slim

WORKDIR /backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3030

CMD ["node", "--import", "tsx", "index.tx"]