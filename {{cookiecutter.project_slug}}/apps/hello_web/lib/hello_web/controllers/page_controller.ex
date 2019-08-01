defmodule {{cookiecutter.phoenix_app_module}}Web.PageController do
  use {{cookiecutter.phoenix_app_module}}Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
