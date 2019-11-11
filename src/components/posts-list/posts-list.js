/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Grid from "@material-ui/core/Grid"
import Post from "../post"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from "react-redux"
import { postsLoadedSelector, postsLoadingSelector } from "../../selectors"
import { fetchPosts } from "../../actions"
import { withBlogService, withErrorBoundary } from "../hoc"
import { compose } from "../../utis"
import Loader from "../loader"
import { filtratedPosts } from "../../selectors/selectors"

const PostsList = ({ posts, categorizedPosts = false, loading, fetchData, blogService, loaded }) => {
  useEffect(() => {
    if (!loaded)
    categorizedPosts || fetchData(blogService)
  }, [loaded])
  if (loading) return <Loader/>
  const content = categorizedPosts ? categorizedPosts : posts
  const body = content.map(post => {
    return (
      <CSSTransition key={ post.id } classNames={ 'post' } timeout={ 800 }>
        <Post post={ post }/>
      </CSSTransition>
    )
  })
  return (
    <Grid component={ TransitionGroup }>
      { body }
    </Grid>
  )
}

export default compose(
  connect(state =>
      ({
        posts: filtratedPosts(state),
        loading: postsLoadingSelector(state),
        loaded: postsLoadedSelector(state)
      }),
    ({ fetchData: fetchPosts })),
  withErrorBoundary,
  withBlogService,)(
  PostsList)
