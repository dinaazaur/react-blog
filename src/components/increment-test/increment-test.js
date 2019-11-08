import React, { Fragment } from 'react'
import { connect } from "react-redux"

const IncrementTest = ({ inc, res }) => (
  <Fragment>
    <p style={{padding: 0, margin: 0}}>{res}</p>
    <button onClick={inc}>Increment</button>
  </Fragment>
)

export default connect(
                 state => ({res: state.incrementer}) ,
                 dispatch => ({ inc: () => dispatch({ type: 'INCREMENT' })
                   }))(IncrementTest)
