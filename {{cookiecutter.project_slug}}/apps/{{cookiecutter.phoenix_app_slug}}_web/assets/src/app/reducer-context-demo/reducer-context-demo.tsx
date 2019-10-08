import { RouteComponentProps } from "@reach/router"
import { Field, Formik, Form as FormikForm } from "formik"
import React from "react"
import { ComponentWithReducers } from "./types"
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  List,
  Segment,
} from "semantic-ui-react"

import { Options } from "./components/options"
import { Todo } from "./components/todo"

export const ReducerContextDemo: React.SFC<ComponentWithReducers> = ({
  state,
  dispatch,
}) => {
  return (
    <Container>
      <Header as="h1" dividing>
        Reducer and Context Demo (Hooks)
      </Header>
      <Header size="large">TODO List App:</Header>
      <Segment>
        <Grid columns={2} stackable divided>
          <Todo />
          <Options />
        </Grid>
      </Segment>
    </Container>
  )
}
