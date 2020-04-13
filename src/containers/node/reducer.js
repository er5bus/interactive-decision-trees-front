import { ACTIONS, NODE_TYPE } from "./constants"


export default (state = { tree: {}, item: null, hasMore: true, isLoading: false, error: null, success: null }, action) => {
  
  const { payload, type } = action
  
  switch (type) {
    case ACTIONS.FETCH_NODES_INIT : {
      state.tree = payload.page === 1 ? {} : state.tree
      return { ...state, isLoading: true, hasMore: false, error: null }
    }
    case ACTIONS.FETCH_NODES_SUCCEDED : {
      const { tree, has_more: hasMore } = payload
      return { 
        ...state, 
        tree: { 
          ...tree,
          logic_nodes: [ ...(state.tree.logic_nodes || [] ), ...tree.logic_nodes ], 
          content_nodes: [ ...(state.tree.content_nodes || []), ...tree.content_nodes ] 
        }, 
        hasMore, 
        isLoading: false, 
        error: null 
      }
    }
    case ACTIONS.FETCH_NODES_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.DELETE_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.DELETE_NODE_SUCCEDED : {
      if ( payload.nodeType === NODE_TYPE.CONTENT_NODE ){
        state.tree.content_nodes =  state.tree.content_nodes.filter( item => item.uid !== payload.uid )
        return { ...state, isLoading: false, error: null }
      }else if ( payload.nodeType === NODE_TYPE.LOGIC_NODE ){
        state.tree.logic_nodes = state.tree.logic_nodes.filter( item => item.uid !== payload.uid ) 
        return { ...state, isLoading: false, error: null }
      }
      return state
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
      return { ...state, item: null, isLoading: false, error: null }
    }

    case ACTIONS.CREATE_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_NODE_SUCCEDED : {
      const { uid: nodeparam } = payload
      return { ...state, item: { nodeparam }, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_NODE_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.EDIT_NODE_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.EDIT_NODE_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.EDIT_NODE_FAILED : {
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

    case ACTIONS.FILTER_NODES : {
      return { ...state, searchTerm: payload.searchTerm }
    }

    default: {
      return state
    }
  }
}
