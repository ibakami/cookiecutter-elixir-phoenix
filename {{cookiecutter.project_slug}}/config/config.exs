# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :{{cookiecutter.phoenix_app_slug}},
  ecto_repos: [{{cookiecutter.phoenix_app_module}}.Repo]

config :{{cookiecutter.phoenix_app_slug}}_web,
  ecto_repos: [{{cookiecutter.phoenix_app_module}}.Repo],
  generators: [context_app: :{{cookiecutter.phoenix_app_slug}}]

# Configures the endpoint
config :{{cookiecutter.phoenix_app_slug}}_web, {{cookiecutter.phoenix_app_module}}Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "6Dy4Xya3S+t/vgNTqbxtrmqifo+Gkaecc9IZBbfk7qfKJ6z7J34ZUxRF1HBP8bcU",
  render_errors: [view: {{cookiecutter.phoenix_app_module}}Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: {{cookiecutter.phoenix_app_module}}Web.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
