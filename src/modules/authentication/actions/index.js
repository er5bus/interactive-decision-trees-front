import { ACTIONS, ENDPOINT } from "./../constants"
import { CALL_API, HTTP_METHODS, SAVE_SESSION, DELETE_SESSION } from "./../../../constants"


export const clearError = () => ({
  type: ACTIONS.CLEAR_ERRORS
})


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
      messages: {
        success: "Welcome back.",
        fail: "Invalid email or password."
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
      messages: {
        success: "Welcome to your account",
        fail: "Something went wrong please try again"
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
      messages: {
        success: "You've been logged out successfully",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.LOGOUT,
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })
