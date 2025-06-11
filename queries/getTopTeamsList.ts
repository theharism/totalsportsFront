import axiosInstance from '@/lib/axios';

export const getTopTeams = async () => {
  const { data } = await axiosInstance.get('/api/v1/teams/top')
  return data
}
