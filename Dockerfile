FROM node:18-alpine3.17

WORKDIR /usr/src/app/

COPY package*.json /usr/src/app/
COPY tsconfig*.json /usr/src/app/

RUN npm install --only=production

COPY . .

EXPOSE 4000


CMD ["npm", "run", "start"]