import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { api, randomId } from "../middlewares"

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, api, randomId),
  // other store enhancers if any
);

export default createStore(reducer, enhancer)