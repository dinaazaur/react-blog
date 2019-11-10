import { createSelector } from "reselect"

export const postsSelector = state => state.blogPosts.entities
export const postsLoadingSelector = state => state.blogPosts.loading
export const postsLoadedSelector = state => state.blogPosts.loaded
export const postsEditableSelector = state => state.blogPosts.editablePost

export const postIdSelector = (_, props) => props.match.params.id
export const loadedSinglePostSelector = state => state.blogPosts.loadedSinglePosts

export const commentsIdSelector = (_, props) => props.id
export const commentsSelector = state => state.blogComments.entities
export const editableSelector = state => state.blogComments.editable

export const categoriesLoadingSelector = state => state.blogComments.loading
export const categoriesSelector = state => state.blogCategories.categories
export const categoriesLoadedSelector = state => state.blogCategories.loaded
export const selectedCategorySelector = state => state.blogCategories.selectedCategory

export const selectedSelector = state => state.filters.selected
export const dateRangeSelector = state => state.filters.range

export const commentsListSelector = createSelector(
  [commentsSelector, commentsIdSelector],
  (comments, id) => {
  return comments.get(id)
})

export const postsListSelector = createSelector(postsSelector, (postsMap) => {
  return postsMap.valueSeq().toArray()
})

export const postSelector = createSelector(
  [postsSelector, postIdSelector],
  (posts, id) => {
    return posts.get(id)
  }
)

export const filtratedPosts = createSelector(
  [postsListSelector, selectedSelector, dateRangeSelector],
  (posts, selected, range) => {
    const { from, to } = range
    return posts.filter(post => {
      const date = Date.parse(post.date)
      return (
        (!selected.length
        || selected.find(selected => selected.value === post.id)))
        && (!from || !to || (date > from && date < to))
    })
  }
)

export const filtratedPostsByCategory = createSelector(
  [postsListSelector, selectedCategorySelector],
  (posts, selected) => {
    return posts.filter(post => {
      return post.category === selected
    })
  }
)