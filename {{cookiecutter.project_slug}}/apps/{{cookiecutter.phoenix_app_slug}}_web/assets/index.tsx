import React from "react"
import ReactDOM from "react-dom"

import { App } from "./src/app"

const appRoot: HTMLDivElement | null = document.querySelector("#root")

const AppComponent: React.SFC = () => <App />

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
