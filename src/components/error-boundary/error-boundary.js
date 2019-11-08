import React, { Component } from 'react'
import ErroIndicator from "../error-indicator"

class ErrorBoundary extends Component {
  state = {
    componentError: false
  }

  static getDerivedStateFromError(error) {
    // todo add some logger ^^
    return { componentError: true };
  }

  render() {
    const { componentError: error } = this.state
    const { hasError, children } = this.props

    if(hasError || error) return <ErroIndicator />

    return children
  }
}

export default ErrorBoundary