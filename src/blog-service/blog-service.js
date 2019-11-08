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
      return await axios.get(`${this._allPost}${id}`)
    } catch (e) {
      console.log('---', e.message)
    }
  }
}