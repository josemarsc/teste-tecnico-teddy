FROM node:18
WORKDIR /app
COPY projects/products /app/projects/products
COPY projects/common /app/projects/common
COPY angular.json /app
COPY .env /app
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app
RUN npm install -g @angular/cli
RUN npm install
RUN ng build common
CMD ["ng", "serve", "products", "--host", "0.0.0.0"]
