import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks"
import { RouteComponentProps } from "@reach/router"
import { Field, Formik, Form as FormikForm } from "formik"
import React from "react"
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Segment,
} from "semantic-ui-react"

import { ADD_USER, LIST_USERS, USER_ADDED } from "../../graphql"

export const SubscriptionDemo: React.SFC<RouteComponentProps> = () => {
  const { loading, error, data } = useSubscription(USER_ADDED)
  const userList = useQuery(LIST_USERS)
  const [mutate, mutationData] = useMutation(ADD_USER)

  return (
    <Container>
      <Header as="h1" dividing>
        Subscription Demo
      </Header>
      <p>
        The following examples are demo for working Subscription and Query
        GraphQL operations in the frontend
      </p>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable divided>
          <Grid.Column>
            <Formik
              initialValues={{
                name: "",
                age: 12,
              }}
              onSubmit={values => {
                mutate({
                  variables: values,
                }).then(() => {
                  console.log("User Added")
                })
              }}
              render={formikProps => {
                const { handleChange, handleBlur, values } = formikProps
                return (
                  <Form as="div">
                    <FormikForm>
                      <Form.Field>
                        <Header>Add User</Header>
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="name">Name: </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="age">Age: </label>
                        <Input
                          type="number"
                          id="age"
                          name="age"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.age}
                        />
                      </Form.Field>
                      <Button type="submit" color="blue" fluid>
                        Add User
                      </Button>
                    </FormikForm>
                  </Form>
                )
              }}
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            {data ? (
              <>
                <Header size="large">{data.userAdded.name}</Header>
                <Label size="large">Age: {data.userAdded.age}</Label>
              </>
            ) : (
              <Header size="large">No user yet</Header>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Header>Current Users: </Header>
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
        ))}
    </Container>
  )
}
