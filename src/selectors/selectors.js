import { createSelector } from "reselect"

export const postsSelector = state => state.blogPosts.entities
export const postsLoadingSelector = state => state.blogPosts.loading

export const commentsIdSelector = (_, props) => props.id
export const commentsSelector = state => state.blogComments.entities
export const editableSelector = state => state.blogComments.editable


export const selectedSelector = state => state.filters.selected
export const dateRangeSelector = state => state.filters.range

export const commentsListSelector = createSelector(
  [commentsSelector, commentsIdSelector],
  (comments, id) => {
  return comments.get(id)
})




export const postsListSelector = createSelector(postsSelector, (articlesMap) => {
  return articlesMap.valueSeq().toArray()
})

export const filtratedPosts = createSelector(
  [postsListSelector, selectedSelector, dateRangeSelector],
  (posts, selected/*, range*/) => { // todo add date filters
    // const { from, to } = range
    return posts.filter(post => {
      return (
        !selected.length
        || selected.find(selected => selected.value === post.id))
    })
  }
)