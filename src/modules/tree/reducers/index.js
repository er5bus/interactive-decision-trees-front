import { ACTIONS } from "./../constants"

const initState = { 
  items: [], 
  item: {}, 
  nodes: [], 
  page: 0,
  tags: [], 
  isLoading: false, 
  filters: {}, 
  hasMore: true, 
  error: null, 
  success: false 
}

export default (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case ACTIONS.CLEAR_TREE_FORM : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TREE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_TREE_SUCCEDED : {
      return { ...state, item: payload, success: true, items: state.items.concat(payload), isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TREE_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.EDIT_TREE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.EDIT_TREE_SUCCEDED : {
      return { ...state, item: payload, items: state.items.map((item) => item.id === payload.id ? payload : item), success: true, isLoading: false, error: null }
    }
    case ACTIONS.EDIT_TREE_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.FETCH_ALL_NODES_INIT: {
      return { ...state, isLoading: true, scores: [] }
    }
    case ACTIONS.FETCH_ALL_NODES_SUCCEDED: {
      const nodes = payload.items.filter((item) => item.type === "ContentNode")
      return { ...state, nodes, isLoading: false  }
    }
    case ACTIONS.FETCH_ALL_NODES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FETCH_ALL_TAGS_INIT: {
      return { ...state, isLoading: true, tags: {} }
    }
    case ACTIONS.FETCH_ALL_TAGS_SUCCEDED: {
      const tags = payload.items.reduce(((acc, item) => {
        acc[item.id] = item 
        return acc
      }), {})
      return { ...state, isLoading: false, tags, error: null }
    }
    case ACTIONS.FETCH_ALL_TAGS_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FETCH_TREES_INIT : {
      return { ...state, isLoading: true, hasMore: false, error: null }
    }
    case ACTIONS.FETCH_TREES_SUCCEDED : {
      return { ...state, items: [ ...state.items, ...payload.items], page: payload.page, hasMore: payload.has_more, isLoading: false, error: null }
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
      return { ...state, filters: payload }
    }
    
    default: {
      return state
    }
  }
}
