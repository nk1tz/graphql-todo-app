import React from 'react'
import styled from 'styled-components'
import TodoList from './components/TodoList'

const AppShell = styled.div`
  text-align: center;
`
const AppHeader = styled.header`
  background-color: #222;
  height: 80px;
  padding: 20px;
  color: white;
`

export default () => (
  <AppShell>
    <AppHeader>
      <h1>Todo list</h1>
    </AppHeader>
    <TodoList />
  </AppShell>
)
