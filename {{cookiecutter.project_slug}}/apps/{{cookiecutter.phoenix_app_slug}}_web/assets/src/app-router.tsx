import { Router } from "@reach/router"
import * as React from "react"

import { HomeRoot } from "./home"

export const AppRouter: React.SFC = (): JSX.Element => (
  <Router primary={false}>
    <HomeRoot path="/" />
  </Router>
)
