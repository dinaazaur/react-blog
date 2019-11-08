import React from 'react'
import { render } from 'react-dom'
import App from './app'
import store from './store'
import { Provider } from 'react-redux'
import { BlogServiceProvider } from "./context"
import BlogService from "./blog-service"


const blogService = new BlogService()


render(
  <Provider store={ store }>
    <BlogServiceProvider value={ blogService }>
      <App/>
    </BlogServiceProvider>
  </Provider>,
document.getElementById('root')
)