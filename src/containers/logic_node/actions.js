import { ACTIONS, ENDPOINT } from "./constants"
import { CALL_API, HTTP_METHODS } from "./../../constants"


export const fetchAllScores = ({ treeparam }) => 
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_ALL_SCORES_INIT,
        success: ACTIONS.FETCH_ALL_SCORES_SUCCEDED,
        fail: ACTIONS.FETCH_ALL_SCORES_FAILED
      },
      endpoint: ENDPOINT.TREE_ALL_SCORE.replace(":treeparam", treeparam),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })


export const fetchAllNodes = ({ treeparam }) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_ALL_NODES_INIT,
        success: ACTIONS.FETCH_ALL_NODES_SUCCEDED,
        fail: ACTIONS.FETCH_ALL_NODES_FAILED
      },
      endpoint: ENDPOINT.TREE_ALL_NODES.replace(":treeparam", treeparam),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })


export const clearNodeForm = ({ param }) =>
  ({
    type: ACTIONS.CLEAR_NODE_FORM,
    payload: {}
  })


export const createNode = (treeparam, payload) => 
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.CREATE_NODE_INIT,
        success: ACTIONS.CREATE_NODE_SUCCEDED,
        fail: ACTIONS.CREATE_NODE_FAILED 
      },
      endpoint: ENDPOINT.NODES.replace(":treeparam", treeparam),
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })


export const editNode = ({ treeparam, nodeparam }, payload) =>
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.EDIT_NODE_INIT,
        success: ACTIONS.EDIT_NODE_SUCCEDED,
        fail: ACTIONS.EDIT_NODE_FAILED
      },
      endpoint: ENDPOINT.NODE.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      method: HTTP_METHODS.PUT,
      jwt: true
    }
  })


export const fetchNode = ({ treeparam, nodeparam }) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_NODE_INIT,
        success: ACTIONS.FETCH_NODE_SUCCEDED,
        fail: ACTIONS.FETCH_NODE_FAILED
      },
      endpoint: ENDPOINT.NODE.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })

