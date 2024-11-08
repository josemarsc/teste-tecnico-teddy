FROM node:18
WORKDIR /app
COPY projects/users /app/projects/users
COPY projects/common /app/projects/common
COPY angular.json /app
COPY .env /app
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app
RUN npm install -g @angular/cli
RUN npm install
RUN ng build common
CMD ["ng", "serve", "users", "--host", "0.0.0.0"]
