FROM node:18-alpine

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

RUN npm install -g pm2

COPY . .

EXPOSE 3500

RUN npm run build

CMD ["pm2-runtime", "dist/bin/index.js"]
