import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Comment from "../comment"
import Loader from "../loader"
import { compose } from "../../utis"
import { connect } from "react-redux"
import { fetchComments, fetchDeleteItem } from "../../ac/action-creators"
import { withBlogService, withErrorBoundary } from "../hoc"
import CommentsForm from "../comments-form/comments-form"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { setEditable } from "../../ac"
import { editableSelector } from "../../selectors/selectors"

const CommentsList = ({ isOpen, loadPostComments, id, blogService,
                        loaded, loading, comments, deleteComment, handleEditable, editable }) => {
  useEffect(() => {
    if (isOpen && !loading && !loaded) {
      loadPostComments(blogService, id)
    }
  })
  const handleDelete = (commentId) => {
    deleteComment(blogService, commentId, id, 'comments', comments)
  }

  const handleEditClick = (id) => {
    handleEditable(id)
  }


  const content = !!comments.length && comments ? comments.map(comment => {
    return (
      <div key={ comment }>
        <Comment
          postId={ id }
          id={ comment }
          loading={ loading }
          blogService={ blogService }
        />
        <IconButton onClick={() => handleDelete(comment)}>
          <DeleteIcon/>
        </IconButton>
        <IconButton onClick={() => handleEditClick(comment)}>
          <EditIcon />
        </IconButton>
      </div>
    )
  }) : <p>sorry no comments yet</p>

  const visibleContent = loading ? <Loader/> : content

  return (
    <div>
      {
        visibleContent
      }
      { editable ? null : <CommentsForm postId={ id } blogService={ blogService }/> }
    </div>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}
export default compose(
  connect(
    state => ({ editable: editableSelector(state) }),
    {
      loadPostComments: fetchComments,
      deleteComment: fetchDeleteItem,
      handleEditable: setEditable
    }
  ),
  withErrorBoundary,
  withBlogService,
  memo
)(CommentsList)
