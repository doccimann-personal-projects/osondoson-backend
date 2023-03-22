FROM node:18-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install -g pm2

RUN npm i

COPY . .

EXPOSE 3500

RUN npm run build

CMD ["pm2-runtime", "dist/bin/index.js"]
