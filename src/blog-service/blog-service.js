import axios from "axios"

export default class BlogService {
  _allPost = 'comments?postId=';

  get = async (url) => {
    try {
      return await axios.get(`http://localhost:3001/${url}`)
    } catch (e) {
      console.log('---', e.message)
    }
  }

  delete = async (id) => {
    try {
      return await axios.delete(`http://localhost:3001/${id}`)
    } catch (e) {
      console.log('---', e.message)
    }
  }

  getComments = async (id) => {
    try {
      return await axios.get(`http://localhost:3001/${this._allPost}${id}`)
    } catch (e) {
      console.log('---', e.message)
    }
  }

  addCommentIdToPost = async (id, body) => {
    try {
      return await axios.patch(`http://localhost:3001/posts/${id}`, { comments: body })

    } catch (e) {
      console.log('---', e.message)
    }
  }

  patchComment = async (id, body) => {
    try {
      return await axios.patch(`http://localhost:3001/comments/${id}`, body)
    } catch (e) {
      console.log('---', e.message)
    }
  }

  postComment = async (body) => {
    try {
      console.log('---', body)
      return await axios.post('http://localhost:3001/comments', body)
    } catch (e) {
      console.log('---', e.message)
    }
  }
}