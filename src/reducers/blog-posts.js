import {
  _FAILURE,
  _REQUEST,
  _SUCCESS, ADD_SINGLE_LOADED_POST,
  FETCH_ADD_COMMENT, FETCH_ADD_POST, FETCH_CATEGORIZED_POSTS, FETCH_CATEGORY_DELETE,
  FETCH_COMMENT_DELETE,
  FETCH_COMMENTS, FETCH_EDIT_POST, FETCH_POST,
  FETCH_POST_DELETE,
  FETCH_POSTS, SET_EDITABLE_POST
} from '../constants'
import { Record } from 'immutable'
import { arrToMap } from "../utis/arrToMap"

const PostsRecord = Record({
  id: null,
  text: null,
  author: null,
  title: null,
  category: null,
  date: null,
  editable: false,
  comments: [],
  categoriesId: null,
  commentsLoading: false,
  commentsLoaded: false
})

const defaultState = Record({
  entities: arrToMap([], PostsRecord),
  hasError: false,
  loading: false,
  loaded: false,
  loadedSinglePosts: [],
  editablePost: false
})

export default (state = defaultState(), action) => {
  const { type, payload, posts } = action
  switch (type) {
    case FETCH_POSTS + _REQUEST:
    case FETCH_CATEGORIZED_POSTS + _REQUEST:
    case FETCH_POST + _REQUEST:
      return state.set('loading', true)

    case FETCH_POSTS + _SUCCESS:
    case FETCH_ADD_POST + _SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap(posts, PostsRecord))
        .set('loading', false)
        .set('loaded', true)

    case FETCH_POST + _SUCCESS:
    case FETCH_CATEGORIZED_POSTS + _SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap(posts, PostsRecord))
        .set('loading', false)

    case FETCH_ADD_POST + _FAILURE:
    case FETCH_POSTS + _FAILURE:
    case FETCH_CATEGORIZED_POSTS + _FAILURE:
    case FETCH_POST + _FAILURE:
      return state.set('hasError', true)

    case FETCH_EDIT_POST + _SUCCESS:
      return state
        .setIn(['entities', payload.patchPostId], posts)
        .updateIn(['entities', payload.patchPostId, 'editable'], editable => !editable)

    case FETCH_POST_DELETE + _SUCCESS:
      return state.deleteIn(['entities',payload.id])

    case FETCH_CATEGORY_DELETE + _SUCCESS:
      return state.update('entities',
        entity => entity.filter((e, v) => v.categoriesId === payload.id))

    case ADD_SINGLE_LOADED_POST:
      return state.update('loadedSinglePosts', loadedPosts => {
        return [...loadedPosts, payload.postId]
      })

    case SET_EDITABLE_POST:
      return state.update('editablePost', editablePost => !editablePost)


    // ====== comments logic
    case FETCH_COMMENT_DELETE + _SUCCESS:
      return state.updateIn(['entities', payload.postId, 'comments'],
          comments => comments.filter(comment => comment !== payload.id))

    case FETCH_COMMENTS + _REQUEST:
    case FETCH_ADD_COMMENT + _REQUEST:
      return state.setIn(
        ['entities', payload.postId, 'commentsLoading'], true)

    case FETCH_COMMENTS + _SUCCESS:
    case FETCH_ADD_COMMENT + _SUCCESS:
      return state
        .setIn(['entities', payload.postId, 'commentsLoading'], false)
        .setIn(['entities', payload.postId, 'commentsLoaded'], true)


    default:
      return state
  }
}