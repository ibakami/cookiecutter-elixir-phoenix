defmodule {{cookiecutter.phoenix_app_module}}.Umbrella.MixProject do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      version: "{{cookiecutter.version}}",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      test_coverage: [tool: ExCoveralls],
      aliases: aliases(),
      preferred_cli_env: [
        coveralls: :test,
        "coveralls.detail": :test,
        "coveralls.post": :test,
        "coveralls.html": :test
      ],
      releases: [
        {{cookiecutter.phoenix_app_slug}}: [
          include_executables_for: [:unix],
          applications: [{{cookiecutter.phoenix_app_slug}}: :permanent, {{cookiecutter.phoenix_app_slug}}_web: :permanent]
        ]
      ]
    ]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options.
  #
  # Dependencies listed here are available only for this project
  # and cannot be accessed from applications inside the apps folder
  defp deps do
    [
      {:dialyxir, "~> 1.0.0-rc.6", only: [:dev, :test], runtime: false},
      {:excoveralls, "~> 0.10", only: :test},
      {:credo, "~> 1.0.0", only: [:dev, :test], runtime: false}
    ]
  end

  defp aliases do
    [
      "app.setup": [
        "deps.get",
        "ecto.setup",
        &assets/1
      ],
      "ecto.setup": [
        "ecto.create",
        "ecto.migrate",
      ],
      "ecto.reset": ["ecto.drop", "ecto.setup"]
    ]
  end

  defp assets(args) do
    {_, res} =
      System.cmd("yarn", args, into: IO.binstream(:stdio, :line), cd: "apps/{{cookiecutter.phoenix_app_slug}}_web/assets")

    if res > 0 do
      System.at_exit(fn _ -> exit({:shutdown, res}) end)
    end
  end
end
