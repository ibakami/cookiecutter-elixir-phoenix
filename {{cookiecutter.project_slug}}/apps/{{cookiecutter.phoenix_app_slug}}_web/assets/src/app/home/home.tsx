import { RouteComponentProps } from "@reach/router"
import React from "react"
import { Container, Header, Image, Label } from "semantic-ui-react"

export const Home: React.SFC<RouteComponentProps> = () => {
  return (
    <Container>
      <Header as="h1" dividing>
        Elixir Phoenix Cookie Cutter
      </Header>
      <p>Phoenix Umbrella Project with React/TypeScript </p>
      <Image
        src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
      <Image
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
        style={{ marginTop: "2em" }}
      />
    </Container>
  )
}
