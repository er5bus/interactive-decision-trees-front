import { ACTIONS, ENDPOINT } from "./constants"
import { CALL_API, HTTP_METHODS } from "./../../constants"


export const deleteNode = (param) =>
  ({
    type: CALL_API,
    meta: {
      actions: {
        init: ACTIONS.DELETE_NODE_INIT,
        success: ACTIONS.DELETE_NODE_SUCCEDED,
        fail: ACTIONS.DELETE_NODE_FAILED
      },
      endpoint: ENDPOINT.NODE.replace(":param", param),
      extraData: { uid: param },
      method: HTTP_METHODS.DELETE,
      jwt: true
    }
  })


export const fetchNodes = ({ param }) => 
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
      jwt: true
    }
  })
