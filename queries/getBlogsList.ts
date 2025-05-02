import axios from 'axios'

export const getAllBlogs = async () => {
  const { data } = await axios.get('/api/v1/blogs')
  return data
}
