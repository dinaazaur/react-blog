import {
  CHANGE_SELECTION,
  FETCH_COMMENTS,
  FETCH_POST_DELETE,
  FETCH_POSTS,
  ADD_COMMENT, CHANGE_DAY_RANGE,
  FETCH_COMMENT_DELETE,
  SET_EDITABLE,
  EDIT_COMMENT,
  FETCH_ADD_POST
} from "../constants"
import uuid from 'uuid'

export const onFilterDateChange = (range) => ({
  type: CHANGE_DAY_RANGE,
  payload: { range }
})

export const setEditable = (commentId) => ({
  type: SET_EDITABLE,
  payload: { commentId }
})

export const changeSelection = (selected) => ({
  type: CHANGE_SELECTION,
  payload: { selected }
})

export const fetchPosts = (blogService) => ({
  type: FETCH_POSTS,
  callAPI: 'posts',
  blogService,
  data: 'posts',
  serviceRequest: 'get'
})

export const fetchComments = (blogService, postId) => ({
  type: FETCH_COMMENTS,
  callAPI: postId,
  blogService,
  data: 'comments',
  serviceRequest: 'getComments',
  payload: { postId },
})

export const fetchDeleteItem = (blogService, id, postId = null, type = 'post', comments = null) => dispatch => {
  dispatch({
    type: type === 'post' ? FETCH_POST_DELETE : FETCH_COMMENT_DELETE,
    payload: { id, postId },
    serviceRequest: 'delete',
    callAPI: `${type}/${id}`,
    blogService,
  })

  if (comments) {
    blogService.addCommentIdToPost(postId, comments.filter(comment => comment !== id))
      .catch(e => console.log('---', e.message))
  }
}

const createBody = (body, id, patch) => {
  return !patch ? {
    ...body,
    id,
    date: new Date()
  } : { ...body }
}

const addCommentIdToToPost = (getState, postId, randomId, blogService) => {
  const commentsIds = getState().blogPosts.getIn(['entities', postId, 'comments'])
  commentsIds.push(randomId)
  blogService.addCommentIdToPost(postId,commentsIds)
    .catch(e => console.log(e.message))
}

export const addPatchComment = (blogService, body, postId, patch, patchCommentId) => (dispatch, getState) => {
  const type = patch ? EDIT_COMMENT : ADD_COMMENT
  const randomId = uuid.v4()

  const bodyWithGeneratedId = createBody(body, randomId, patch)
  dispatch({
    type: type,
    payload: { postId, patchCommentId },
    comments: patch ? bodyWithGeneratedId : [bodyWithGeneratedId],
    serviceRequest: patch ? 'patchComment' : 'postComment',
    callAPI: bodyWithGeneratedId,
    blogService,
    additionAPI: patchCommentId
  })

  if (!patch) {
    addCommentIdToToPost(getState, postId, randomId, blogService)
  }
}

