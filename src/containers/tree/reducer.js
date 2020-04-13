import { ACTIONS } from "./constants"


export default (state = { items: [], item: {}, isLoading: false, searchTerm: "", hasMore: true, error: null, success: null }, action) => {
  const { payload, type } = action
  switch (type) {
    case ACTIONS.CLEAR_TREE_FORM : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TREE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_TREE_SUCCEDED : {
      const { uid: param } = payload
      return { ...state, item: { param }, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TREE_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.FETCH_TREES_INIT : {
      state.items = payload.page === 1 ? [] : state.items
      return { ...state, isLoading: true, hasMore: false, error: null }
    }
    case ACTIONS.FETCH_TREES_SUCCEDED : {
      return { ...state, items: [ ...state.items, ...payload.items], hasMore: payload.has_more, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_TREES_FAILED : {
      return { ...state, isLoading: false, hasMore: false, error: payload }
    }

    case ACTIONS.FETCH_TREE_INIT : {
      return { ...state, isLoading: true, item: null, error: null }
    }
    case ACTIONS.FETCH_TREE_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_TREE_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.DELETE_TREE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.DELETE_TREE_SUCCEDED : {
      return { ...state, items: state.items.filter( item => item.uid !== payload.uid ), isLoading: false, error: null }
    }
    case ACTIONS.DELETE_TREE_FAILED : {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FILTER_TREES: {
      return { ...state, searchTerm: payload.searchTerm }
    }
    
    default: {
      return state
    }
  }
}
