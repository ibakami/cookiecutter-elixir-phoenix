import React from "react"
import { List } from "semantic-ui-react"

import { TodoItem } from "./todo-item"

export const TodoList: React.SFC = () => {
  return (
    <List>
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </List>
  )
}
