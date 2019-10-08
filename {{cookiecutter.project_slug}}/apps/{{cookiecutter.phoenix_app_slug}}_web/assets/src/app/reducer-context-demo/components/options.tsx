import React from "react"
import { Button, Grid, Header, Input, Segment } from "semantic-ui-react"

export const Options: React.SFC = () => {
  return (
    <Grid.Column verticalAlign="top">
      <Header size="large">Add Tasks:</Header>
      <Segment>
        <Input
          type="text"
          fluid
          action={{
            color: "teal",
            labelPosition: "right",
            icon: "plus",
            content: "Add",
          }}
        />
      </Segment>
    </Grid.Column>
  )
}
