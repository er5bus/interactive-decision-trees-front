import { createSelector } from 'reselect'


const getLogicNodes = state =>  state.node.tree.logic_nodes || []
const getContentNodes = state => state.node.tree.content_nodes || []
const getSearchTerm = state => state.node.searchTerm


export const getFilteredLogicNodes = createSelector(
  [getLogicNodes, getSearchTerm],
  (nodes, searchTerm) => nodes.filter(node =>
    (
      node.node_name.match(new RegExp(searchTerm, 'i')) ||
      node.uid.match(new RegExp(searchTerm, 'i'))
    )
  )
)

export const getFilteredContentNodes = createSelector(
  [getContentNodes, getSearchTerm],
  (nodes, searchTerm) => nodes.filter(node =>
    (
      node.node_name.match(new RegExp(searchTerm, 'i')) ||
      node.question.match(new RegExp(searchTerm, 'i')) ||
      node.uid.match(new RegExp(searchTerm, 'i'))
    )
  )
)
