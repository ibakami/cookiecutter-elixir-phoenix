import { RouteComponentProps } from "@reach/router"
import { Container, Header, Image, Label } from "semantic-ui-react"
import React from "react"

export const Home: React.SFC<RouteComponentProps> = () => {
  return (
    <Container>
      <Header as="h1">Elixir Phoenix Cookie Cutter</Header>
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
      {/* <Header>Current Users: </Header>
      {data ? (
        <Segment>
          <p>{data.userAdded.name}</p>
          Age: {data.userAdded.age}
        </Segment>
      ) : (
        <Segment>
          <p>No User</p>
        </Segment>
      )}
      <Header>List of Users: </Header>
      {userList.data.listUsers &&
        userList.data.listUsers.map((item: any) => (
          <Segment key={`list-user-${item.name}`}>
            <p>{item.name}</p>
            Age: {item.age}
          </Segment>
        ))} */}
    </Container>
  )
}
