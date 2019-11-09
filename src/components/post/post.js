import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Fab from "@material-ui/core/Fab"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { connect } from "react-redux"
import { compose } from "../../utis"
import { withBlogService, withErrorBoundary } from "../hoc"
import { fetchDeleteItem } from "../../ac"
import CommentsList from "../comments-list"
import { CSSTransition } from "react-transition-group"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  container: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1),
  },
  commentsBtn: {
    display: 'flex',
    justifyContent: "flex-end"
  }
}))

const Post = ({ post, deletePost, blogService }) => {
  const { title, author, text, id } = post
  const [isOpenComments, setOpenComments] = useState(false)
  const titleCapitalize = title[0].toUpperCase() + title.slice(1)
  const classes = useStyles()
  const handleClickComments = () => {
    setOpenComments(isOpenComments => !isOpenComments)
  }

  const handleDelete = () => {
    deletePost(blogService, id)
  }
  return (
    <Grid item xs={ 6 } md={ 12 } className={ classes.root }>
      <Paper className={ classes.container }>
        <Grid container>
          <Grid item xs={ 9 }>
            <Typography component="h2" variant="h5">
              { titleCapitalize }
            </Typography>
          </Grid>
          <Grid item xs={ 3 } align="right">
            <Fab
              onClick={ handleDelete }
              size="small"
              className={ classes.button }
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon/>
            </Fab>
            <Fab size="small" className={ classes.button } color="primary" aria-label="edit">
              <EditIcon/>
            </Fab>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" color="textSecondary">
          { author }
        </Typography>
        <Typography variant="subtitle1" paragraph>
          { text }
        </Typography>
        <div className={ classes.commentsBtn }>
          <Button
            onClick={ handleClickComments }
            variant="outlined"
            color="primary">
            Open Comments
          </Button>
        </div>
        <CSSTransition
          in={ isOpenComments }
          classNames={ 'comments' }
          mountOnEnter
          unmountOnExit
          timeout={{enter: 500, exit: 300}}
        >
          <CommentsList
            id={ post.id } loading={ post.commentsLoading }
            comments={ post.comments }
            loaded={ post.commentsLoaded }
            isOpen={ isOpenComments }/>
        </CSSTransition>

      </Paper>
    </Grid>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default compose(
  connect(
    null,
    ({ deletePost: fetchDeleteItem })
  ),
  withErrorBoundary,
  withBlogService)(
  Post)
