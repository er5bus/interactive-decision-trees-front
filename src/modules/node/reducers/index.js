import { ACTIONS, NODE_TYPE } from "./../constants"


const initState = { 
  items: [],
  tree: null, 
  page: 0,
  allScores: [],
  allTrees: [],
  allNodes: { contentNodes: [], logicNodes: [] },
  item: null, 
  hasMore: true,
  isLoading: false, 
  error: null, 
  searchTerm: "", 
  success: false 
}

export default (state = initState, action) => {
  
  const { payload, type } = action
  
  switch (type) {
    case ACTIONS.FETCH_NODES_INIT : {
      return { ...state, isLoading: true, hasMore: false, error: null }
    }
    case ACTIONS.FETCH_NODES_SUCCEDED : {
      const { items, hasMore, page } = payload
      return { ...state, items: page === 1 ? items : [ ...state.items, ...items ], hasMore, isLoading: false, page, error: null }
    }
    case ACTIONS.FETCH_NODES_FAILED : {
      return { ...state, isLoading: false, hasMore: false, error: payload }
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

    case ACTIONS.SET_FIRST_NODE_INIT : {
      return { ...state, isLoading: true, error: null, success: false }
    }
    case ACTIONS.SET_FIRST_NODE_SUCCEDED : {
      return { ...state, tree: { ...state.tree, firstNode: payload }, isLoading: false, error: null }
    }
    case ACTIONS.SET_FIRST_NODE_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.SET_LAST_NODE_INIT : {
      return { ...state, isLoading: true, error: null, success: false }
    }
    case ACTIONS.SET_LAST_NODE_SUCCEDED : {
      return { ...state, tree: { ...state.tree, lastNode: payload }, isLoading: false, error: null }
    }
    case ACTIONS.SET_LAST_NODE_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.FETCH_ALL_SCORES_INIT: {
      return { ...state, isLoading: true, AllScores: [] }
    }
    case ACTIONS.FETCH_ALL_SCORES_SUCCEDED: {
      return { ...state, isLoading: false, allScores: payload.items }
    }
    case ACTIONS.FETCH_ALL_SCORES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FETCH_ALL_NODES_INIT: {
      return { ...state, isLoading: true, allNodes: { contentNodes: [], logicNodes: [] } }
    }
    case ACTIONS.FETCH_ALL_NODES_SUCCEDED: {
      const contentNodes = payload.items.filter((node) => node.type === NODE_TYPE.CONTENT_NODE)
      const logicNodes = payload.items.filter((node) => node.type === NODE_TYPE.LOGIC_NODE)
      return { ...state, isLoading: false, allNodes: { contentNodes, logicNodes }  }
    }
    case ACTIONS.FETCH_ALL_NODES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FETCH_ALL_TREES_INIT: {
      return { ...state, isLoading: true, allTrees: [] }
    }
    case ACTIONS.FETCH_ALL_TREES_SUCCEDED: {
      return { ...state, isLoading: false, allTrees: payload.items }
    }
    case ACTIONS.FETCH_ALL_TREES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.CLEAR_NODE_FORM : {
      return { ...state, item: null, hasMore: false, isLoading: false, success: false, error: null }
    }

    case ACTIONS.CLEAR_NODES : {
      return { ...state, items: [], page: 0, item: null, hasMore: true, isLoading: false, success: false, error: null }
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
