defmodule {{cookiecutter.phoenix_app_module}}Web.WebpackEntrypoint do
  @moduledoc """
  Webpack Entrypoint

  This particular module is responsible for making code-splitting on phoenix possible

  Webpack generates assets-manifest.json file for us to know what assets should be included in the template.
  Then we'll manually map through it in the corresponding template

  Import this module on the main entrypoint (e.g.: cpt_web.ex), just below the `use Phoenix.HTML` part
  """

  # credo:disable-for-this-file

  # Read the manifest from static directory
  def get_manifest do
    Path.join(:code.priv_dir(:{{cookiecutter.phoenix_app_slug}}_web), "static/assets-manifest.json")
    |> File.read!()
    |> Jason.decode!()
  end

  # Create a list of npm chunks based on the manifest. Will be needing this to populate the chunks on templates
  def get_npm_chunk_list do
    get_manifest()
    |> Enum.map(fn {key, _value} -> key end)
    |> Enum.filter(fn entry -> Regex.match?(~r/^npm\..*$/, entry) end)
  end

  if Mix.env() == :prod do
    # Phoenix uses @manifest to recognize our manifest assets as a valid route on production
    @manifest Path.join(:code.priv_dir(:{{cookiecutter.phoenix_app_slug}}_web), "static/assets-manifest.json")
              |> File.read!()
              |> Jason.decode!()
    def webpack_entrypoint_path(_conn, name), do: @manifest[name]
  else
    def webpack_entrypoint_path(_conn, name) do
      manifest = get_manifest()
      manifest[name]
    end
  end
end
