import React from "react"
import { Grid, Header, Icon, Input, Label, List } from "semantic-ui-react"

import { TodoList } from "./todo-list"

export const Todo: React.SFC = () => {
  return (
    <Grid.Column>
      <Header size="large">Tasks:</Header>
      <TodoList />
    </Grid.Column>
  )
}
