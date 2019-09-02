import gql from "graphql-tag"

export const ADD_USER = gql`
  mutation($name: String!, $age: Int!) {
    addUser(name: $name, age: $age) {
      name
    }
  }
`

export const LIST_USERS = gql`
  query {
    listUsers {
      name
      age
    }
  }
`

export const USER_ADDED = gql`
  subscription {
    userAdded {
      name
      age
    }
  }
`
