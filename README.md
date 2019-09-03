# cookiecutter-elixir-phoenix

An Elixir + Phoenix umbrella project template

## Sections

- [Features](#features)
- [Cookiecutter Requirements](#cookiecutter-requirements)
- [Cookiecutter Usage](#cookiecutter-usage)
- [Setting Everything Up](#setting-everything-up)
- [Running the project](#running-the-project)
- [Recommended VS Code Plugins](#recommended-vs-code-plugins)

## Features
- Elixir (1.9.0)
- Phoenix (1.4)
- Absinthe (Elixir GraphQL library)
- Credo
- Dialyzer
- Excoveralls
- Dockerfile
- Gitlab CI Configurations
- React (latest)
- TypeScript
- ESLint with customized rules for Typescript and React (loosely based on Airbnb rules)
- Prettier + Editorconfig
- Single Page Application Routing: Reach Router with Lazy Loading
- Apollo GraphQL
  - [React Apollo with `@apollo/react-hooks`](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2)
  - Apollo Client and Links setup readily available for you
  - `websocket` and `subscription` working with example
- Frontend optimizations with webpack configuration out of the box. Includes:
  - [Split Chunks Optimization with `WebpackAssetsManifest`](https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
  - Terser Minifier
  - [Code Splitting and Dynamic Imports](https://medium.com/@ohsiwon/code-splitting-with-dynamic-import-test-and-learn-28bc2a06d1b8)
  - OptimizeCSSAssetsPlugin
  - GZIP (Compression Plugin)
  - Workbox (Service Worker)
  - Cache Busting with Service Worker
- Progressive Web App Capable

## Cookiecutter Requirements

[Install python first](https://www.python.org/downloads/). We'll need `pip` or `pip3` to use `cookiecutter`.  
Install `cookiecutter` command line: `pip install cookiecutter`

## Cookiecutter Usage

Generate a new Elixir + Phoenix + GraphQL + ReactJS + Docker project:

Stable (`master`)

```
cookiecutter gh:ibakami/cookiecutter-elixir-phoenix
```

Latest (`develop`)

```
cookiecutter gh:ibakami/cookiecutter-elixir-phoenix --checkout develop
```

<!--
Dont really think we'll need this in this section
Websocket URL:

```
ws://localhost:4000/socket
``` -->

## Setting everything up

### Requirements

Please install the latest versions to avoid problems

- [Elixir](https://elixir-lang.org/install.html)
- [Phoenix](https://hexdocs.pm/phoenix/installation.html)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/)

#### To avoid problems, it is recommended to do the steps in order. We also assume that you have the required application installed in your machine

Initialize Git Flow (default setting). Also, do the first commit so gitignore and git hooks will be initialized too.  
[Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

```
git flow init
git add .
git commit -am "Initial Commit"
```

Build docker for postgres

```
docker-compose up -d
```

Install phoenix dependencies

```
mix deps.get
```

Setting up the database and compiling stuffs

```
mix ecto.setup
```

Getting the npm packages with yarn (avoid using npm). Change `<application slug>` to your project slug name

```
(cd apps/<application_slug>_web/assets && yarn)
```

## Running the project

Make the phoenix project work locally

```
mix phx.server
```

## Recommended VS Code Plugins
- Better Comments
- EditorConfig for VS Code
- Eslint
- GraphQL
- Prettier - Code Formatter
- Prettier Now
- vscode-elixir

## License

This project is licensed under the terms of the [MIT License](/LICENSE)
