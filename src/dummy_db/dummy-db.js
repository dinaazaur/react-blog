import axios from "axios"
import * as uuid from "uuid"
import faker from 'faker'

const author = `${faker.name.firstName()} ${faker.name.lastName()}`
const title = faker.lorem.words()
const id = uuid.v4()
const id2 = uuid.v4()
const id3 = uuid.v4()
const id4 = uuid.v4()
const text = faker.lorem.paragraph()
axios.post("http://localhost:3001/posts", {
  title,
  text,
  author,
  id,
  comments: [id4, id2, id3]
}).then(r => r)
axios.post("http://localhost:3001/comments", {
  title,
  text,
  author,
  id: id2,
  postId: id
}).then(r => r)
axios.post("http://localhost:3001/comments", {
  title,
  text,
  author,
  id: id3,
  postId: id
}).then(r => r)
axios.post("http://localhost:3001/comments", {
  title,
  text,
  author,
  postId: id,
  id: id4
}).then(r => r)