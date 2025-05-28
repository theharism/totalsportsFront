import axiosInstance from "@/lib/axios";

export const getCategoryBySlug = async (slug: string) => {
    const {data} = await axiosInstance.get(`/api/v1/categories/${slug}`)
    return data;
}
