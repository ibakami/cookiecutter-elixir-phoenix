# {{cookiecutter.phoenix_app_module}}.Umbrella


To start your Phoenix server:

- Install dependencies with `mix deps.get && (cd apps/{{cookiecutter.phoenix_app_slug}}_web/assets && yarn)`
- Start Postgres `docker-compose up -d`
- Setup Database `(cd apps/{{cookiecutter.phoenix_app_slug}} && mix ecto.setup)`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

- Open graphiql (A graphical interactive in-browser GraphQL IDE) `http://localhost:4000/graphiql`


```
$ make
```
