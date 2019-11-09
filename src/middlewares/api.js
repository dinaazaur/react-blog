import { _FAILURE, _REQUEST, _SUCCESS } from "../constants"


export const api = store => next => action => {
  const { dispatch} = store
  const { callAPI, additionAPI, type, payload, data, blogService, serviceRequest, comments } = action

  if (!callAPI) return next(action)
  dispatch({
    type: type + _REQUEST,
    loading: true,
    payload,
  })

  blogService[serviceRequest](callAPI, additionAPI)
    .then(res => dispatch({
        type: type + _SUCCESS,
        payload,
        [data]: res.data,
        [data ? null : 'comments']: comments
      }))
    .catch(() => {
      dispatch({
        type: type + _FAILURE,
      })
    })

}