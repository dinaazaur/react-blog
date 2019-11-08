import React from 'react'
import { Container } from "@material-ui/core"
import PostsList from "../posts-list"

const Main = () => {
  return (
    <Container maxWidth="md" component='main'>
      <PostsList />
    </Container>
  )
}

export default Main
