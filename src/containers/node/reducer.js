import { ACTIONS } from "./constants"


export default (state = { item: {}, isLoading: false, error: null, success: null }, action) => {
  
  const { payload, type } = action
  
  switch (type) {
    case ACTIONS.FETCH_NODES_INIT : {
      return { ...state, isLoading: true, item: {}, error: null }
    }
    case ACTIONS.FETCH_NODES_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_NODES_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.DELETE_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.DELETE_NODE_SUCCEDED : {
      return { ...state, items: state.items.filter( item => item.uid !== payload.uid ), isLoading: false, error: null }
    }
    case ACTIONS.DELETE_NODE_FAILED : {
      return { ...state, isLoading: false, error: null }
    }

    default: {
      return state
    }
  }
}
