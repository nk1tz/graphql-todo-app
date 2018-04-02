import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>Signup</div>
        <span>
          Email<input type="text" />
        </span>
        <span>
          Password<input type="password" />
        </span>
      </div>
    )
  }
}

export default App
