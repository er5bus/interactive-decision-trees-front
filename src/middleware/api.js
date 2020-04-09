import { CALL_API } from "./../constants"
import makeCall from "./../utils/api"


export const api = store => next => async action => {
  if (!action || action.type !== CALL_API ){
    return next(action)
  }

  const { actions, endpoint, method, jwt, params, extraData={} } = action.meta
  const { user : { access_token: accessToken=null  } } = store.getState().session

  const dispatch = (action, payload = {}) => {
    if (!Array.isArray(action)) return next({type: action, payload})
    return action.map(a => store.dispatch({type: a, payload}));
  }
  
  if (jwt && !accessToken){
    return dispatch(actions.fail, { error: "Invalid access token" })
  }
 
  if (actions.init){
    dispatch(actions.init)
  }

  let headers = {}
  if (jwt) {
    headers = { Authorization: `Bearer  ${accessToken}`}
  }
  
  makeCall(method, endpoint, action.payload, headers, params)
    .then( resp => dispatch(actions.success, Object.assign({}, resp.data, extraData )))
    .catch(err => dispatch(actions.fail, ( err.response && err.response.data) || {}))
}


export default api
