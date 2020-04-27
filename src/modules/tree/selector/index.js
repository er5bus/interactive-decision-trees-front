import { createSelector } from 'reselect'


const getTrees = state => state.tree.items
const getSearchTerm = state => state.tree.searchTerm


export const getFilteredTrees = createSelector(
  [getTrees, getSearchTerm],
  (trees, searchTerm) => trees.filter(tree =>
    (
      tree.tree_name.match(new RegExp(searchTerm, 'i')) ||
      tree.description.match(new RegExp(searchTerm, 'i')) ||
      tree.tree_tags.some((tag) => tag.name.match(new RegExp(searchTerm, 'i')) || tag.description.match(new RegExp(searchTerm, 'i')) ) ||
      tree.uid.match(new RegExp(searchTerm, 'i'))
    )
  )
)

