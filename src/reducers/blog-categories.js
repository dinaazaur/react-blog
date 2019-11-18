import {
  _REQUEST,
  _SUCCESS,
  ADD_LOADED_CATEGORY,
  CATEGORY_SELECT,
  FETCH_ADD_CATEGORY,
  FETCH_CATEGORIES, FETCH_CATEGORY_DELETE
} from '../constants'

const initialState = {
  categories: [],
  selectedCategory: '',
  loaded: ['none'],
  loading: false
}

export default (state = initialState, action) => {
  const { type, categories, payload } = action

    // todo add some error catcher
  switch (type) {

    case FETCH_CATEGORIES + _REQUEST:
    case FETCH_ADD_CATEGORY + _REQUEST:
      return { ...state, loading: true }

    case FETCH_CATEGORIES + _SUCCESS:
      return { ...state, categories, loading: false }

    case FETCH_ADD_CATEGORY + _SUCCESS:
      return { ...state, categories: [...state.categories, categories], loading: false }

    case CATEGORY_SELECT:
      return { ...state, selectedCategory: payload.category }

    case FETCH_CATEGORY_DELETE + _SUCCESS:
      const res = state.categories.filter(category => category.id !== payload.id)
      return { ...state, categories: res }

    case ADD_LOADED_CATEGORY:
      return { ...state, loaded: [...state.loaded, payload.category] }

    default:
      return state
  }
}