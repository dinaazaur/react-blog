import axios from "axios"

export default class BlogService {
  _allPost = 'comments?postId=';
  _categorizedPosts = 'posts?category='
  _post = 'posts?id='
  _serverURL = 'http://localhost:3001/'
  get = async (url) => {
    try {
      return await axios.get(`${this._serverURL}${url}`)
    } catch (e) {
      this.message(e)
    }
  }

  getPost = async (id) => {
    try {
      return await axios.get(`${this._serverURL}${this._post}${id}`)
    } catch (e) {
      this.message(e)
    }
  }

  delete = async (id) => {
    try {
      return await axios.delete(`${this._serverURL}${id}`)
    } catch (e) {
      this.message(e)
    }
  }

  getComments = async (id) => {
    try {
      return await axios.get(`${this._serverURL}${this._allPost}${id}`)
    } catch (e) {
      this.message(e)
    }
  }

  addCommentIdToPost = async (id, body) => {
    try {
      return await axios.patch(`${this._serverURL}posts/${id}`, { comments: body })

    } catch (e) {
      this.message(e)
    }
  }

  patchItem = async (id, body, data) => {
    try {
      return await axios.patch(`${this._serverURL}${data}/${id}`, body)
    } catch (e) {
      this.message(e)
    }
  }

  postItem = async (body, _, data) => {
    try {
      return await axios.post(`${this._serverURL}${data}`, body)
    } catch (e) {
      this.message(e)
    }
  }

  getCategorizedPosts = async (category) => {
    try {
      return await axios.get(`${this._categorizedPosts}${category}`)
    } catch (e) {
      this.message(e)
    }
  }

  message(e) {
    console.log('---', e)
  }
}