import { RouteComponentProps } from "@reach/router"
import { Field, Formik, Form as FormikForm } from "formik"
import React, { useReducer } from "react"
import { Reducers, initialState } from "./reducers/todo-ducks"

import { ReducerContextDemo } from "./reducer-context-demo"

export const ReducerContextDemoContainer: React.SFC<
  RouteComponentProps
> = () => {
  const [state, dispatch] = useReducer(Reducers, initialState)

  return <ReducerContextDemo state={state} dispatch={dispatch} />
}
