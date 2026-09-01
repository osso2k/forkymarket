FROM node:22-bookworm-slim

WORKDIR /backend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]