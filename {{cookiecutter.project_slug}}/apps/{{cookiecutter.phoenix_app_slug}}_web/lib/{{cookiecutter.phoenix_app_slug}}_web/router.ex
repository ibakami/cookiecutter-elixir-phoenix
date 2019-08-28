defmodule {{cookiecutter.phoenix_app_module}}Web.Router do
  use {{cookiecutter.phoenix_app_module}}Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", {{cookiecutter.phoenix_app_module}}Web do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", {{cookiecutter.phoenix_app_module}}Web do
  #   pipe_through :api
  # end

  scope "/" do
    forward("/graphql", Absinthe.Plug, schema: {{cookiecutter.phoenix_app_module}}Web.GraphQL.Schema, json_codec: Jason, socket: {{cookiecutter.phoenix_app_module}}Web.UserSocket)

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: {{cookiecutter.phoenix_app_module}}Web.GraphQL.Schema,
      json_codec: Jason,
      socket: {{cookiecutter.phoenix_app_module}}Web.UserSocket
    )
  end
end
