import axiosInstance from '@/lib/axios'

export const getAllBlogs = async () => {
  const { data } = await axiosInstance.get('/api/v1/blogs', {
    params: {
      type: 'Main',
      limit: 8,
    },
  })
  return data
}
