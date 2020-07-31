import { ACTIONS, ENDPOINT, NODE_TYPE } from "./../constants"
import { CALL_API, HTTP_METHODS } from "./../../../constants"


export const clearNodes = () =>
  ({
    type: ACTIONS.CLEAR_NODES
  })


export const filterNodes = (searchTerm) =>
  ({
    type: ACTIONS.FILTER_NODES,
    payload: { searchTerm }
  })


export const fetchAllScores = ({ treeparam }) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
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


export const fetchAllTrees = () =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_ALL_TREES_INIT,
        success: ACTIONS.FETCH_ALL_TREES_SUCCEDED,
        fail: ACTIONS.FETCH_ALL_TREES_FAILED
      },
      endpoint: ENDPOINT.ALL_TREES,
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })


export const clearNodeForm = (data = {}) =>
  ({
    type: ACTIONS.CLEAR_NODE_FORM,
    payload: { data }
  })


const createNode = (treeparam, payload, endpoint) =>
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.CREATE_NODE_INIT,
        success: ACTIONS.CREATE_NODE_SUCCEDED,
        fail: ACTIONS.CREATE_NODE_FAILED
      },
      messages: {
        success: "A new node has been created successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: endpoint.replace(":treeparam", treeparam),
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })


export const setFirstNode = ({ treeparam, nodeparam }) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.SET_FIRST_NODE_INIT,
        success: ACTIONS.SET_FIRST_NODE_SUCCEDED,
        fail: ACTIONS.SET_FIRST_NODE_FAILED
      },
      messages: {
        success: "Your node has been updated successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.FIRST_NODE.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })


export const setLastNode = ({ treeparam, nodeparam }) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.SET_LAST_NODE_INIT,
        success: ACTIONS.SET_LAST_NODE_SUCCEDED,
        fail: ACTIONS.SET_LAST_NODE_FAILED
      },
      messages: {
        success: "Your node has been updated successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: ENDPOINT.LAST_NODE.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      method: HTTP_METHODS.POST,
      jwt: true
    }
  })


export const createContentNode = (treeparam, payload) => createNode(treeparam, payload, ENDPOINT.CONTENT_NODES)
export const createLogicNode = (treeparam, payload) => createNode(treeparam, payload, ENDPOINT.LOGIC_NODES)


const editNode = ({ treeparam, nodeparam }, payload, endpoint) =>
  ({
    type: CALL_API,
    payload,
    meta: {
      actions: {
        init: ACTIONS.EDIT_NODE_INIT,
        success: ACTIONS.EDIT_NODE_SUCCEDED,
        fail: ACTIONS.EDIT_NODE_FAILED
      },
      messages: {
        success: "Your node has been updated successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: endpoint.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      method: HTTP_METHODS.PUT,
      jwt: true
    }
  })


export const editLogicNode = ({ treeparam, nodeparam }, payload) => editNode({ treeparam, nodeparam }, payload, ENDPOINT.LOGIC_NODE)
export const editContentNode = ({ treeparam, nodeparam }, payload) => editNode({ treeparam, nodeparam }, payload, ENDPOINT.CONTENT_NODE)


const fetchNode = ({ treeparam, nodeparam }, endpoint) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_NODE_INIT,
        success: ACTIONS.FETCH_NODE_SUCCEDED,
        fail: ACTIONS.FETCH_NODE_FAILED
      },
      endpoint: endpoint.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })


export const fetchTree = ({param}) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        success: ACTIONS.FETCH_CURRENT_TREE_SUCCEDED,
        fail: ACTIONS.FETCH_CURRENT_TREE_FAILED
      },
      endpoint: ENDPOINT.TREE.replace(":param", param),
      method: HTTP_METHODS.GET,
      jwt: true
    }
  })


export const fetchLogicNode = ({ treeparam, nodeparam }) => fetchNode({ treeparam, nodeparam }, ENDPOINT.LOGIC_NODE)
export const fetchContentNode = ({ treeparam, nodeparam }) => fetchNode({ treeparam, nodeparam }, ENDPOINT.CONTENT_NODE)


export const viewNode = ({ treeparam, nodeparam }) =>
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


const deleteNodeBase = ({ treeparam, nodeparam }, endpoint, nodeType) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.DELETE_NODE_INIT,
        success: ACTIONS.DELETE_NODE_SUCCEDED,
        fail: ACTIONS.DELETE_NODE_FAILED
      },
      messages: {
        success: "Your node has been deleted successfuly",
        fail: "Something went wrong please try again"
      },
      endpoint: endpoint.replace(":treeparam", treeparam).replace(":nodeparam", nodeparam),
      extraData: { uid: nodeparam, nodeType },
      method: HTTP_METHODS.DELETE,
      jwt: true
    }
  })


const deleteLogicNode = ({ treeparam, nodeparam }) => deleteNodeBase({ treeparam, nodeparam }, ENDPOINT.LOGIC_NODE, NODE_TYPE.LOGIC_NODE)
const deleteContentNode = ({ treeparam, nodeparam }) => deleteNodeBase({ treeparam, nodeparam }, ENDPOINT.CONTENT_NODE, NODE_TYPE.CONTENT_NODE)

export const deleteNode = ({ treeparam, nodeparam, nodeType }) => {
  if (nodeType === NODE_TYPE.CONTENT_NODE){
      return deleteContentNode({ treeparam, nodeparam })
    }
    if (nodeType === NODE_TYPE.LOGIC_NODE){
      return deleteLogicNode({ treeparam, nodeparam })
    }
}


export const fetchNodes = ({ param, pageNumber }) => 
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.FETCH_NODES_INIT,
        success: ACTIONS.FETCH_NODES_SUCCEDED,
        fail: ACTIONS.FETCH_NODES_FAILED
      },
      endpoint: ENDPOINT.NODES.replace(":treeparam", param),
      method: HTTP_METHODS.GET,
      params: { page: pageNumber },
      jwt: true
    }
  })
