defmodule {{cookiecutter.phoenix_app_module}}.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      {{cookiecutter.phoenix_app_module}}.Repo
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: {{cookiecutter.phoenix_app_module}}.Supervisor)
  end
end
