import {
  CHANGE_SELECTION,
  FETCH_COMMENTS,
  FETCH_POST_DELETE,
  FETCH_POSTS,
  FETCH_ADD_COMMENT, CHANGE_DAY_RANGE,
  FETCH_COMMENT_DELETE,
  SET_EDITABLE,
  FETCH_EDIT_COMMENT,
  FETCH_ADD_POST,
  FETCH_EDIT_POST,
  FETCH_CATEGORIES,
  CATEGORY_SELECT,
  FETCH_CATEGORIZED_POSTS,
  FETCH_POST,
  ADD_SINGLE_LOADED_POST,
  ADD_LOADED_CATEGORY,
  SET_EDITABLE_POST,
  FETCH_ADD_CATEGORY,
  FETCH_CATEGORY_DELETE
} from "../constants"
import uuid from 'uuid'

// todo manage actions's to categorized folders

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

export const fetchFiltratedPosts = (blogService, category) => ({
  type: FETCH_CATEGORIZED_POSTS,
  callAPI: category,
  blogService,
  data: 'posts',
  serviceRequest: 'getCategorizedPosts'
})

export const fetchPost = (blogService, postId) => ({
  type: FETCH_POST,
  callAPI: postId,
  blogService,
  data: 'posts',
  payload: { postId },
  serviceRequest: 'getPost'
})

export const fetchPosts = blogService => ({
  type: FETCH_POSTS,
  callAPI: 'posts',
  blogService,
  data: 'posts',
  serviceRequest: 'get'
})

export const fetchCategories = blogService => ({
  type: FETCH_CATEGORIES,
  callAPI: 'categories',
  blogService,
  data: 'categories',
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

export const fetchDeleteItem = (blogService, id, postId = null, type = 'posts', comments = null) => dispatch => {
  dispatch({
    type: type === 'posts' ? FETCH_POST_DELETE : FETCH_COMMENT_DELETE,
    payload: { id, postId },
    serviceRequest: 'delete',
    callAPI: `${ type }/${ id }`,
    blogService,
  })

  if (comments) {
    blogService.addCommentIdToPost(postId, comments.filter(comment => comment !== id))
      .catch(e => console.log('---', e.message))
  }
}

const createBody = (body, id, patch, post = false) => {
  return !patch ? {
    ...body,
    id,
    date: post ? body.date : new Date()
  } : { ...body }
}

const addCommentIdToToPost = (getState, postId, randomId, blogService) => {
  const commentsIds = getState().blogPosts.getIn(['entities', postId, 'comments'])
  commentsIds.push(randomId)
  blogService.addCommentIdToPost(postId, commentsIds)
    .catch(e => console.log(e.message))
}
// todo create function to add patch items ^^

export const addPatchComment = (blogService, body, postId, patch, patchCommentId) => (dispatch, getState) => {
  const type = patch ? FETCH_EDIT_COMMENT : FETCH_ADD_COMMENT
  const randomId = uuid.v4()
  const bodyWithGeneratedId = createBody(body, randomId, patch)

  dispatch({
    type: type,
    payload: { postId, patchCommentId },
    data: 'comments',
    serviceRequest: patch ? 'patchItem' : 'postItem',
    arrayAble: !patch,
    callAPI: patchCommentId || bodyWithGeneratedId,
    blogService,
    additionAPI: bodyWithGeneratedId
  })

  if (!patch) {
    addCommentIdToToPost(getState, postId, randomId, blogService)
  }
}

export const addPatchPost = (blogService, body, patch, patchPostId) => dispatch => {
  const type = patch ? FETCH_EDIT_POST : FETCH_ADD_POST
  const postId = uuid.v4()
  const bodyWithId = createBody(body, postId, patch, true)
  dispatch({
    type: type,
    payload: { patchPostId, postId },
    data: 'posts',
    serviceRequest: patch ? 'patchItem' : 'postItem',
    arrayAble: !patch,
    callAPI: patchPostId || { ...bodyWithId, comments: [] },
    blogService,
    additionAPI: { ...bodyWithId, comments: [] }
  })
}

export const selectedCategory = category => ({
  type: CATEGORY_SELECT,
  payload: { category }
})

export const addLoadedCategory = category => ({
  type: ADD_LOADED_CATEGORY,
  payload: { category }
})

export const fetchAddCategory = (blogService, categories) => dispatch => {
  const body = { id: uuid.v4(), category: categories }

  dispatch({
    type: FETCH_ADD_CATEGORY,
    data: 'categories',
    serviceRequest: 'postItem',
    callAPI: body,
    additionAPI: null,
    blogService
  })
}

export const fetchDeleteCategory = (blogService, id) => ({
  type: FETCH_CATEGORY_DELETE,
  payload: { id },
  serviceRequest: 'delete',
  callAPI: `categories/${ id }`,
  blogService,
})


export const addSingleLoadedPost = postId => ({
  type: ADD_SINGLE_LOADED_POST,
  payload: { postId }
})

export const setEditablePost = () => ({
  type: SET_EDITABLE_POST
})