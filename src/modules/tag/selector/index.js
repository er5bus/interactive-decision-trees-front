import { createSelector } from 'reselect'


const getTags = state => state.tag.items
const getSearchTerm = state => state.tag.searchTerm


export const getFilteredTags = createSelector(
  [getTags, getSearchTerm],
  (tags, searchTerm) => tags.filter(tag =>
    (
      tag.name.match(new RegExp(searchTerm, 'i')) ||
      tag.description.match(new RegExp(searchTerm, 'i')) ||
      tag.uid.match(new RegExp(searchTerm, 'i'))
    )
  )
)

