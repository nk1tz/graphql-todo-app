import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'

const GET_TODOS = gql`
  {
    allTodoes {
      id
      text
      completed
    }
  }
`

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`

const Todo = ({ id, text, completed }) => (
  <Mutation mutation={TOGGLE_TODO} variables={{ id, completed }}>
    {toggleTodo => (
      <div key={id}>
        <p onClick={() => toggleTodo(id, !completed)}>{text}</p>
      </div>
    )}
  </Mutation>
)

const Loading = () => <span>Loading...</span>

const Todos = () => (
  <Query query={GET_TODOS}>
    {({ data, error, loading }) =>
      loading ? <Loading /> : data.allTodoes.map(todo => <Todo key={todo.id} {...todo} />)
    }
  </Query>
)

const AppShell = styled.div`
  text-align: center;
`
const AppHeader = styled.header`
  background-color: #222;
  height: 80px;
  padding: 20px;
  color: white;
`

class App extends Component {
  render() {
    return (
      <AppShell>
        <AppHeader>
          <h1>Todo list</h1>
        </AppHeader>
        <Todos />
      </AppShell>
    )
  }
}

export default App
