import { _FAILURE, _REQUEST, _SUCCESS } from "../constants"


export const api = store => next => action => {
  const { dispatch } = store
  const { callAPI, additionAPI, type, payload, data, arrayAble,  blogService, serviceRequest } = action
  if (!callAPI)
    return next(action)

  dispatch({
    type: type + _REQUEST,
    payload,
  })

  blogService[serviceRequest](callAPI, additionAPI, data)
    .then(res => dispatch({
        type: type + _SUCCESS,
        payload,
        [data]: arrayAble ? [ res.data ] : res.data,
      }))
    .catch(() => {
      dispatch({
        type: type + _FAILURE,
      })
    })

}