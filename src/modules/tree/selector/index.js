import { createSelector } from 'reselect'


const getTrees = state => state.tree.items
const getSearchTerm = state => state.tree.filters.searchTerm || ""
const getTags = state => state.tree.filters.tags || []


export const getFilteredTreesBySearchTerm = createSelector(
  [getTrees, getSearchTerm],
  (trees, searchTerm) => trees.filter(tree =>
    (
      tree.treeName.match(new RegExp(searchTerm, 'i')) ||
      tree.description.match(new RegExp(searchTerm, 'i')) ||
      tree.uid.match(new RegExp(searchTerm, 'i'))
    )
  )
)

export const getFilteredTrees = createSelector(
  [getFilteredTreesBySearchTerm, getTags],
  (trees, tags) => {
    
    tags = tags.map(Number)
    return tags.length > 0 ? trees.filter(tree => tags.every((tag) => tree.tags.includes(tag) )) : trees
  }
)
