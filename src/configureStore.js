import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { sessionReducer } from 'redux-react-session'


// middleware redux-thunk
import api from "./middleware/api"
import { deleteSession, saveSession } from "./middleware/session"

// reducers
import authReducer from "./containers/authentication/reducer"
import treeReducer from "./containers/tree/reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  form: formReducer,
  tree: treeReducer
})

export default ( preloadedState = {} ) => {

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, deleteSession, saveSession)
  )

  return store
}
