import React from 'react'
import { Container } from "@material-ui/core"
import PostsList from "../posts-list"
import Grid from "@material-ui/core/Grid"
import DateFilter from '../date-filter'
const Main = () => {
  return (
    <Container maxWidth="lg" component='main'>
      <Grid container>
        <Grid item md={9}>
          <PostsList />
        </Grid>
        <Grid item md={3}>
          <DateFilter />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Main
