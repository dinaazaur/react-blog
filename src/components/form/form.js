import React, { Fragment, useState } from 'react'
import { makeStyles, NativeSelect } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import { addPatchComment, addPatchPost, setEditablePost } from "../../ac"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { compose } from "../../utis"
import { withBlogService } from "../hoc"
import { withRouter } from "react-browser-router"
import { categoriesSelector } from "../../selectors/selectors"

const Form = ({
                onCommentSubmit, postId, blogService,
                itemOptions = false, commentId = null,
                postForm = false, onPostSubmit, history, categories,
                unsetEditable
              }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    name: itemOptions.name || '',
    title: itemOptions.title || '',
    text: itemOptions.text || '',
    date: itemOptions.data ? new Date(itemOptions.date) : new Date(),
    inputSize: { min: 3, max: 30 },
    textSize: { min: 4, max: 300 },
    category: itemOptions.category || '',
  })

  const handleChange = (e) => {
    if (e.target.id === 'name') {
      setState({...state, name: e.target.value})
    } else if (e.target.id === 'text') {
      setState({...state, title: e.target.value})
    } else {
      setState({...state, text: e.target.value})
    }
  }

  const handleCategoryChange = e => {
    setState({...state, category: e.target.value})
  }

  const additionFormToPost = (
    <Fragment>
      <DatePicker
        customInput={ <TextField variant="outlined"
                                 label="pick date"
                                 className={ classes.inputs }
                                 margin="dense"/> }
        selected={ state.date }
        popperPlacement="top-end"
        onChange={ date => setState({ ...state, date }) }
      />
      <NativeSelect
        value={ state.category }
        onChange={ handleCategoryChange }
      >
        <option value="none">none</option>
        {
          categories.map(category => (
            <option key={ category } value={ category }>{ category }</option>
          ))
        }
      </NativeSelect>
    </Fragment>)

  const handleSubmit = e => {
    e.preventDefault()
    postForm
      ? onPostSubmit(blogService, {
        author: state.name, title: state.title,
        text: state.text, date: state.date, category: state.category
      },
      itemOptions, postId)
      : onCommentSubmit(blogService, { author: state.name, title: state.title, text: state.text, postId },
      postId, itemOptions, commentId)

    setState({...state, name: '', title: '', text: ''})
    postForm && unsetEditable()
    postForm && history.push('/')
  }

  const handleValidate = () =>
    state.name.length>=state.inputSize.min
    && state.title.length>=state.inputSize.min
    && state.text.length>=state.textSize.min
    && state.title.length<=state.inputSize.max
    && state.name.length<=state.inputSize.max
    && state.text.length<=state.textSize.max
    && ( !postForm || (state.category !== ''))


  return (
    <Fragment>
      <form className={ classes.root } onSubmit={ handleSubmit }>
        <div className={ classes.container }>
          <div className={ classes.inputsWrapper }>
            <TextField
              value={ state.name }
              onChange={ handleChange }
              id="name"
              variant="outlined"
              label="name"
              className={ classes.inputs }
              margin="dense"
            />
            <TextField
              value={ state.title }
              onChange={ handleChange }
              label="title"
              id="text"
              variant="outlined"
              className={ classes.inputs }
              margin="dense"
            />
            { postForm && additionFormToPost }

          </div>
          <Button
            type="submit"
            className={ classes.button }
            variant="contained"
            color="primary"
            value="submit"
            disabled={ !handleValidate() }
          >
            Submit
          </Button>
        </div>
        <TextField
          className={ classes.comment }
          placeholder="text here..."
          multiline={ true }
          rows={ 5 }
          onChange={ handleChange }
          value={ state.text }
          variant="outlined"
          rowsMax={ 6 }
        />

      </form>
    </Fragment>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexBasis: "100%",
    flexWrap: "wrap",
    alignItems: "center"
  },
  inputsWrapper: {
    flexBasis: "80%",
  },
  inputs: {
    marginRight: theme.spacing(2),
    width: "250px"
  },
  button: {
    flexBasis: "10%"
  },
  comment: {
    flexBasis: "100%"
  }
}))


export default compose(
  connect(
    state => ({ categories: categoriesSelector(state) }),
    {
      onCommentSubmit: addPatchComment,
      onPostSubmit: addPatchPost,
      unsetEditable: setEditablePost
    }
  ),
  withBlogService,
  withRouter
)(Form)
