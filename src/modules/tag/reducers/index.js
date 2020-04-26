import { ACTIONS } from "./../constants"


export default (state = { items: [], item: {}, isLoading: false, searchTerm: "", hasMore: true, success: null }, action) => {
  const { payload, type } = action
  switch (type) {
    case ACTIONS.CLEAR_TAG_FORM : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TAG_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.CREATE_TAG_SUCCEDED : {
      const { uid: param } = payload
      return { ...state, item: { param }, isLoading: false, error: null }
    }
    case ACTIONS.CREATE_TAG_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.EDIT_TAG_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.EDIT_TAG_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.EDIT_TAG_FAILED : {
      return { ...state, error: payload, isLoading: false }
    }

    case ACTIONS.FETCH_ALL_NODES_INIT: {
      return { ...state, isLoading: true, scores: [] }
    }
    case ACTIONS.FETCH_ALL_NODES_SUCCEDED: {
      const nodes = payload.items.filter((item) => item.type === "ContentNode")
      return { ...state, isLoading: false, nodes  }
    }
    case ACTIONS.FETCH_ALL_NODES_FAILED: {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FETCH_TAGS_INIT : {
      state.items = payload.page === 1 ? [] : state.items
      return { ...state, isLoading: true, hasMore: false, error: null }
    }
    case ACTIONS.FETCH_TAGS_SUCCEDED : {
      return { ...state, items: [ ...state.items, ...payload.items], hasMore: payload.has_more, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_TAGS_FAILED : {
      return { ...state, isLoading: false, hasMore: false, error: payload }
    }

    case ACTIONS.FETCH_TAG_INIT : {
      return { ...state, isLoading: true, item: null, error: null }
    }
    case ACTIONS.FETCH_TAG_SUCCEDED : {
      return { ...state, item: payload, isLoading: false, error: null }
    }
    case ACTIONS.FETCH_TAG_FAILED : {
      return { ...state, isLoading: false, error: payload }
    }

    case ACTIONS.DELETE_TAG_INIT : {
      return { ...state, isLoading: true, error: null }
    }
    case ACTIONS.DELETE_TAG_SUCCEDED : {
      return { ...state, items: state.items.filter( item => item.uid !== payload.uid ), isLoading: false, error: null }
    }
    case ACTIONS.DELETE_TAG_FAILED : {
      return { ...state, isLoading: false, error: null }
    }

    case ACTIONS.FILTER_TAGS: {
      return { ...state, searchTerm: payload.searchTerm }
    }
    
    default: {
      return state
    }
  }
}
