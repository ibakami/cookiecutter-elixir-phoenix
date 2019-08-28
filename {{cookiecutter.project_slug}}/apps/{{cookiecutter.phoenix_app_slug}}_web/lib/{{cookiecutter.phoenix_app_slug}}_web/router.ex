defmodule SubscriptionWeb.Router do
  use SubscriptionWeb, :router

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

  scope "/", SubscriptionWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", SubscriptionWeb do
  #   pipe_through :api
  # end

  scope "/" do
    forward("/graphql", Absinthe.Plug, schema: SubscriptionWeb.GraphQL.Schema, json_codec: Jason, socket: SubscriptionWeb.UserSocket)

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: SubscriptionWeb.GraphQL.Schema,
      json_codec: Jason,
      socket: SubscriptionWeb.UserSocket
    )
  end
end
