import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'



// middleware redux-thunk
import api from "./middleware/api"
import { deleteSession, saveSession } from "./middleware/session"

// reducers
import authReducer from "./modules/authentication/reducers"
import treeReducer from "./modules/tree/reducers"
import nodeReducer from "./modules/node/reducers"
import tagReducer from "./modules/tag/reducers"

import { reducer as formReducer } from 'redux-form'
import { sessionReducer } from 'redux-react-session'
import {reducer as notificationReducer} from 'react-notification-system-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  form: formReducer,
  tree: treeReducer,
  node: nodeReducer,
  tag: tagReducer,
  notifications: notificationReducer
})

export default ( preloadedState = {} ) => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, api, deleteSession, saveSession))
  )

  return store
}
