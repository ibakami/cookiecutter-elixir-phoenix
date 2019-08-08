import React from "react"
import { Segment, Dimmer, Loader, Image } from "semantic-ui-react"

interface Props {
  message: string
}

export const LoadingPage: React.SFC<Props> = ({ message }) => (
  <Segment>
    <Dimmer active inverted>
      <Loader size="massive">{message}</Loader>
    </Dimmer>

    <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
  </Segment>
)
