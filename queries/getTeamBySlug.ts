import axiosInstance from "@/lib/axios";

export const getTeamBySlug = async (slug: string) => {
    const {data} = await axiosInstance.get(`/api/v1/teams/${slug}`)
    return data;
}
