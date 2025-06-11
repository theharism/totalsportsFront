import axiosInstance from '@/lib/axios'
import { Game } from '@/types/games'

export const getAllGames = async () => {
  const { data } = await axiosInstance.get<Game[]>('/api/v1/games')
  return data
}

export const getGamesByCategory = async (categorySlug: string) => {
  const { data } = await axiosInstance.get<Game[]>('/api/v1/games/category/' + categorySlug)
  return data
}

export const getGameById = async (id: string) => {
  const { data } = await axiosInstance.get<Game>(`/api/v1/games/${id}`)
  return data
}
