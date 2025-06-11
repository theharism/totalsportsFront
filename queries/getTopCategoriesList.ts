import axiosInstance from '@/lib/axios';

export const getTopCategories = async () => {
  const { data } = await axiosInstance.get('/api/v1/categories/top')
  return data
}
