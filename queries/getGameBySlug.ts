import axiosInstance from "@/lib/axios";

export const getGameBySlug = async (slug: string) => {
    const {data} = await axiosInstance.get(`/api/v1/games/${slug}`)
    return data;
}
