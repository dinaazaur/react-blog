import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { InputLabel } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import { compose } from "../../utis"
import { connect } from "react-redux"
import { categoriesSelector } from "../../selectors"
import { fetchAddCategory, fetchDeleteCategory } from "../../actions"
import { withBlogService, withErrorBoundary } from "../hoc"


const CategoriesForm = ({ categories, addCategory, blogService, deleteCategory }) => {
  const [state, setState] = useState({ category: '', categoryInput: '' })


  const handleSubmit = e => {
    e.preventDefault()
    const body = state.categoryInput
    addCategory(blogService, body)
    setState({ ...state, categoryInput: '' })
  }

  const handleDelete = id => {
    deleteCategory(blogService, id)
  }

  const handleChange = e => {
    setState({ ...state, categoryInput: e.target.value })
  }

  const handleValidate = () => {
    return categories.find(({ category }) => category === state.categoryInput)
  }

  return (
    <Fragment>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>category name</th>
        </tr>
        </thead>
        <tbody>
        {
          categories.map(({ category, id }) => (
            <tr key={ id }>
              <td> { id }</td>
              <td>{ category }</td>
              <td>
                <button onClick={ () => handleDelete(id) }>delete</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
      <form onSubmit={ handleSubmit }>
        <InputLabel >
          Add category:
        </InputLabel>
        <TextField
          placeholder="text here..."
          onChange={ handleChange }
          value={ state.categoryInput }
          variant="outlined"
          label="category"
          margin="dense"
        />
        <input type="submit" onSubmit={ handleSubmit } disabled={ !!handleValidate() }/>
      </form>
    </Fragment>
  )
}

CategoriesForm.propTypes = {
  category: PropTypes.array,
  addCategory: PropTypes.func.isRequired


}

export default compose(
  connect(
    state => ({ categories: categoriesSelector(state) }),
    {
      addCategory: fetchAddCategory,
      deleteCategory: fetchDeleteCategory
    }
  ),
  withErrorBoundary,
  withBlogService,
)(CategoriesForm)
