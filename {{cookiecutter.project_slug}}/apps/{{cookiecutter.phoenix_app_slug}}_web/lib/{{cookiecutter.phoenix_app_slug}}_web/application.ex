defmodule {{cookiecutter.phoenix_app_module}}Web.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @spec start(Application.start_type(), term()) ::
          {:error, reason :: term()} | {:ok, pid()} | {:ok, pid(), Application.state()}
  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the endpoint when the application starts
      {{cookiecutter.phoenix_app_module}}Web.Endpoint,
      {Absinthe.Subscription, [{{cookiecutter.phoenix_app_module}}Web.Endpoint]}
      # Starts a worker by calling: {{cookiecutter.phoenix_app_module}}Web.Worker.start_link(arg)
      # {{'{'}}{{cookiecutter.phoenix_app_module}}Web.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: {{cookiecutter.phoenix_app_module}}Web.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @spec config_change(list(tuple), list(tuple), list(any)) :: :ok
  def config_change(changed, _new, removed) do
    {{cookiecutter.phoenix_app_module}}Web.Endpoint.config_change(changed, removed)
    :ok
  end
end
