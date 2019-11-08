import { _FAILURE, _REQUEST, _SUCCESS, FETCH_COMMENTS, FETCH_POST_DELETE, FETCH_POSTS } from "../constants"


export const fetchPosts = () => ({
  type: FETCH_POSTS,
  callAPI: 'posts'
})


export const fetchDeletePost = (blogService, id) => dispatch => {
  blogService.delete(/*`posts/${id}`*/'dummyDelete')  // todo Dummy delete, change to real
    .catch(e =>
      dispatch({
        type: FETCH_POST_DELETE + _FAILURE,
        hasError: true
      }))

  dispatch({
    type: FETCH_POST_DELETE,
    payload: { id }
  })
}

export const fetchComments = (blogService, postId) => dispatch => {
  dispatch({
    type: FETCH_COMMENTS + _REQUEST,
    payload: { postId },
  })
  blogService.getComments(postId)
    .then(res => {
      const comments = res.data
      dispatch({
        type: FETCH_COMMENTS + _SUCCESS,
        payload: { postId },
        comments
      })
    })
    .catch(e => {
      dispatch({
        type: FETCH_COMMENTS + _FAILURE,
        payload: { postId },
        hasError: true
      })
    })
}

