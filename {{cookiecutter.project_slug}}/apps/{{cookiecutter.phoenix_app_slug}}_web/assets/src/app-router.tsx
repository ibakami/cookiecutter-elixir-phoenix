import { Router } from "@reach/router"
import * as React from "react"

import { HomeRoot } from "./home"
import { SubscriptionDemoRoot } from "./subscription-demo"

export const AppRouter: React.SFC = (): JSX.Element => (
  <Router primary={false}>
    <HomeRoot path="/" />
    <SubscriptionDemoRoot path="/subscription-demo"></SubscriptionDemoRoot>
  </Router>
)
