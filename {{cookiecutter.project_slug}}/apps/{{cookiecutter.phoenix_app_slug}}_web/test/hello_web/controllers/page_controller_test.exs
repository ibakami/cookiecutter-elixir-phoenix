defmodule {{cookiecutter.phoenix_app_module}}Web.PageControllerTest do
  use {{cookiecutter.phoenix_app_module}}Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end
end
