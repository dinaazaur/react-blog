import { FETCH_COMMENTS, _SUCCESS, _FAILURE } from '../constants'
import { OrderedMap, Record } from "immutable"
import { arrToMap } from "../utis/arrToMap"

const recordedComments = Record({
  title: null,
  id: null,
  author: null,
  postId: null,
  text: null
})

const defaultState = Record({
  entities: OrderedMap({}),
})

export default (state = defaultState(), action) => {
  const { type, comments } = action

  switch (type) {
    case FETCH_COMMENTS + _SUCCESS:
      return state
        .mergeIn(['entities'], arrToMap(comments, recordedComments))

    default:
      return state
  }
}