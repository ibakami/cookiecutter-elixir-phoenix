const webpack = require("webpack")

const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const glob = require("glob")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const WebpackAssetsManifest = require("webpack-assets-manifest")
const CompressionPlugin = require("compression-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const distFolder = path.resolve(__dirname, "../priv/static")

const externalAssetsURI = [
  "http://cdn.jsdelivr.net/",
  "https://fonts.gstatic.com/",
]

const productionPlugin = [
  // Generates GZIP version of each file generated, Remember to enable gzip on static plug
  new CompressionPlugin(),
]

module.exports = (env, argv) => {
  const dev = argv.mode !== "production"

  return {
    entry: {
      // the [glob.sync()] part enables us to get everything that we imported in the project
      "js/index": ["./src/index.tsx"].concat(glob.sync("./vendor/**/*.js")),
    },
    output: {
      /**
       * This will produce the hashing + the naming of our bundles.
       * Everything in this file will go to /assets folder in our static folder
       *
       * This certain pattern will make the cache busting possible.
       *
       * We'll need to configure the assets to have cache-control header to max age
       * Webpack will remember the hashes we use on each assets, the hashes will change if a certain asset is modified.
       * The client, by default, will load the assets from the memory cache.
       * The client will only download a certain asset again if the hashes changed, as the client's assets with old hash won't be used anymore
       *
       * It will save a lot of network bandwidth when the user visited the app again.
       * And will also make your page load much faster and consistent for the first time, with HTTP2's multiplexing
       *
       * https://developers.google.com/web/fundamentals/performance/http2/
       */
      path: distFolder, // the base path
      filename: dev ? "[name].js" : "[name]_[contenthash].bundle.js", // the hash magic
      publicPath: "/assets/", // should match the endpoint.ex' Plug.Static
      chunkFilename: dev ? "js/[id].chunk" : "js/[id].[chunkhash].chunk", // the chunks (relevant file to the entrypoint) with hashing
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/i,
          exclude: "/node_modules/",
          loader: "babel-loader",
        },
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        // Some Apollo links and other libraries uses mjs extensions. We'll need a loader for that
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx", ".mjs"],
    },
    optimization: {
      // This will make the chunk names we produce to be human readable
      namedChunks: true,
      /**
       * This particular optimization splits all npm package we use into individual chunks.
       * This is very useful for cache busting + HTTP2's multiplexing. See why we did it here:
       * https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
       *
       * Also, we'll need manually import the scripts on phoenix' layouts because html-webpack-plugin
       * (the one that generates the import scripts for us) won't work in a phoenix project's frontend
       */
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )[1]
              return `npm.${packageName.replace("@", "")}`
            },
          },
        },
      },
      minimizer: [
        // we'll use terser because it's better and faster than uglifyjs
        new TerserPlugin({
          test: /\.(js|chunk)(\?.*)?$/i,
          cache: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    // The plugin's order is important, it executes everything asynchronously.
    plugins: [
      // Clears the priv/static for us, to avoid bloating during dev and prod
      new CleanWebpackPlugin(),
      // Copies everything on the static folder
      new CopyWebpackPlugin([
        { from: "static/**/*", to: path.resolve(distFolder, "../") },
        { from: "pwa", distFolder },
      ]),
      // new LodashModuleReplacementPlugin(),
      // This certain plugin remembers the hashes we use in every assets,
      // so it won't change the hash of a certain asset if it's not modified
      new webpack.HashedModuleIdsPlugin(),
      // Copies the CSS, functions like webpack entrypoint
      new MiniCssExtractPlugin({ filename: "../css/app.scss" }),
      // The plugin will only be accepted
      ...(dev ? [] : productionPlugin),
      /**
       * Workbox is the one resposible for making PWA app possible.
       * Handles the caching, offline mode, installable feature, manifest, ect.
       * We don't need to worry about it being in dev mode, workbox handles it for us
       */
      new WorkboxPlugin.GenerateSW({
        navigationPreload: true,
        clientsClaim: true,
        skipWaiting: true,
        exclude: [
          /^assets-manifest.*?\.json$/,
          /^manifest.*?\.json$/,
          /favicon/,
          /.gz$/,
        ],
        // navigateFallback: "/",
        runtimeCaching: [
          {
            urlPattern: /assets\/.*/,
            handler: "CacheFirst",
          },
          {
            // Will join each URI in the array
            // It will match the URI even if it's only partial
            urlPattern: new RegExp(`(${externalAssetsURI.join("|")})`),
            handler: "CacheFirst",
          },
          {
            urlPattern: /.*/,
            handler: "NetworkFirst",
          },
        ],
      }),
      // Generates a manifest that lists all the directories. We need it to manually import the scripts to phoenix' template
      // This should be the last in the plugins list
      new WebpackAssetsManifest({
        output: "assets-manifest.json",
        publicPath: true,
        writeToDisk: true,
        merge: dev ? true : false, // eslint-disable-line no-unneeded-ternary
      }),
    ],
  }
}
