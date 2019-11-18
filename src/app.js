import React, { Fragment, useEffect } from 'react'
import Header from "./components/header"
import Main from "./components/main"
import './index.scss'
import { Route, Switch } from 'react-router-dom'
import Form from './components/form'
import { withBlogService } from "./components/hoc"
import { connect } from "react-redux"
import { fetchCategories } from "./actions"
import Categories from './components/categories'
import PostPage from "./components/post-page"
import { postsLoadedSelector } from "./selectors"
import PostsPage from "./components/posts-page/posts-page"
import CategoriesForm from "./components/categories-form"

const App = ({ blogService, initialFetch, loaded }) => {
  useEffect(() => {
    initialFetch(blogService)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path="/" exact component={ Main }/>
        <Route path='/add' render={ () => <Form postForm/> }/>
        <Route path='/categories' component={ Categories }/>
        <Route path='/posts' exact component={ PostsPage }/>
        <Route path='/categoriesEdit' component={CategoriesForm}/>
        <Route path='/posts/:id' component={ PostPage }/>
        <Route render={ () => <h2>404 page not found</h2> }/>
      </Switch>
    </Fragment>
  )
}


export default connect(state => ({ loaded: postsLoadedSelector(state) }),
  { initialFetch: fetchCategories })(
  withBlogService(App))
