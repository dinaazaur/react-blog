import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { Typography } from "@material-ui/core"
import { compose } from "../../utis"
import { connect } from "react-redux"
import { commentsListSelector } from "../../selectors"
import { withErrorBoundary } from "../hoc"
import CommentsForm from "../form/form"

const Comment = ({ comment = {}, postId, id }) => {
  if (comment.editable) return (
    <CommentsForm commentId={ id } postId={ postId } itemOptions={ {
      title: comment.title,
      text: comment.text,
      name: comment.author
    } }/>
  )

  return (
    <Fragment>
      <Typography component='h3' variant={ "h5" } color={ "textPrimary" } align={ "center" }>
        { comment.title }
      </Typography>
      <Typography component="p">
        { comment.text }
      </Typography>
      <Typography component='p' color={ "textSecondary" } align={ "right" }>
        { comment.author }
      </Typography>
    </Fragment>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string
}

export default compose(
  connect(
    (state, ownProps) => ({
      comment: commentsListSelector(state, ownProps),
    })
  ),
  withErrorBoundary,
  memo
)(Comment)
