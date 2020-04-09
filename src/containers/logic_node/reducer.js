import { ACTIONS } from "./constants"


export default (state = { item: null, scores: [], nodes: [], isLoading: false, error: null, success: null }, action) => {
  
  const { payload, type } = action
  
  switch (type) {
    case ACTIONS.FETCH_ALL_SCORES_INIT: {
      return { ...state, isLoading: true, scores: [] }
    }
    case ACTIONS.FETCH_ALL_SCORES_SUCCEDED: {
      return { ...state, isLoading: false, scores: payload.items }
    }
    case ACTIONS.FETCH_ALL_SCORES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FETCH_ALL_NODES_INIT: {
      return { ...state, isLoading: true, scores: [] }
    }
    case ACTIONS.FETCH_ALL_NODES_SUCCEDED: {
      return { ...state, isLoading: false, nodes: payload.items }
    }
    case ACTIONS.FETCH_ALL_NODES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.CLEAR_NODE_FORM : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    
    case ACTIONS.CREATE_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_NODE_SUCCEDED : {
      return { ...state, items: state.items.concat(payload), isLoading: false, error: null }
    }
    case ACTIONS.CREATE_NODE_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.FETCH_NODE_INIT : {
      return { ...state, isLoading: true, item: null, error: null }
    }
    case ACTIONS.FETCH_NODE_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_NODE_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    default: {
      return state
    }
  }
}
