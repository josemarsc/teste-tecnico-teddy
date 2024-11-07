# Criação da Aplicação utilizando microfrontends(Module Federation)

<br /><br /><br />

## Como executar a aplicação

Cada aplicação/microfrontend pode ser executada de forma independente, no entanto, para executar a aplicação shell é necessário que as aplicações users e products estejam rodando.

### Como executar as aplicações de forma independente
  
```zsh
npm run serve:prods
npm run serve:users
npm run serve:shell
```

Alternativamente, é possível executar todas as aplicações de uma vez utilizando o comando abaixo

```zsh
npm run serve:all
```

<br /><br /><br />

## Criação e configuração do projeto

### Cria um novo projeto Angular sem criar uma aplicação padrão (src/app)
```zsh
ng new teddy --no-create-application
```

### Navega para o diretório do projeto criado
```zsh
cd teddy
```

### Cria as aplicações/microfrontends
```zsh
ng g application shell
ng g application users
ng g application products
```

### Instala módulo que é responsável por integrar webpack com Angular
```zsh
npm i @angular-architects/module-federation
```

### Configura o Module Federation no projeto shell
### Isso cria o arquivo de configuração do webpack, define as portas e faz outras configurações requeridas pelo webpack
```zsh
ng add @angular-architects/module-federation --project shell --port 10090
```

### Cria e escreve as urls padrão das aplicações 'remotas'
```zsh
touch .env
echo "APP_USERS_URL=http://localhost:10091" >> .env
echo "APP_PRODS_URL=http://localhost:10092" >> .env
```

### Instala dotenv para conseguir acessar as variáveis de ambiente
```zsh
npm install dotenv --save
```

### Ajusta o arquivo webpack.config.js do projeto shell para conseguir acessar as variáveis de ambiente
```javascript
require("dotenv").config();

const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    users: `${process.env.APP_USERS_URL}/remoteEntry.js`,
    products: `${process.env.APP_PRODS_URL}/remoteEntry.js`,
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
```

### Cria o arquivo decl.d.ts na raiz do projeto shell
```zsh
touch decl.d.ts
```

### O projeto vai utilizar 'static federation' para carregar os módulos remotos, então é necessário adicionar o seguinte código no arquivo decl.d.ts
```typescript
declare module 'users/*';
declare module 'products/*';
```

### Gera o component home para todas as aplicações
```zsh
ng generate component home --standalone --project shell
ng generate component home --standalone --project users
ng generate component home --standalone --project products
```

### Ajusta os arquivos de rotas das aplicações users e products
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
];
```

### Adicionar `importProvidersFrom` nos arquivos de config dos projetos users e products
```typescript
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
};

```

### Ajusta as rotas da aplicação shell para utilizar os módulos(routes) remotos
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    children: [
      { path: 'users', loadChildren: () => import('users/routes').then(m => m.routes) },
      { path: 'products', loadChildren: () => import('products/routes').then(m => m.routes) },
    ]
  },
];

```

### Adiciona module federation nas demais aplicações
```zsh
ng add @angular-architects/module-federation --project users --port 10091
ng add @angular-architects/module-federation --project products --port 10092
```

### Ajusta o arquivo webpack.config.js das aplicações users e products
```javascript
// projects/users/webpack.config.js
const { shareAll, withModuleFederationPlugin, } = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "users",
  exposes: { "./routes": "./projects/users/src/app/app.routes.ts" },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: "auto" }),
  },
});


// projects/products/webpack.config.js
const { shareAll, withModuleFederationPlugin, } = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "products",
  exposes: { "./routes": "./projects/products/src/app/app.routes.ts" },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: "auto" }),
  },
});
```
