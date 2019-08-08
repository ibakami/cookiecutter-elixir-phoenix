defmodule {{cookiecutter.phoenix_app_module}}Web.Endpoint do
  use Phoenix.Endpoint, otp_app: :{{cookiecutter.phoenix_app_slug}}_web

  socket "/socket", {{cookiecutter.phoenix_app_module}}Web.UserSocket,
    websocket: true,
    longpoll: false

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug Plug.Static,
   # This will enable us to fetch the manifest + sw on the root of the project
    at: "/",
    from: :{{cookiecutter.phoenix_app_slug}}_web,
    gzip: false,
    only: ~w(manifest.json css fonts images js favicon.ico robots.txt)

  plug Plug.Static,
    # All our frontend static files will go on assets folder
    at: "/assets",
    from: :{{cookiecutter.phoenix_app_slug}}_web,
    gzip: true,
    only: ~w(css fonts images js favicon.ico service-worker.js robots.txt assets-manifest.json),
    only_matching: ~w(precache-manifest)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_{{cookiecutter.phoenix_app_slug}}_web_key",
    signing_salt: "jMyK4u8L"

  plug {{cookiecutter.phoenix_app_module}}Web.Router
end
