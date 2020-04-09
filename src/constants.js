export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
export const CALL_API = "CALL_API"
export const SAVE_SESSION = "SAVE_SESSION"
export const DELETE_SESSION = "DELETE_SESSION"


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


export const ROUTES = {
  AUTH : {
    MAIN_PATH: "/auth",
    LOGIN: "/login",
    REGISTER: "/register"
  },
  USER : {
    MAIN_PATH: "/user",
    TREE_INDEX: "/tree",
    TREE_NEW: "/tree/new/",
    TREE_EDIT: "/tree/:param/edit",
    TREE_VIEW: "/tree/:param/nodes",
    TREE_NEW_CONTENT_NODE: "/tree/:treeparam/new/content-node",
    TREE_NEW_LOGIC_NODE: "/tree/:treeparam/new/logic-node",
    TREE_EDIT_CONTENT_NODE: "/tree/:treeparam/edit/:nodeparam/content-node",
    TREE_EDIT_LOGIC_NODE: "/tree/:treeparam/edit/:nodeparam/logic-node",
    TREE_VIEW_CONTENT_NODE: "/tree/:treeparam/view/:nodeparam/content-node",
    TREE_VIEW_LOGIC_NODE: "/tree/:treeparam/view/:nodeparam/logic-node",

  }
}
