import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { Typography } from "@material-ui/core"
import { compose } from "../../utis"
import { connect } from "react-redux"
import { commentsListSelector } from "../../selectors"
import { withErrorBoundary } from "../hoc"


const Comment = ({ comment = {} }) => (
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


Comment.propTypes = {
  comment: PropTypes.object
}

export default compose(
  connect(
    (state, ownProps) => ({ comment: commentsListSelector(state, ownProps) })
  ),
  withErrorBoundary,
  memo
)(Comment)
