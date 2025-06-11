import axiosInstance from '@/lib/axios'
import { Category } from '@/types/categories'

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get<Category[]>('/api/v1/categories')
  return data
}

export const getCategoryById = async (id: string) => {
  const { data } = await axiosInstance.get<Category>(`/api/v1/categories/${id}`)
  return data
}
