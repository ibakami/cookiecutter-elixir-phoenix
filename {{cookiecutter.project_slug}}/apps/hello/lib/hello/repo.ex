defmodule {{cookiecutter.phoenix_app_module}}.Repo do
  use Ecto.Repo,
    otp_app: :{{cookiecutter.phoenix_app_slug}},
    adapter: Ecto.Adapters.Postgres
end
