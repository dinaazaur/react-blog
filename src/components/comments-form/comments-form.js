import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"

const useStyles = makeStyles(theme =>({
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

const CommentsForm = ({ onSubmit }) => {
  const classes = useStyles()
  const [nameField, setNameField] = useState('')
  const [textField, setTextField] = useState('')
  const [commentField, setCommentField] = useState('')
  const [inputSize] = useState({ min: 10, max:30 })
  const [commentSize] = useState({ min: 10, max: 300 })

  const handleChange = (e) => {
    if(e.target.id === 'name') {
      setNameField(e.target.value)
    } else if(e.target.id === 'text') {
      setTextField(e.target.value)
    } else {
      setCommentField(e.target.value)
    }
  }

  const handleSubmit = () => {

  }

  const handleValidate = () =>
    nameField.length >= inputSize.min
    && textField.length >= inputSize.min
    && commentField.length >= commentSize.min
    && textField.length <= inputSize.max
    && nameField.length <= inputSize.max
    && commentField.length <= commentSize.max


  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes.inputsWrapper}>
          <TextField
            value={nameField}
            onChange={ handleChange }
            id="name"
            variant="outlined"
            label="name"
            className={classes.inputs}
            margin="dense"
          />
          <TextField
            value={textField}
            onChange={ handleChange }
            label="title"
            id="text"
            variant="outlined"
            className={classes.inputs}
            margin="dense"
          />
        </div>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          value="submit"
          disabled={!handleValidate()}
        >
          Submit
        </Button>
      </div>
      <TextField
        className={classes.comment}
        placeholder="comment"
        multiline={true}
        rows={5}
        onChange={ handleChange }
        value={commentField}
        variant="outlined"
        rowsMax={6}
      />
    </form>
  )
}

export default connect(
  state => ({  })
)(CommentsForm)
