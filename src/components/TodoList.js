import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Todo from './Todo'

const GET_TODOS = gql`
  {
    allTodoes {
      id
      text
      completed
    }
  }
`

const ADD_TODO = gql`
  mutation($text: String!, $completed: Boolean!) {
    createTodo(text: $text, completed: $completed) {
      id
      completed
      text
    }
  }
`

const TodoForm = ({ text, completed }) => (
  <Mutation
    mutation={ADD_TODO}
    optimisticResponse={{
      __typename: 'Mutation',
      createTodo: {
        id: '',
        text: text,
        completed: completed,
      },
    }}
    update={(cache, { data: { createTodo } }) => {
      const { allTodoes } = cache.readQuery({ query: GET_TODOS })
      cache.writeQuery({
        query: GET_TODOS,
        data: { allTodoes: allTodoes.concat([createTodo]) },
      })
    }}
  >
    {addTodo => {
      let input
      return (
        <form
          onSubmit={e => {
            e.preventDefault()
            addTodo({ variables: { text: input.value, completed: false } })
            input.value = ''
          }}
        >
          <input ref={node => (input = node)} />
        </form>
      )
    }}
  </Mutation>
)

const Loading = () => <span>Loading...</span>

export default () => (
  <React.Fragment>
    <TodoForm />
    <Query query={GET_TODOS}>
      {({ data, error, loading }) =>
        loading ? <Loading /> : data.allTodoes.map(todo => <Todo key={todo.id} {...todo} />)
      }
    </Query>
  </React.Fragment>
)
