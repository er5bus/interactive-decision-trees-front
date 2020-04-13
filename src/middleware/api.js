import { CALL_API } from "./../constants"
import makeCall from "./../utils/api"
import notif from 'react-notification-system-redux'
import { useHistory } from "react-router-dom"


const api = store => next => async action => {
  if (!action || action.type !== CALL_API ){
    return next(action)
  }

  const { actions, messages = {}, endpoint, method, jwt, params = {}, extraData={} } = action.meta
  const { user : { access_token: accessToken=null  } } = store.getState().session

  const dispatch = (action, payload = {}) => {
    if (!Array.isArray(action)) return next({type: action, payload})
    return action.map(a =>  next({type: a, payload}));
  }

  const createNotificationOpts = (title, message) => ({
    title,
    message,
    position: 'tr',
    autoDismiss: 0,
  })

  if (jwt && !accessToken){
    next(notif.error(createNotificationOpts("Oops!", "You are not logged in. Please log in and try again")))
    return;
  }

  if (actions.init){
    dispatch(actions.init, params)
  }

  let headers = {}
  if (jwt) {
    headers = { Authorization: `Bearer  ${accessToken}`}
  }

  makeCall(method, endpoint, action.payload, headers, params)
    .then( resp => {
      if (messages.success){
        next(notif.success(createNotificationOpts("Oh!", messages.success)))
      }
      dispatch(actions.success, Object.assign({}, resp.data, extraData ))

    })
    .catch(err => {
      if (messages.fail){
        next(notif.error(createNotificationOpts("Oops!", messages.fail)))
      }
      dispatch(actions.fail, ( err.response && err.response.data) || {})
    })
}


export default api
