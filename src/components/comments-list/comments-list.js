import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from "../comment"
import Loader from "../loader"
import { compose } from "../../utis"
import { connect } from "react-redux"
import { commentsLoadedSelector, commentsLoadingSelector } from "../../selectors/selectors"
import { fetchComments } from "../../ac/action-creators"
import { withBlogService, withErrorBoundary } from "../hoc"
import CommentsForm from "../comments-form/comments-form"

class CommentsList extends Component {


  componentDidMount() {
    const { isOpen, loadPostComments, id, blogService, loading, loaded } = this.props
    if (isOpen && !loading && !loaded) {
      loadPostComments(blogService, id)
    }
  }


  render() {
    console.log('---', 'cl render')
    const { comments, loading } = this.props
    const content = !!comments.length && comments ? comments.map(comment => {
      return (
        <Comment key={ comment } id={ comment } loading={loading}/>
      )
    }) : <p>sorry no comments yet</p>
    const visibleContent = loading ? <Loader /> : content

    return (
      <div>
        {
          visibleContent
        }
        <CommentsForm />
      </div>
    )
  }

}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}
export default compose(
  connect(
    null,
    { loadPostComments: fetchComments }
  ),
  withErrorBoundary,
  withBlogService
)(CommentsList)
