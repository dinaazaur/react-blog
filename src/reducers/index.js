import { combineReducers } from "redux"
import blogPosts from "./blog-posts"
import blogComments from "./blog-comments"
import filters from './filters'
import blogCategories from './blog-categories'
export default combineReducers({
  blogPosts,
  filters,
  blogComments,
  blogCategories
})