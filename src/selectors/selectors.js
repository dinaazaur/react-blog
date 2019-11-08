import { createSelector } from "reselect"

export const postsSelector = state => state.blogPosts.entities
export const postsLoadingSelector = state => state.blogPosts.loading

export const commentsIdSelector = (_, props) => props.id
export const commentsSelector = state => state.blogComments.entities

export const commentsListSelector = createSelector(
  [commentsSelector, commentsIdSelector],
  (comments, id) => {
  return comments.get(id)
})


export const postsListSelector = createSelector(postsSelector, (articlesMap) => {
  return articlesMap.valueSeq().toArray()
})