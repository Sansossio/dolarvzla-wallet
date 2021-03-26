# DolarVzla Wallet

**DolarVzla Wallet*

This project was generated using [Nx](https://nx.dev).

![NX](docs/nx-logo.png)

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Overview

NX Monorepo containing front & back applications

### Back

[NestJS](https://nestjs.com/)

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
