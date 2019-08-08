use Mix.Config

# Configure your database
config :{{cookiecutter.phoenix_app_slug}}, {{cookiecutter.phoenix_app_module}}.Repo,
  username: "postgres",
  password: "postgres",
  database: "{{cookiecutter.phoenix_app_slug}}_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :{{cookiecutter.phoenix_app_slug}}_web, {{cookiecutter.phoenix_app_module}}Web.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
