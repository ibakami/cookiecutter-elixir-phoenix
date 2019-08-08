import { RouteComponentProps } from "@reach/router"
import { Container, Header } from "semantic-ui-react"
import React from "react"

export const Home: React.SFC<RouteComponentProps> = () => (
  <Container text>
    <Header as="h1">Elixir Phoenix Cookie Cutter</Header>
    <p>Phoenix Umbrella Project with React/TypeScript </p>
  </Container>
)
