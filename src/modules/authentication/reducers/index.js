import { ACTIONS } from "./../constants"


export default (state = { currentUser: null, accessToken: null, isLoading: false, error: null }, action) => {
  const { payload, type } = action
  switch (type) {
    case ACTIONS.ACCOUNT_LOGIN_INIT : {
      return { ...state, isLoading: true, currentUser: null, accessToken: null, error: null }
    }
    case ACTIONS.ACCOUNT_LOGIN_SUCCEDED : {
      const { access_token: accessToken, ...currentUser } = payload
      return { ...state, currentUser, accessToken, isLoading: false, error: null }
    }
    case ACTIONS.ACCOUNT_LOGIN_FAILED : {
      return { ...state, error: payload, isLoading: false, currentUser: null, accessToken: null }
    }

    case ACTIONS.CREATE_ACCOUNT_INIT : {
      return { ...state, isLoading: true, currentUser: null, accessToken: null, error: null }
    }
    case ACTIONS.CREATE_ACCOUNT_SUCCEDED : {
      const { access_token: accessToken, ...currentUser } = payload
      return { ...state, currentUser, accessToken, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_ACCOUNT_FAILED : {
      return { ...state, error: payload, isLoading: false, currentUser: null, accessToken: null }
    }

    default: {
      return state
    }
  }
}
