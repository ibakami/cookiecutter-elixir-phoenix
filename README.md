# cookiecutter-elixir-phoenix

An Elixir + Phoenix umbrella project template

## Requirements

Install `cookiecutter` command line: `pip install cookiecutter`

## Usage

Generate a new Elixir + Phoenix + GraphQL + ReactJS + Docker project:

```
cookiecutter gh:ibakami/cookiecutter-elixir-phoenix
```

Websocket URL:

```
ws://localhost:4000/socket
```

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

Make the phoenix project work locally

```
mix phx.server
```

## License

This project is licensed under the terms of the [MIT License](/LICENSE)
