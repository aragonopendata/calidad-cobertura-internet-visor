FROM node:8-alpine
RUN mkdir -p /opt/docker/bot
WORKDIR /opt/docker/bot
COPY package.json .
RUN npm install --production
COPY . .
CMD [ "node", "main.js" ]