import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { compose } from "../../utis"
import {
  categoriesLoadedSelector,
  filtratedPostsByCategory,
  postsLoadedSelector,
  postsLoadingSelector
} from "../../selectors"
import { categoriesSelector, selectedCategorySelector } from "../../selectors/selectors"
import { NativeSelect } from "@material-ui/core"
import { fetchFiltratedPosts } from "../../actions/action-creators"
import { withBlogService, withErrorBoundary } from "../hoc"
import Loader from "../loader"
import PostsList from "../posts-list/posts-list"
import { addLoadedCategory, selectedCategory } from "../../actions"


const Categories = ({ posts, categories, blogService,
                      fetchPosts, loading, setSelected,
                      selected, loaded, setLoaded, allPostsAlreadyLoaded }) => {

  useEffect(() => {
    const find = loaded.includes(selected)
    if(!!selected && !find && !allPostsAlreadyLoaded) {
      fetchPosts(blogService, selected)
    }
    setLoaded(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])


  const handleCategoryChange = e => {
    setSelected(e.target.value)
  };
  
  if (loading) return <Loader />
  const content = !!selected ? <PostsList categorizedPosts={posts}/> : null
  return (
    <div>
      <NativeSelect
        value={selected}
        onChange={handleCategoryChange}
      >
        <option value="none">none</option>
        {
          categories.map(({category, id}) => (
            <option key={id} value={category}>{category}</option>
          ))
        }
      </NativeSelect>
      { content }
    </div>
  )
}

export default compose(
  connect(
    state => ({
      posts: filtratedPostsByCategory(state),
      categories: categoriesSelector(state),
      selected: selectedCategorySelector(state),
      loading: postsLoadingSelector(state),
      loaded: categoriesLoadedSelector(state),
      allPostsAlreadyLoaded: postsLoadedSelector(state)
    }),
    { fetchPosts: fetchFiltratedPosts,
      setSelected: selectedCategory,
      setLoaded: addLoadedCategory
    }
  ),
  withErrorBoundary,
  withBlogService
)(Categories)