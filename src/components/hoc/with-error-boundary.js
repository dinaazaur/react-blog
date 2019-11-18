import React from 'react'
import ErrorBoundary from "../error-boundary/error-boundary"

export const withErrorBoundary = (ComponentToCatch) => {
  const hocComponent = ({ ...props }) => (
    <ErrorBoundary>
      <ComponentToCatch { ...props } />
    </ErrorBoundary>
  )
  return hocComponent
}