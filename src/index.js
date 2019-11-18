import React from 'react'
import { render } from 'react-dom'
import App from './app'
import store from './store'
import { Provider } from 'react-redux'
import { BlogServiceProvider } from "./context"
import BlogService from "./blog-service"
import { BrowserRouter } from "react-router-dom"
const blogService = new BlogService()


render(
  <Provider store={ store }>
    <BrowserRouter>
      <BlogServiceProvider value={ blogService }>
        <App/>
      </BlogServiceProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)