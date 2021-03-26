# DolarVzla Wallet

**DolarVzla Wallet*

This project was generated using [Nx](https://nx.dev).

![NX](docs/nx-logo.png)

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Overview

NX Monorepo containing front & back applications

### Front

[Angular](https://angular.io) & [NGRX](https://ngrx.io) & [Beat Design Sistem](https://beat.payvision.tech/?path=/docs/intro-beat-design-system--page)

#### Redux Architecture

![NGRX state management lifecycle](docs/ngrx-state-management-lifecycle.png)

### Back

[NestJS](https://nestjs.com/)

## NX workflow

### Generate an Angular application

`ng g @nrwl/angular:app my-app`

### Generate a nestJS application

`nx generate @nrwl/nest:application my-app`

### Generate simple library

Module **not** needed to use this library.

`nx generate @nrwl/workspace:library mylib`

**Important**: delete `projects` config added in general `jest.config.ts` file or tests will not run properly after running this command

Import from `@dolarvzla-wallet/mylib`.

### Generate an Angular library

`nx generate @nrwl/angular:lib my-lib`

Use prefix `@dolarvzla-wallet`.

Import from `@dolarvzla-wallet/mylib`.

### Generate a Nest library

This should be preferred option to create Nest libraries since this command add the library to the NX _chain_ of testing, etc...

`nx generate @nrwl/nest:library my-lib`

Use prefix `@dolarvzla-wallet`.

Import from `@dolarvzla-wallet/mylib`.

### Delete lib, app

`nx generate rm my-lib`
`nx generate rm my-app`

## Development

### Install dependencies

First run `yarn`

### Env variables

See `README.md` in all apps and libs (in this file as well) to set environment variables (`.env` file in each one)

### Code editor

#### VSCode

Workspace settings defined in `.vscode/settings.json` for _end of line_, linter, auto format on save...

##### End of line

It may happen that VSCode ignore end of line defined in workspace settings. Check `LF` is set instead of `CLRF` in your code editor

Otherwise, when editing repository bash scripts, for example, database bash scripts, execution in linux based containers may not work if saved with CLRF end of line

##### Extensions

Mandatory, to let repository settings.json configuration work

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

### Secrets

This secret file (for ING comms) must exist: `libs/ing/assets/secrets/pv_staging.key`

### Docker

_**Note**: Make sure all `.env` files are properly configured_

`docker-compose up` to run all containers

Registration **ing-webapp** URL in **docker** is the _legacy_ one:
`http://localhost:4200/landing?activationCode={token}`

NGINX will redirect URL above to standard _MBTv2_ URL:
`http://localhost:4200/register/token/{activationCode}`


#### DB

`docker-compose up mbt-database` to start DB container.

DB defined in `docker/database` directory

#### mock-crm

`docker-compose up mbt-mock-crm`

* Console: `http://localhost:9111/__admin/`

#### Sonar

`docker-compose -f docker-compose-sonar.yml up` to start SonarQube container

#### MBT services

- ing-webapp (`Dockerfile.ing-webapp`)
- api (`Dockerfile.api`)
- smart (`Dockerfile.smart`)
- mock-ing-api (`Dockerfile.mock-ing-api`)

All services images (except _wiremocks_) have a common base image (`Dockerfile.base`) since NX is a monorepo and all services share a common base

All services images are optimized for **prod** env and are configured as *multistage* images to minimize final image size

### Feed the DB

`yarn db:[migration|seed]:[operation] [target]`

**operation**

- `generate` (only for `migration`)
- `create` (only for `seed`)
- `run`
- `revert`

**target**

- `libs/database`
- `apps/mock-ing-api`

**Create DB schema for development environment**

This is not needed in case applications are started in local environment, since they synchronize the DB schema on startup

```
yarn db:migration:run libs/database
yarn db:migration:run apps/mock-ing-api
```

**Seed DB for development environment**

Seed data to DB schema to start minimal set of data to make the system work

```
yarn run db:seed:run libs/database
yarn run db:seed:run apps/mock-ing-api
```

**Locations**

Migrations & seeds are located in:

- `libs/model/db`
- `apps/mock-ing-api/db`

### Serve applications

#### ing-webapp

`nx serve ing-webapp`

* Home: `http://localhost:4200`
* Register: `http://localhost:4200/register/token/{token}`

#### api

`nx serve api`

* Swagger: `http://localhost:3333/api/v2/doc`

#### smart

`nx serve smart`

* Swagger: `http://localhost:8080/smart/v2/doc`

#### mock-ing-api

`nx serve mock-ing-api`

* Swagger: `http(s)://localhost:4444/ing/api/doc`

_mock-ing-api_ will be served via HTTPS using .env var `FORCE_HTTPS` set to `true` . Otherwise it will be served via HTTP

For **local env only**: `FORCE_HTTPS=true` in `apps/mock-ing-api/.env`

#### Run all apps

* `yarn start:all`
* `nx run-many --target=serve --all --parallel --maxParallel=10`

Run all backend apps

* `yarn start:back`
* `nx run-many --target=serve --projects=mock-ing-api,api,smart --parallel --maxParallel=10`

### Tools

#### Checks
Check project lint, unit test and e2e tests

```sh
yarn run:checks
```

#### Auth

Tools for authentication on MBT API

##### auth0

Generate auth0 token to access MBT API secure endpoints

```
yarn tools:auth:auth0 [EMAIL] [PASSWORD]
```
**EMAIL** and **PASSWORD** arguments correspond to auth0 user credentials

This will generate a **user** token, but if **client credentials** token is needed instead, leave _EMAIL_ and _PASSWORD_ **empty**

Sample:

```
# client credentials token
yarn tools:auth:auth0

# user token
yarn tools:auth:auth0 email@email.com mypassword
```

##### pv-simple-jwt

Generate jwt token used between communications between MBT and PV internal modules such as CRM and AceControl

```
yarn tools:auth:pv-simple-jwt [SECRET] [SECONDS_TO_EXPIRE]
```

- **SECRET** argument must match `PV_SIMPLE_SECRET` variable defined in `libs/auth/.env` file
- **SECONDS_TO_EXPIRE** corresponds to seconds to consider token expired since creation

Sample:

```
yarn tools:auth:pv-simple-jwt mysecret 30
```

##### token (Activation code)

There are two ways to create a new token

* Command: `yarn tools:activationCode myToken myEmail@demo.com true|false (multiple signee)`
* Swagger: https://localhost:4444/api/v2/doc/#/Customer/CustomerController_create

## Environment variables

In project root directory

`.env` file

```env

```

**Important**: Make sure to read libs `README.md` file to know what environment variables are needed in each library

### Autogenerate environment files

This command generates all ".env files" needed, if already exists any .env it will be replaced by the environment variables describes in README.md.

```sh
yarn tools:env:create
```

## Running lint

[StandardJS](https://standardjs.com) adapted to [NX](https://nx.dev)

Main config file: `tslint.json`

`nx lint` to run lint in all apps/libs
`nx lint --fix` to run lint & fix in all apps/libs

## Running unit tests

Unit tests via [Jest](https://jestjs.io).

```
nx test ing-webapp
nx test api
```

`nx test` to run unit tests in all apps

`nx affected:test` to execute the unit tests affected by a change.

`nx test ing-webapp --skip-nx-cache --watch` to skip test cache, then press `p`, then write _file_name_pattern_ to execute

## Running e2e api tests

e2e api tests via [Nest End-to-end testing](https://docs.nestjs.com/fundamentals/testing#end-to-end-testing).

```
yarn test:e2e:api
```

### Code coverage

Main config file: `jest.config.js`

`nx test --code-coverage`

This will create different reports (all of them git ignored)

- `test-report.xml` in all apps/libs root dir for azure test reports

- In `coverage` directory, coverage reports in 3 different formats:
  - **html**: human readable
  - **lcov**: for sonar
  - **cobertura**: for azure coverage reports

## Running LOCAL SonarQube tests reports

Start SonarQube container: `docker-compose -f docker-compose-sonar.yml up`

Run tests with coverage: `nx run-many --target=test --code-coverage --all --parallel --maxParallel=10 --skip-nx-cache`

Merge lcov reports: `yarn merge-lcov`

Make sure you have `DEV_SONAR_URL=http://localhost:9000` in your `.env` in _project_root_ directory

Publish coverage reports: `yarn local:sonar:publish`

Then visit http://localhost:9000 with credentials `admin/admin`

## Running e2e tests

e2e tests via [Cypress](https://www.cypress.io).

`nx e2e ing-webapp-e2e` to run e2e tests in ing-webapp-e2e app
`nx e2e api`

`nx e2e` to run e2e tests in all apps

`nx affected:e2e` to execute the end-to-end tests affected by a change.

`nx e2e ing-webapp-e2e --spec '**/{path_to_file}**' --headless` to run the test contained in the filename

## Understand your workspace

`nx dep-graph` to see a diagram of the dependencies of your projects.
