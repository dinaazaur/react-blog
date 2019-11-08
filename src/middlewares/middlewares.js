import uuid from 'uuid'

export const randomId = store => next => action => {
  if(!action.generateId) return next(action)

  next({
    ...action,
    randomId: uuid.v4()
  })
}