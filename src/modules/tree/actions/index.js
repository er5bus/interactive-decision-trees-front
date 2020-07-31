import { ACTIONS, ENDPOINT } from "./../constants"
import { CALL_API, HTTP_METHODS } from "./../../../constants"


export const fetchAllTags = () =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        success: ACTIONS.FETCH_ALL_TAGS_SUCCEDED,
        fail: ACTIONS.FETCH_ALL_TAGS_FAILED
      },
      endpoint: ENDPOINT.TAGS,
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })

export const fetchAllNodes = ({ param }) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        success: ACTIONS.FETCH_ALL_NODES_SUCCEDED,
        fail: ACTIONS.FETCH_ALL_NODES_FAILED
      },
      endpoint: ENDPOINT.TREE_ALL_NODES.replace(":param", param),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })


export const filterTrees = (payload) =>
  ({
    type: ACTIONS.FILTER_TREES,
    payload
  })


export const fetchTrees = (pageNum) => 
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_TREES_INIT,
        success: ACTIONS.FETCH_TREES_SUCCEDED,
        fail: ACTIONS.FETCH_TREES_FAILED
      },
      endpoint: ENDPOINT.TREES,
      method: HTTP_METHODS.GET,
      params: { page: pageNum },
      jwt: true
    }
  })


export const clearTreeForm = () =>
  ({
    type: ACTIONS.CLEAR_TREE_FORM,
    payload: {
      displayStyle: "BUTTON"
    }
  })


export const createTree = (payload) => 
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.CREATE_TREE_INIT,
        success: ACTIONS.CREATE_TREE_SUCCEDED,
        fail: ACTIONS.CREATE_TREE_FAILED 
      },
      messages: {
        success: "Your tree has been created successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.TREES,
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })


export const editTree = (param, payload) =>
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.EDIT_TREE_INIT,
        success: ACTIONS.EDIT_TREE_SUCCEDED,
        fail: ACTIONS.EDIT_TREE_FAILED
      },
      messages: {
        success: "Your tree has been updated successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.TREE.replace(":param", param),
      method: HTTP_METHODS.PUT,
      jwt: true
    }
  })


export const deleteTree = (param) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.DELETE_TREE_INIT,
        success: ACTIONS.DELETE_TREE_SUCCEDED,
        fail: ACTIONS.DELETE_TREE_FAILED
      },
      messages: {
        success: "Your tree has been deleted successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.TREE.replace(":param", param),
      extraData: { uid: param },
      method: HTTP_METHODS.DELETE,
      jwt: true
    }
  })


export const fetchTree = ({param}) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_TREE_INIT,
        success: ACTIONS.FETCH_TREE_SUCCEDED,
        fail: ACTIONS.FETCH_TREE_FAILED
      },
      endpoint: ENDPOINT.TREE.replace(":param", param),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })

