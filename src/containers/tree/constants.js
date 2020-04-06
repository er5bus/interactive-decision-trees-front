export const ACTIONS = {
  FETCH_TREES_INIT: "FETCH_TREES_INIT",
  FETCH_TREES_SUCCEDED: "FETCH_TREES_SUCCEDED",
  FETCH_TREES_FAILED: "FETCH_TREES_FAILED",

  CLEAR_TREE_FORM: "CLEAR_TREE_FORM",

  CREATE_TREE_INIT: "CREATE_TREE_INIT",
  CREATE_TREE_SUCCEDED: "CREATE_TREE_SUCCEDED",
  CREATE_TREE_FAILED: "CREATE_TREE_FAILED",

  FETCH_TREE_INIT: "FETCH_TREE_INIT",
  FETCH_TREE_SUCCEDED: "FETCH_TREE_SUCCEDED",
  FETCH_TREE_FAILED: "FETCH_TREE_FAILED",

  EDIT_TREE_INIT: "EDIT_TREE_INIT",
  EDIT_TREE_SUCCEDED: "EDIT_TREE_SUCCEDED",
  EDIT_TREE_FAILED: "EDIT_TREE_FAILED",

  DELETE_TREE_INIT: "DELETE_TREE_INIT",
  DELETE_TREE_SUCCEDED: "DELETE_TREE_SUCCEDED",
  DELETE_TREE_FAILED: "DELETE_TREE_FAILED"
}

export const ENDPOINT = {
  TREES: "/api/trees",
  TREE: "/api/tree/:param"
}
