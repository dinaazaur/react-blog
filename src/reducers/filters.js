import { CHANGE_SELECTION, CHANGE_DAY_RANGE, FETCH_POST_DELETE, _SUCCESS } from '../constants'

const defaultState = {
  selected: [],
  range: {
    from: null,
    to: null
  }
}

export default (state = defaultState, action) => {
  const { type, payload } = action

  switch (type) {
    case CHANGE_SELECTION:
      return (
        payload.selected !== null ?
          { ...state, selected: [...state.selected, payload.selected] }
          : { ...state, selected: [] })

    case CHANGE_DAY_RANGE:
      return { ...state, range: payload.range }

    case FETCH_POST_DELETE + _SUCCESS:
      return { ...state, selected: state.selected.filter(item => item.value === payload.id) }
    default:
      return state
  }
} 