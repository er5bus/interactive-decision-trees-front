import { ACTIONS } from "./constants"


export default (state = { items: [], item: null, isLoading: false, hasNext: false, error: null, success: null }, action) => {
  const { payload, type } = action
  switch (type) {
    case ACTIONS.CLEAR_TREE_FORM : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TREE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_TREE_SUCCEDED : {
      return { ...state, items: state.items.concat(payload), isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TREE_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.FETCH_TREES_INIT : {
      return { ...state, isLoading: true, items: [], error: null }
    }
    case ACTIONS.FETCH_TREES_SUCCEDED : {
      const { items, has_next: hasNext } = payload
      return { ...state, items, hasNext, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_TREES_FAILED : {
      return { ...state, isLoading: false, error: payload }
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

    default: {
      return state
    }
  }
}
