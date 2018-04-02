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
      text
      completed
    }
  }
`

const TodoForm = ({ text, completed }) => (
  <Mutation
    mutation={ADD_TODO}
    update={(proxy, { data: { createTodo } }) => {
      console.log(createTodo)
      // Read the data from our cache for this query.
      const data = proxy.readQuery({ query: GET_TODOS })
      // Add our comment from the mutation to the end.
      data.allTodoes.push(createTodo)
      // Write our data back to the cache.
      proxy.writeQuery({ query: GET_TODOS, data })
    }}
  >
    {addTodo => {
      let input
      return (
        <form
          onSubmit={e => {
            e.preventDefault()
            addTodo({
              variables: { text: input.value, completed: false },
              optimisticResponse: {
                __typename: 'Mutation',
                createTodo: {
                  __typename: 'Todo',
                  id: '',
                  text: input.value,
                  completed: false,
                },
              },
            })
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
