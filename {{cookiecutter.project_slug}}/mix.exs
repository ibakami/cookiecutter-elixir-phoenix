defmodule {{cookiecutter.phoenix_app_module}}.Umbrella.MixProject do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      version: "0.1",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      releases: [
        {{cookiecutter.phoenix_app_slug}}: [
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
      {:credo, "~> 1.0.0", only: [:dev, :test], runtime: false}
    ]
  end
end
