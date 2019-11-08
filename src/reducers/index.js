import { combineReducers } from "redux"
import blogPosts from "./blogPosts"
import incrementer from "./incrementer"
import blogComments from "./blogComments"

export default combineReducers({
  blogPosts,
  incrementer,
  blogComments
})