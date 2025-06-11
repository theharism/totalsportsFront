import axiosInstance from '@/lib/axios'

export const getAllStreams = async () => {
  const { data } = await axiosInstance.get('/api/v1/streams')
  return data
}

export const getStreamById = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/v1/streams/${id}`)
  return data
}
