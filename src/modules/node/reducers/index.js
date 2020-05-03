import { ACTIONS } from "./../constants"


export default (state = { items: [], tree: null, item: null, hasMore: true, isLoading: false, error: null, searchTerm: "", success: false }, action) => {
  
  const { payload, type } = action
  
  switch (type) {
    case ACTIONS.FETCH_NODES_INIT : {
      state.tree = payload.page === 1 ? {} : state.tree
      return { ...state, isLoading: true, hasMore: false, error: null }
    }
    case ACTIONS.FETCH_NODES_SUCCEDED : {
      const { items, has_more: hasMore } = payload
      return { ...state, items, hasMore, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_NODES_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.DELETE_NODE_INIT : {
      return { ...state, error: null }
    }
    case ACTIONS.DELETE_NODE_SUCCEDED : {
      return { ...state, items: state.items.filter( item => item.uid !== payload.uid ), isLoading: false, error: null }
    }
    case ACTIONS.DELETE_NODE_FAILED : {
      return { ...state, isLoading: false, error: null }
    }

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
      const nodes = state.item ? payload.items.filter((item) => item.value !== state.item.id) : payload.items
      return { ...state, isLoading: false, nodes  }
    }
    case ACTIONS.FETCH_ALL_NODES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.CLEAR_NODE_FORM : {
      return { ...state, item: null, isLoading: false, success: false, error: null }
    }

    case ACTIONS.CREATE_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_NODE_SUCCEDED : {
      return { ...state, item: payload, items: state.items.concat(payload), isLoading: false, success: true, error: null }
    }
    case ACTIONS.CREATE_NODE_FAILED : {
      return { ...state, error: payload, isLoading: false, success: false }
    }

    case ACTIONS.EDIT_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.EDIT_NODE_SUCCEDED : {
      return { ...state, item: payload, items: state.items.map((item) => item.id === payload.id ? payload : item ), success: true , isLoading: false, error: null }
    }
    case ACTIONS.EDIT_NODE_FAILED : {
      return { ...state, error: payload, isLoading: false, success: false }
    }

    case ACTIONS.FETCH_NODE_INIT : {
      return { ...state, isLoading: true, item: null, error: null, success: false }
    }
    case ACTIONS.FETCH_NODE_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_NODE_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.FETCH_CURRENT_TREE_INIT : {
      return { ...state, isLoading: true, tree: null, error: null }
    }
    case ACTIONS.FETCH_CURRENT_TREE_SUCCEDED : {
      return { ...state, tree: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_CURRENT_TREE_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.FILTER_NODES : {
      return { ...state, searchTerm: payload.searchTerm }
    }

    default: {
      return state
    }
  }
}
