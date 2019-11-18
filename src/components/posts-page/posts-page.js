import React from 'react'
import { Container } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import PostsList from "../posts-list"

const PostsPage = () => (
  <Container maxWidth="lg" component='main'>
    <Grid container item>
      <PostsList/>
    </Grid>
  </Container>
)

export default PostsPage