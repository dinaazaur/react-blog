import React, { Fragment } from 'react'
import IncrementTest from "./components/increment-test"
import Header from "./components/header"
import Main from "./components/main"
import './index.scss'
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <Fragment>
      <Header />
        <Route path="/" component={Main}/>
        <Route path="/counter" component={IncrementTest} />
    </Fragment>
  )
}

export default App
