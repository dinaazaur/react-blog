import { FETCH_COMMENTS, _SUCCESS, ADD_COMMENT, FETCH_COMMENT_DELETE, SET_EDITABLE, EDIT_COMMENT } from '../constants'
import { OrderedMap, Record } from "immutable"
import { arrToMap } from "../utis/arrToMap"

const recordedComments = Record({
  title: null,
  id: null,
  author: null,
  postId: null,
  text: null,
  date: null,
  editable: false
})

const defaultState = Record({
  entities: OrderedMap({}),
  editable: false
})

export default (state = defaultState(), action) => {
  const { type, comments, payload } = action

  switch (type) {
    case FETCH_COMMENT_DELETE + _SUCCESS:
      return state.deleteIn(['entities', payload.id])

    case SET_EDITABLE:
      return state
        .update('editable', edit => !edit)
        .updateIn(['entities', payload.commentId, 'editable'], ed => !ed)
    case FETCH_COMMENTS + _SUCCESS:
    case ADD_COMMENT + _SUCCESS:
      return state.mergeIn(['entities'], arrToMap(comments, recordedComments))

    case EDIT_COMMENT + _SUCCESS:
      console.log('---', payload.patchCommentId)
      return state.setIn(['entities', payload.patchCommentId], comments)

    default:
      return state
  }
}