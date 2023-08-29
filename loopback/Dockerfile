FROM node:14.21.3-alpine

WORKDIR /app

# * to copy the every file starts with "package"
COPY package*.json .

RUN npm install

COPY . .

# difference between CMD and ENTRYPOINT
# ENTRYPOINT doesn't overwrite the command of the base container
# CMD overwrites it and this may cuz issues so ENTRYPOINT saver
# if - command specified in docker-compose.yml it will overwrite CMD but will not overwrite ENTRYPOINT
CMD ["npm", "run", "start:dev"]