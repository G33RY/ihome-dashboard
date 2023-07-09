FROM --platform=linux/amd64 node:18
WORKDIR /usr/src/app

EXPOSE 80
COPY . .

RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
