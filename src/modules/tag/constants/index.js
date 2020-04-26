export const ACTIONS = {
  FETCH_TAGS_INIT: "FETCH_TAGS_INIT",
  FETCH_TAGS_SUCCEDED: "FETCH_TAGS_SUCCEDED",
  FETCH_TAGS_FAILED: "FETCH_TAGS_FAILED",

  CLEAR_TAG_FORM: "CLEAR_TAG_FORM",

  CREATE_TAG_INIT: "CREATE_TAG_INIT",
  CREATE_TAG_SUCCEDED: "CREATE_TAG_SUCCEDED",
  CREATE_TAG_FAILED: "CREATE_TAG_FAILED",

  FETCH_TAG_INIT: "FETCH_TAG_INIT",
  FETCH_TAG_SUCCEDED: "FETCH_TAG_SUCCEDED",
  FETCH_TAG_FAILED: "FETCH_TAG_FAILED",

  EDIT_TAG_INIT: "EDIT_TAG_INIT",
  EDIT_TAG_SUCCEDED: "EDIT_TAG_SUCCEDED",
  EDIT_TAG_FAILED: "EDIT_TAG_FAILED",

  DELETE_TAG_INIT: "DELETE_TAG_INIT",
  DELETE_TAG_SUCCEDED: "DELETE_TAG_SUCCEDED",
  DELETE_TAG_FAILED: "DELETE_TAG_FAILED",

  FILTER_TAGS: "FILTER_TAGS"
}

export const ENDPOINT = {
  TAGS: "/api/tags",
  TAG: "/api/tag/:param"
}