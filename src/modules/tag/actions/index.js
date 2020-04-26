import { ACTIONS, ENDPOINT } from "./../constants"
import { CALL_API, HTTP_METHODS } from "./../../../constants"


export const filterTags = (searchTerm) =>
  ({
    type: ACTIONS.FILTER_TAGS,
    payload: { searchTerm }
  })


export const fetchTags = (pageNum) => 
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_TAGS_INIT,
        success: ACTIONS.FETCH_TAGS_SUCCEDED,
        fail: ACTIONS.FETCH_TAGS_FAILED
      },
      endpoint: ENDPOINT.TAGS,
      method: HTTP_METHODS.GET,
      params: { page: pageNum },
      jwt: true
    }
  })


export const clearTagForm = () =>
  ({
    type: ACTIONS.CLEAR_TAG_FORM,
    payload: {
      display_style: "BUTTON"
    }
  })


export const createTag = (payload) => 
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.CREATE_TAG_INIT,
        success: ACTIONS.CREATE_TAG_SUCCEDED,
        fail: ACTIONS.CREATE_TAG_FAILED 
      },
      messages: {
        success: "Your tag has been created successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.TAGS,
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })


export const editTag = (param, payload) =>
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.EDIT_TAG_INIT,
        success: ACTIONS.EDIT_TAG_SUCCEDED,
        fail: ACTIONS.EDIT_TAG_FAILED
      },
      messages: {
        success: "Your tag has been updated successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.TAG.replace(":param", param),
      method: HTTP_METHODS.PUT,
      jwt: true
    }
  })


export const deleteTag = (param) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.DELETE_TAG_INIT,
        success: ACTIONS.DELETE_TAG_SUCCEDED,
        fail: ACTIONS.DELETE_TAG_FAILED
      },
      messages: {
        success: "Your tag has been deleted successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.TAG.replace(":param", param),
      extraData: { uid: param },
      method: HTTP_METHODS.DELETE,
      jwt: true
    }
  })


export const fetchTag = ({param}) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_TAG_INIT,
        success: ACTIONS.FETCH_TAG_SUCCEDED,
        fail: ACTIONS.FETCH_TAG_FAILED
      },
      endpoint: ENDPOINT.TAG.replace(":param", param),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })

