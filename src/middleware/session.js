import { SAVE_SESSION, DELETE_SESSION } from "./../constants"
import { sessionService } from "redux-react-session"


export const saveSession = store => next => action => {
  if (!action || action.type !== SAVE_SESSION ){
    return next(action)
  }
  
  const { access_token: accessToken } = action.payload
  sessionService.saveUser(action.payload)
  sessionService.saveSession({accessToken})
}


export const deleteSession = store => next => action => {
  if (!action || action.type !== DELETE_SESSION ){
    return next(action)
  }
  
  sessionService.deleteUser()
  sessionService.deleteSession()
}
