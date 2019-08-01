import { Router } from "@reach/router"
import * as React from "react"

import { Home } from "./home/home"

export const AppRouter: React.SFC = (): JSX.Element => (
  <Router primary={false}>
    <Home path="/" />
  </Router>
)
