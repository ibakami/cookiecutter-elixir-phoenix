import * as React from "react"
import { RouteComponentProps } from "@reach/router"
import { useRootTitle } from "../helpers/hooks"
import { LoadingPage } from "../helpers/components"

const PAGE_NAME = "Home"

/**
 * React lazy isn't supported yet on typings,
 * and it doesn't allow named export yet, which sucks
 *
 * Also, we can't do something like an HoC for this to save lines of code
 * We are doing dynamic import and we need to separate the page to its own
 */

// IMPORTANT!
// Change the webpackChunkName comment below, so the dynamic file will appear with a proper name

const LazyComponent = React.lazy(() =>
  import(/* webpackChunkName: "HomeComponent" */ "./home").then(module => ({
    default: module.Home,
  })),
)

export const HomeRoot: React.FC<RouteComponentProps> = (props): JSX.Element => {
  useRootTitle(PAGE_NAME)
  return (
    <React.Suspense
      fallback={<LoadingPage message={`${PAGE_NAME} is loading`} />}
    >
      <LazyComponent {...props} />
    </React.Suspense>
  )
}
