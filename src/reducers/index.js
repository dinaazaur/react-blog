import { combineReducers } from "redux"
import blogPosts from "./blogPosts"
import incrementer from "./incrementer"
import blogComments from "./blogComments"
import filters from './filters'
export default combineReducers({
  blogPosts,
  filters,
  incrementer,
  blogComments
})