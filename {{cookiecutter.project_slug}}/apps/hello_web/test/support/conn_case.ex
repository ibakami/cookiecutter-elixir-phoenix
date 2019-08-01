defmodule {{cookiecutter.phoenix_app_module}}Web.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  import other functionality to make it easier
  to build common data structures and query the data layer.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  alias Ecto.Adapters.SQL.Sandbox

  using do
    quote do
      # Import conveniences for testing with connections
      use Phoenix.ConnTest
      alias {{cookiecutter.phoenix_app_module}}Web.Router.Helpers, as: Routes

      # The default endpoint for testing
      @endpoint {{cookiecutter.phoenix_app_module}}Web.Endpoint
    end
  end

  setup tags do
    :ok = Sandbox.checkout({{cookiecutter.phoenix_app_module}}.Repo)

    unless tags[:async] do
      Sandbox.mode({{cookiecutter.phoenix_app_module}}.Repo, {:shared, self()})
    end

    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end
