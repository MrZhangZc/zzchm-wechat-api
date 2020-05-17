FROM keymetrics/pm2:10-alpine

ARG PORT=4396

ENV PORT $PORT

EXPOSE $PORT

WORKDIR /app
COPY package.json yarn.lock index.js up.yml /app/
RUN npm install

COPY app/ /app/app
COPY bin/ /app/bin
COPY config/ /app/config

CMD [ "npm", "run", "pm2-docker-prod" ]
