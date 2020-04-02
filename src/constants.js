export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
export const CALL_API = "CALL_API"
export const SAVE_SESSION = "SAVE_SESSION"

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
}


export const INIT_STATE = {
  auth: {currentUser: null, accessToken: null, isLoading: false, error: null},
  form: {}
}
