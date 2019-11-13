import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import { connect } from "react-redux"
import { postsListSelector, selectedSelector } from "../../selectors"
import { changeSelection } from "../../actions"
import { NavLink } from 'react-router-dom'
import { Add as AddIcon } from "@material-ui/icons"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "space-between"
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '50px'
  },
  pos: {
    position: "initial"
  },
  wrapper: {
    display: "flex",
    alignItems: "center"
  },
  search: {
    width: '300px ',
    color: 'black',
  },
  add: {
    textDecoration: 'none'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
  },
  categoryLink: {
    color: 'white',
    textDecoration: "none",
  },
  categoryBtn: {
    fontSize: "1.1rem",
    marginLeft: theme.spacing(9)
  }
}))

const Header = ({ posts, onSelect, selected }) => {
  const classes = useStyles()
  const options = () => {
    return posts.map(({ id, title }) => ({
      value: id,
      label: title
    }))
  }
  const handleSelect = (selected) => {
    onSelect(selected)
  }

  return (
    <header>
      <AppBar className={ classes.pos }>
        <Toolbar className={ classes.root }>
          <div className={ classes.wrapper }>
            <Typography className={ classes.title } component={ NavLink } to="/" variant="h6" noWrap>
              Some awesome blog
            </Typography>
            <Select
              className={ classes.search }
              options={ options() }
              value={ selected }
              isClearable
              onChange={ handleSelect }
              placeholder="Search…"
              classes={ {
                input: classes.inputInput,
              } }
            />
          <Button className={ classes.categoryBtn } variant="outlined">
            <NavLink to='/categories' className={ classes.categoryLink }>Categories</NavLink>
          </Button>
          <Button className={ classes.categoryBtn } variant="outlined">
            <NavLink to='/categoriesEdit' className={ classes.categoryLink }>Edit Categories</NavLink>
          </Button>
          </div>
          <NavLink to='/add' className={ classes.add }>
          <Button variant="contained">

              Add post
              <AddIcon/>
          </Button>
            </NavLink>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default connect(
  state => ({
    posts: postsListSelector(state),
    selected: selectedSelector(state)
  }),
  { onSelect: changeSelection }
)(Header)