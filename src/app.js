import React, { Fragment } from 'react'
import IncrementTest from "./components/increment-test"
import Header from "./components/header"
import Main from "./components/main"
import './index.scss'
import CommentsForm from "./components/comments-form"

const App = () => {
  return (
    <Fragment>
      <Header />
      <Main />
      <IncrementTest />
    </Fragment>
  )
}

export default App
