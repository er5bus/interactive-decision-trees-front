import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'



// middleware redux-thunk
import api from "./middleware/api"
import { deleteSession, saveSession } from "./middleware/session"

// reducers
import authReducer from "./containers/authentication/reducer"
import treeReducer from "./containers/tree/reducer"
import nodeReducer from "./containers/node/reducer"

import { reducer as formReducer } from 'redux-form'
import { sessionReducer } from 'redux-react-session'
import {reducer as notificationReducer} from 'react-notification-system-redux'

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  form: formReducer,
  tree: treeReducer,
  node: nodeReducer,
  notifications: notificationReducer
})

export default ( preloadedState = {} ) => {

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, deleteSession, saveSession)
  )

  return store
}
