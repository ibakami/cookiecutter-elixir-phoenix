import * as React from "react"
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const LazyHome = React.lazy(() =>
  import(/* webpackChunkName: "HomeComponent" */ "./home").then(module => ({
    default: module.Home,
  })),
)
/* eslint-enable */

export const HomeRoot: React.FC = (props): JSX.Element => {
  useRootTitle(PAGE_NAME)
  return (
    <React.Suspense
      fallback={<LoadingPage message={`${PAGE_NAME} is loading`} />}
    >
      <LazyHome {...props} />
    </React.Suspense>
  )
}
