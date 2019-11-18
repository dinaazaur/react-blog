import React, { useEffect } from 'react'
import Post from "../post/post"
import { compose } from "../../utis"
import { connect } from "react-redux"
import { postSelector, postsLoadingSelector, loadedSinglePostSelector } from "../../selectors"
import { fetchPost, addSingleLoadedPost } from "../../actions"
import { withBlogService, withErrorBoundary } from "../hoc"
import Loader from "../loader"
import Form from "../form"

const PostPage = ({ match, history, post, fetchSinglePost, blogService,
                    loading, loaded, addLoadedPost }) => {
  const { id } = match.params
  useEffect(() => {
    if (!loaded.includes(id)) {
      fetchSinglePost(blogService, id)
      addLoadedPost(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  if (loading || !post) return <Loader />

  if (history.location.state && history.location.state.edit) {
    const body = {
      title: post.title,
      text: post.text,
      name: post.author,
      date: post.date,
      category: post.category
    }

    return <Form postForm itemOptions={ body } postId={ id }/>
  }

  return (
    <Post singlePostId={id} singlePost={post}/>
  )
}

export default compose(
  connect(
    (state, props) => ({
      post: postSelector(state, props),
      loading: postsLoadingSelector(state),
      loaded: loadedSinglePostSelector(state)
    }),
    { fetchSinglePost: fetchPost,
      addLoadedPost: addSingleLoadedPost }
  ),
  withErrorBoundary,
  withBlogService,
)(PostPage)
