import { ACTIONS, ENDPOINT } from "./../constants"
import { CALL_API, HTTP_METHODS, SAVE_SESSION, DELETE_SESSION } from "./../../../constants"


export const login = (payload) =>
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.ACCOUNT_LOGIN_INIT,
        success: [SAVE_SESSION, ACTIONS.ACCOUNT_LOGIN_SUCCEDED],
        fail: ACTIONS.ACCOUNT_LOGIN_FAILED
      },
      endpoint: ENDPOINT.LOGIN,
      method: HTTP_METHODS.POST
    }
  })


export const register = (payload) => 
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.CREATE_ACCOUNT_INIT,
        success: [SAVE_SESSION, ACTIONS.CREATE_ACCOUNT_SUCCEDED],
        fail: ACTIONS.CREATE_ACCOUNT_FAILED
      },
      endpoint: ENDPOINT.REGISTER,
      method: HTTP_METHODS.POST
    }
  })


export const logout = () =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.ACCOUNT_LOGOUT_INIT,
        success: [DELETE_SESSION, ACTIONS.ACCOUNT_LOGOUT_SUCCEDED],
        fail: ACTIONS.ACCOUNT_LOGOUT_FAILED
      },
      endpoint: ENDPOINT.LOGOUT,
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })
