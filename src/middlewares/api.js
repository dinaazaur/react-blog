import BlogService from "../blog-service"
import { _FAILURE, _REQUEST, _SUCCESS } from "../constants"

const blogService = new BlogService()

export const api = store => next => action => {
  const { dispatch, ...rest } = store
  const { callAPI, type } = action
  if (!callAPI) return next(action)

  dispatch({
    type: type + _REQUEST,
    loading: true,
    rest
  })

  blogService.get(callAPI)
    .then(res => {
      dispatch({
        type: type + _SUCCESS,
        posts: res.data,
        rest
      })
    })
    .catch(e => {
      dispatch({
        type: type + _FAILURE,
        rest
      })
    })

}