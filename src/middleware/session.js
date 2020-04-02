import { SAVE_SESSION } from "./../constants"
import { sessionService } from "redux-react-session"
import { browserHistory } from "react-router"


const session = store => next => action => {
  if (!action || action.type !== SAVE_SESSION ){
    return next(action)
  }
  
  const { access_token: accessToken, ...currentUser } = action.payload
  sessionService.saveUser(currentUser)
  sessionService.saveSession({accessToken})
}

export default session
