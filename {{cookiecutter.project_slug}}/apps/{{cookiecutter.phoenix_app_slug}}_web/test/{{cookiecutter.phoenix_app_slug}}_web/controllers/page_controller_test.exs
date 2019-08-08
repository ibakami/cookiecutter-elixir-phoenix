defmodule {{cookiecutter.phoenix_app_module}}Web.PageControllerTest do
  use {{cookiecutter.phoenix_app_module}}Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert conn.status == 200
  end
end
