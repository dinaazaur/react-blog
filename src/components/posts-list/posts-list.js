import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid"
import Post from "../post"
import {CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from "react-redux"
import { postsLoadingSelector, postsSelector } from "../../selectors"
import { fetchPosts } from "../../ac"
import { withBlogService, withErrorBoundary } from "../hoc"
import { compose } from "../../utis"
import Loader from "../loader"
import { postsListSelector } from "../../selectors/selectors"

const PostsList = ({ posts, loading, fetchData }) => {
  useEffect(() => {
    fetchData()
  }, [])
  if (loading) return <Loader />

  const body = posts.map(post => {
    return (
      <CSSTransition key={post.id} classNames={'post'} timeout={800}>
      <Post post={post} />
      </CSSTransition>
    )
  })
  return (
    <Grid component={TransitionGroup}>
      { body }
    </Grid>
  )
}

export default compose(
  connect(state =>
      ({ posts: postsListSelector(state), loading: postsLoadingSelector(state) }),
      ({ fetchData: fetchPosts })),
  withErrorBoundary,
  withBlogService, )(
    PostsList)
