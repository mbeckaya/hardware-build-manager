FROM node:24

WORKDIR /web

COPY . /web

EXPOSE 5173

RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]