import React, { memo, useState } from 'react'
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
import { fetchDeleteItem, setEditablePost } from "../../ac"
import CommentsList from "../comments-list"
import { CSSTransition } from "react-transition-group"
import { withRouter } from "react-browser-router"

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
    justifyContent: "space-between"
  },
  readMoreLink: {
    textDecoration: "none",
    color: "#f00"
  }
}))

const Post = ({ post, singlePost = false, deletePost, blogService, history, editPost }) => {
  const pointedPost = singlePost ? singlePost : post
  const { title, author, text, id } = singlePost ? singlePost : post
  const [isOpenComments, setOpenComments] = useState(false)
  const titleCapitalize = title[0].toUpperCase() + title.slice(1)
  const classes = useStyles()
  const handleClickComments = () => {
    setOpenComments(isOpenComments => !isOpenComments)
  }

  const handleDelete = () => {
    deletePost(blogService, id)
  }

  const handleViewPost = () => {
    history.push(`/posts/${ id }`)
  }

  const handleEdit = () => {
    history.push(`/posts/${ id }`, { edit: true })
    editPost()
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
            <Fab
              onClick={ handleEdit }
              size="small"
              className={ classes.button }
              color="primary"
              aria-label="edit"
            >
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
          { !singlePost && <Button onClick={ () => handleViewPost() } className={ classes.readMoreLink }>
            Read more...
          </Button> }
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
          timeout={ { enter: 500, exit: 300 } }
        >
          <CommentsList
            id={ pointedPost.id } loading={ pointedPost.commentsLoading }
            comments={ pointedPost.comments }
            loaded={ pointedPost.commentsLoaded }
            isOpen={ isOpenComments }
          />
        </CSSTransition>

      </Paper>
    </Grid>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

export default compose(
  connect(
    null,
    ({ deletePost: fetchDeleteItem, editPost: setEditablePost })
  ),
  withErrorBoundary,
  withRouter,
  withBlogService,
  memo)(
  Post)
