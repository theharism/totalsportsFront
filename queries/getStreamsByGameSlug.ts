import axiosInstance from "@/lib/axios";

export const getStreamsByGameSlug = async (slug: string) => {
    const {data} = await axiosInstance.get(`/api/v1/streams/game/${slug}`)
    return data;
}
