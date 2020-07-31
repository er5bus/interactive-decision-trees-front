import { createSelector } from 'reselect'
import { NODE_TYPE } from './../constants'


const getNodes = state =>  state.node.items || []
const getSearchTerm = state => state.node.searchTerm || ""


export const getFilteredNodes = createSelector(
  [getNodes, getSearchTerm], (nodes, searchTerm) => nodes.filter((node) => {
    if (node.nodeType === NODE_TYPE.LOGIC_NODE) {
      return (
        node.name.match(new RegExp(searchTerm, 'i')) ||
        node.uid.match(new RegExp(searchTerm, 'i'))
      )
    }else if ( node.nodeType === NODE_TYPE.CONTENT_NODE) {
      return (
        node.name.match(new RegExp(searchTerm, 'i')) ||
        node.question.match(new RegExp(searchTerm, 'i')) ||
        node.uid.match(new RegExp(searchTerm, 'i'))
      )
    }

    return node
  })
)
