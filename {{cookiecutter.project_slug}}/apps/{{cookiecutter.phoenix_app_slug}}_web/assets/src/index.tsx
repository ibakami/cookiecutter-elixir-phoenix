import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app"
import { ApolloClient } from "apollo-client"
import { apolloLinks } from "../apollo-links"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "@apollo/react-hooks"

const appRoot: HTMLDivElement | null = document.querySelector("#root")

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: apolloLinks,
  cache,
})

const AppComponent: React.SFC = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<AppComponent />, appRoot)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered:", registration) // eslint-disable-line no-console
        return null
      })
      .catch(error => {
        console.log("SW registration failed:", error) // eslint-disable-line no-console
      })
  })
}
