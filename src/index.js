import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { injectGlobal } from 'styled-components'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjfhppt8q51la0124ei84j8r3',
})

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<ApolloApp />, document.getElementById('root'))
registerServiceWorker()
