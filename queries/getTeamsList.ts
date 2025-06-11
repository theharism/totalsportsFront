import axiosInstance from '@/lib/axios'

export const getAllTeams = async () => {
  const { data } = await axiosInstance.get('/api/v1/teams')
  return data
}

export const getTeamById = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/v1/teams/${id}`)
  return data
}
