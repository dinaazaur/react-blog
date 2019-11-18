import { FETCH_COMMENTS, _SUCCESS, FETCH_ADD_COMMENT, FETCH_COMMENT_DELETE, SET_EDITABLE, FETCH_EDIT_COMMENT } from '../constants'
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
        .updateIn(['entities', payload.commentId, 'editable'], editable => !editable)

    case FETCH_COMMENTS + _SUCCESS:
    case FETCH_ADD_COMMENT + _SUCCESS:
      return state.mergeIn(['entities'], arrToMap(comments, recordedComments))

    case FETCH_EDIT_COMMENT + _SUCCESS:
      return state
        .setIn(['entities', payload.patchCommentId], comments)
        .update('editable', edit => !edit)
        .updateIn(['entities', payload.commentId, 'editable'], ed => !ed)

    default:
      return state
  }
}