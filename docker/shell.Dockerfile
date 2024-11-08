FROM node:18
WORKDIR /app
COPY projects/shell /app/projects/shell
COPY projects/common /app/projects/common
COPY angular.json /app
COPY .env /app
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app
RUN npm install -g @angular/cli
RUN npm install
RUN ng build common
CMD ["ng", "serve", "shell", "--host", "0.0.0.0"]
