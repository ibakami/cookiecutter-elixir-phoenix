import { Router } from "@reach/router"
import * as React from "react"

import { HomeRoot } from "./app/home"
import { ReducerContextDemoRoot } from "./app/reducer-context-demo"
import { SubscriptionDemoRoot } from "./app/subscription-demo"

export const AppRouter: React.SFC = (): JSX.Element => (
  <Router primary={false}>
    <HomeRoot path="/" />
    <SubscriptionDemoRoot path="/subscription-demo" />
    <ReducerContextDemoRoot path="/reducer-context-demo" />
  </Router>
)
