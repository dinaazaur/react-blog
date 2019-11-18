import React from 'react'
import { BlogServiceConsumer } from "../../context"

export const withBlogService = (View) => {
  return (props) => (
    <BlogServiceConsumer>
      {
        (blogService) => (
          <View  {...props} blogService={blogService}/>
        )
      }
    </BlogServiceConsumer>
  )
}