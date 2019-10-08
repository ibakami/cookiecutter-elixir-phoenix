import React from "react"
import { Icon, Input, Label, List } from "semantic-ui-react"

export const TodoItem: React.SFC = () => {
  return (
    <List.Item>
      <Input
        value="Task1"
        icon={<Icon name="trash" color="red" circular inverted link />}
        label={<Label as="a" icon="check" color="green" label="Completed" />}
        labelPosition="left"
        fluid
      />
    </List.Item>
  )
}
