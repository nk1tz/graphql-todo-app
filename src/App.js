import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import logo from './logo.svg'
import './App.css'

const GET_TODOS = gql`
  {
    allTodoes {
      id
      text
      completed
    }
  }
`

const Loading = () => <span>Loading...</span>

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo list</h1>
        </header>
        <Query query={GET_TODOS}>
          {({ data, error, loading }) =>
            loading ? <Loading /> : data.allTodoes.map(todo => <div key={todo.id}>{todo.text}</div>)
          }
        </Query>
        {/* <div>Signup</div>
        <span>
          Email<input type="text" />
        </span>
        <span>
          Password<input type="password" />
        </span> */}
      </div>
    )
  }
}

export default App
