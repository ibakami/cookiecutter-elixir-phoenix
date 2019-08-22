defmodule {{cookiecutter.phoenix_app_module}}Web.GraphQL.Schema do
  @moduledoc """
  The root schema
  """

  use Absinthe.Schema
  import_types(Absinthe.Type.Custom)

  object :user do
    field :name, :string
    field :age, :integer
  end

  mutation do
    field :add_user, :user do
      arg :name, :string
      arg :age, :integer
      resolve(fn _, %{name: name, age: age}, _ do
        {:ok, %{name: name, age: age}}
      end)
    end
  end

  subscription do
    field :user_added, :user do
      config(fn _args, _info ->
        {:ok, topic: "*"}
      end)

      trigger(:add_user, topic: fn _ -> ["*"] end)
    end
  end
end
