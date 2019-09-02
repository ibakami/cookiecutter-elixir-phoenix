import { RouteComponentProps } from "@reach/router"
import {
  Container,
  Header,
  Segment,
  Divider,
  Grid,
  Input,
  Button,
  Form,
  Label,
} from "semantic-ui-react"
import React from "react"
import { useSubscription, useQuery, useMutation } from "@apollo/react-hooks"
import { LIST_USERS, USER_ADDED, ADD_USER } from "../graphql"
import { Formik, Form as FormikForm, Field } from "formik"

export const SubscriptionDemo: React.SFC<RouteComponentProps> = () => {
  const { loading, error, data } = useSubscription(USER_ADDED)
  const userList = useQuery(LIST_USERS)
  const [mutate, mutationData] = useMutation(ADD_USER)

  return (
    <Container>
      <Header as="h1">Subscription Demo</Header>
      <p>
        The following examples are demo for working Subscription and Query
        GraphQL operations in the frontend
      </p>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
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
        <Divider vertical />
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
