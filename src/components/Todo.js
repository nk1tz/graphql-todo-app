import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const TOGGLE_TODO = gql`
  mutation($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
      __typename
    }
  }
`

export default ({ id, text, completed }) => (
  <Mutation
    mutation={TOGGLE_TODO}
    variables={{ id, completed: !completed }}
    optimisticResponse={{
      __typename: 'Mutation',
      updateTodo: {
        __typename: 'Todo',
        id: id,
        text: text,
        completed: !completed,
      },
    }}
  >
    {updateTodo => (
      <div>
        <span onClick={updateTodo}>{text}</span>
        <span> - {completed.toString()}</span>
      </div>
    )}
  </Mutation>
)
